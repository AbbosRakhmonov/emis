import type { IBaseResponse, IPagination } from '@/src/types';
import { IUser } from '@/src/types/users';
import { api } from '../api';

export interface IAttachParams {
  data: number[];
}

export const employeesService = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IBaseResponse<IUser>, { id: number }>({
      query: ({ id }) => ({
        method: 'GET',
        url: `/user/${id}`,
      }),
    }),

    getUsers: builder.query<IBaseResponse<IUser>, IPagination>({
      query: ({ ...params }) => ({
        url: '/user/all',
        method: 'GET',
        params,
      }),
      providesTags: ['employees'],
    }),
  }),
});

export const { useGetUserQuery, useGetUsersQuery } = employeesService;
