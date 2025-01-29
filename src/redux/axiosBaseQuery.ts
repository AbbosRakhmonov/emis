import { HOST_API, MISTEMP_API, SSO_BASE_URI } from '@/src/shared/configs';
import { notification } from '@/src/utils/snackbarUtils';
import { localStorageGetItem } from '@/src/utils/storage-available';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

const HTTP_MESSAGES = {
  401: 'Время сессии истекло. Попробуйте войти снова.',
  403: 'Время сессии истекло. Попробуйте войти снова.',
  404: 'Страница не найдена',
  417: 'У пользователя нет роли для доступа',
};

const redirectToLogin = (error) => {
  window.location.replace(`/auth/login?error=${error}`);
};

function createAxiosInstance(
  baseUrl: string | undefined,
  token: string | undefined
) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axios.create({
    headers,
    baseURL: baseUrl,
  });
}

export function axiosBaseQuery({ baseUrl }: { baseUrl: string | undefined }) {
  return async ({
    url,
    data,
    params,
    responseType,
    method = 'POST',
    ...rest
  }: any) => {
    const token = Cookies.get('access_token');

    const axiosInstance = createAxiosInstance(baseUrl, token);

    axiosInstance.interceptors.request.use(
      (config) => {
        const organizationID = localStorageGetItem('organization_uuid');

        if (organizationID) {
          config.headers['organization-id'] = organizationID;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { status } = error.response || {};

        if (status === 401 || status === 403 || status === 417) {
          localStorage.clear();
          redirectToLogin(HTTP_MESSAGES[status]);
        }

        if (status === 404) {
          window.location.replace('/404');
        }

        return Promise.reject(error);
      }
    );

    try {
      const result = await axiosInstance({
        url,
        data,
        method,
        params,
        responseType,
        ...rest,
      });

      return { data: result?.data };
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Instance error ->', error?.response?.data);
      }

      if (error instanceof AxiosError) {
        notification.show({
          severity: 'error',
          title: error.response?.status || error?.response?.data?.status || '',
          message:
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.response?.data ||
            'Произошла ошибка',
        });

        return {
          error: {
            message: error.message,
            data: error.response?.data,
            status: error.response?.status,
          },
        };
      }

      return {
        error: {
          message: error?.message,
          data: error?.response?.data,
          status: error?.response?.status,
        },
      };
    }
  };
}

export const hostApiQuery = axiosBaseQuery({ baseUrl: HOST_API });
export const misTempApiQuery = axiosBaseQuery({ baseUrl: MISTEMP_API });
export const ssoApiQuery = axiosBaseQuery({ baseUrl: SSO_BASE_URI });
