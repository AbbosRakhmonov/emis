'use client';

import {
  SSO_AUTHORIZATION_ENDPOINT,
  SSO_CLIENT_ID,
  SSO_REDIRECT_URI,
} from '@/src/shared/configs';
import {
  generateRandomString,
  pkceChallengeFromVerifier,
} from '@/src/shared/helpers';
import { Button, Typography } from '@mui/material';
import React from 'react';

export const LoginPage: React.FC = () => {
  const redirectToSSO = async (): Promise<void> => {
    const state = generateRandomString();
    const codeVerifier = generateRandomString();
    const code_challenge = await pkceChallengeFromVerifier(codeVerifier);

    localStorage.setItem('pkce_state', state);
    localStorage.setItem('pkce_code_verifier', codeVerifier);

    const url = `${SSO_AUTHORIZATION_ENDPOINT}?response_type=code&client_id=${encodeURIComponent(
      SSO_CLIENT_ID!
    )}&state=${encodeURIComponent(state)}&redirect_uri=${encodeURIComponent(
      SSO_REDIRECT_URI!
    )}&code_challenge=${encodeURIComponent(
      code_challenge
    )}&code_challenge_method=S256`;

    window.location.href = url;
  };

  return (
    <>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4, textAlign: 'center' }}
      >
        Чтобы начать процесс входа в систему, пользователям предлагается нажать
        на указанную кнопку.
      </Typography>
      <Button
        variant="contained"
        color="warning"
        onClick={redirectToSSO}
        sx={{ mt: 3, mb: 2 }}
      >
        Войти через SSO
      </Button>
    </>
  );
};
