import { paths } from '@/src/shared/routes/paths';

export const HOST_API = process.env.NEXT_PUBLIC_HOST_API;
export const HOST_SSE_API = process.env.NEXT_PUBLIC_HOST_API_SSE;
export const MIS_API = process.env.NEXT_PUBLIC_MIS_API;
export const MISTEMP_API = process.env.NEXT_PUBLIC_MISTEMP_API;

// SSO API
export const SSO_BASE_URI = process.env.NEXT_PUBLIC_SSO_BASE_URI;
export const SSO_CLIENT_ID = process.env.NEXT_PUBLIC_SSO_CLIENT_ID;
export const SSO_REDIRECT_URI = process.env.NEXT_PUBLIC_SSO_REDIRECT_URI;
export const SSO_AUTHORIZATION_ENDPOINT =
  process.env.NEXT_PUBLIC_SSO_AUTHORIZATION_ENDPOINT;
export const SSO_TOKEN_ENDPOINT = process.env.NEXT_PUBLIC_SSO_TOKEN_ENDPOINT;

export const ASSETS_API = process.env.NEXT_PUBLIC_ASSETS_API;

export const AUTH0_API = {
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  callbackUrl: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL,
};

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'
