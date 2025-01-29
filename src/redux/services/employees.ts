import type { IBaseResponse, IPagination } from '@/src/types';
import { IUser } from '@/src/types/users';
import { api } from '../api';

export interface IAttachParams {
  data: number[];
}

export const employeesService = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IUser>({
      query: ({ id }) => ({
        method: 'GET',
        url: `/user/${id}`,
      }),
    }),

    getUsers: builder.query<IBaseResponse, IPagination>({
      query: ({ id, ...params }) => ({
        url: '/user/all',
        method: 'GET',
        params,
      }),
      providesTags: ['employees'],
    }),
  }),
});

export const { useGetUserQuery, useGetUsersQuery } = employeesService;
