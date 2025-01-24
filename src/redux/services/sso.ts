import { ssoApi } from '../api';

export const ssoService = ssoApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query<UserInfoResponse, void>({
      query: () => ({
        method: 'GET',
        url: '/api/user',
      }),
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        method: 'POST',
        url: `/api/auth/logout`,
      }),
    }),

    getToken: builder.mutation({
      query: (payload) => ({
        data: payload,
        method: 'POST',
        url: '/oauth/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      }),
    }),
  }),
});

interface LogoutResponse {
  success: boolean;
  message: string;
}

interface UserInfoResponse {
  identify: string;
  username: string;
  email?: string;
  phone?: string;
  status: string;
  name: string;
  organization: any[];
}

export const {
  useLogoutMutation,
  useGetUserInfoQuery,
  useGetTokenMutation,
  useLazyGetUserInfoQuery,
} = ssoService;
