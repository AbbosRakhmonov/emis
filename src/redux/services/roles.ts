import type { IBaseResponse, IPagination } from '@/src/types';
import type { IRole } from '@/src/types/roles';
import { api } from '../api';

export const rolesService = api.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<IBaseResponse<IRole>, IPagination>({
      query: (params) => ({
        url: '/role/all',
        method: 'GET',
        params,
      }),
      providesTags: ['roles'],
    }),
  }),
});

export const { useGetRolesQuery, useLazyGetRolesQuery } = rolesService;
