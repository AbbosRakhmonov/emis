import { createApi } from '@reduxjs/toolkit/query/react';
import { hostApiQuery, misTempApiQuery, ssoApiQuery } from './axiosBaseQuery';

function createCustomApi(reducerPath: string, baseQuery: any) {
  return createApi({
    baseQuery,
    reducerPath,
    tagTypes: [],
    endpoints: () => ({}),
  });
}

const api = createCustomApi('api', hostApiQuery);
const ssoApi = createCustomApi('ssoApi', ssoApiQuery);
const misApi = createCustomApi('misTempApi', misTempApiQuery);

export { api, misApi, ssoApi };
