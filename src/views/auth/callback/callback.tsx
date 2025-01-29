'use client';

import {
  useGetTokenMutation,
  useLazyAuthPayloadQuery,
} from '@/src/redux/services';
import { SSO_CLIENT_ID, SSO_REDIRECT_URI } from '@/src/shared/configs';
import { notification } from '@/src/utils/snackbarUtils';
import {
  localStorageGetItem,
  localStorageRemoveItem,
  localStorageSetItem,
} from '@/src/utils/storage-available';
import { CircularProgress, Stack, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export function CallbackPage() {
  const router = useRouter();
  // Get token
  const [getToken] = useGetTokenMutation();

  // Get auth payload
  const [fetchAuthPayload] = useLazyAuthPayloadQuery();

  // Get auth data
  const pkceState = localStorageGetItem('pkce_state');
  const pkceCodeVerifier = localStorageGetItem('pkce_code_verifier');

  const clearAuthData = () => {
    localStorageRemoveItem('user');
    Cookies.remove('access_token');
  };

  const clearTemporaryStorage = () => {
    localStorageRemoveItem('pkce_state');
    localStorageRemoveItem('pkce_code_verifier');
  };

  const handleError = useCallback(
    (message: string) => {
      notification.show({ severity: 'error', message });
      router.push('/auth/login');
    },
    [router, notification]
  );

  const handleAuthorizationSuccess = useCallback(async () => {
    const result = await fetchAuthPayload().unwrap();

    if (!result.data?.organizations?.length) {
      throw new Error('У вас нет активных организаций');
    }

    localStorageSetItem('user', JSON.stringify(result.data));

    notification.show({ severity: 'success', message: 'Выберите организацию' });

    router.push('/select-organization');
  }, [
    fetchAuthPayload,
    handleError,
    router,
    notification,
    localStorageSetItem,
  ]);

  const requestToken = useCallback(
    async (code: string) => {
      const data = await getToken({
        code,
        claims: 'organization',
        client_id: SSO_CLIENT_ID,
        redirect_uri: SSO_REDIRECT_URI,
        code_verifier: pkceCodeVerifier,
        grant_type: 'authorization_code',
      }).unwrap();

      if (!data?.access_token) {
        throw new Error('Ошибка при получении токена');
      }

      // expires_in is in seconds, convert to milliseconds
      Cookies.set('access_token', data.access_token, {
        expires: new Date(Date.now() + data.expires_in * 1000),
      });

      await handleAuthorizationSuccess();
    },
    [getToken, handleAuthorizationSuccess, pkceCodeVerifier]
  );

  useEffect(() => {
    const handleAuthorization = async () => {
      try {
        clearAuthData();

        const query = new URLSearchParams(window.location.search);
        const code = query.get('code');
        const state = query.get('state');
        const error = query.get('error');

        if (error) {
          throw new Error(`Ошибка авторизации: ${error}`);
        }

        if (!code || !state || pkceState !== state) {
          throw new Error('Произошла ошибка в авторизации');
        }

        await requestToken(code);
      } catch (error: any) {
        clearAuthData();
        handleError(error.message || 'Произошла ошибка в авторизации');
      } finally {
        clearTemporaryStorage();
      }
    };

    handleAuthorization();
  }, []);

  return (
    <Stack
      sx={{
        paddingY: 2,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <CircularProgress color="warning" />
      <Typography variant="body1" color="text.secondary" align="center">
        Проверка данных...
      </Typography>
    </Stack>
  );
}
