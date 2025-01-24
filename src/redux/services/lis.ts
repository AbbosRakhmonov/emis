import { api } from '@/src/redux/api';
import type { IOrganization } from '@/src/types/organizations';

export const lisService = api.injectEndpoints({
  endpoints: (builder) => ({
    authPayload: builder.query<AuthPayloadResponse, void>({
      query: () => ({
        method: 'GET',
        url: '/auth-payload',
      }),
    }),

    generateUniqueUsername: builder.query({
      query: () => ({
        method: 'GET',
        url: '/user/generate-unique-username',
      }),
    }),

    getRegion: builder.mutation({
      query: (params) => ({
        data: params,
        method: 'POST',
        url: `/regions/list-search`,
      }),
    }),

    getDistrictByRegionId: builder.mutation({
      query: ({ id }: { id: number }) => ({
        method: 'GET',
        url: `/district/get-by-region/${id}`,
      }),
    }),
  }),
});

export interface AuthPayloadResponse {
  state: string;
  status: string;
  statusCode: number;
  message: string | null;
  data: {
    pinfl: string;
    address: string;
    role: string[];
    phone: string;
    permissions: string[];
    inn: number;
    organizations: IOrganization[];
    fullName: string;
    id: number;
    email: string;
    username: string;
  };
}
export const {
  useAuthPayloadQuery,
  useGetRegionMutation,
  useLazyAuthPayloadQuery,
  useGenerateUniqueUsernameQuery,
  useGetDistrictByRegionIdMutation,
  useLazyGenerateUniqueUsernameQuery,
} = lisService;
