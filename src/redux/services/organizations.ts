import { api } from '../api';

export const organizationsService = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteOrganization: builder.mutation({
      query: (params) => ({
        method: 'DELETE',
        url: `/organization/${params.id}`,
      }),
    }),

    getOrganization: builder.query({
      query: ({ id }: { id: string }) => ({
        method: 'GET',
        url: `/organization/${id}`,
      }),
    }),

    createOrganization: builder.mutation({
      query: (params) => ({
        data: params,
        method: 'POST',
        url: `/organization`,
      }),
    }),

    editOrganization: builder.mutation({
      query: ({ id, ...data }) => ({
        data,
        method: 'PUT',
        url: `/organization/${id}`,
      }),
    }),

    getOrganizations: builder.mutation({
      query: (params) => ({
        data: params,
        method: 'POST',
        url: `/organization/list-search`,
      }),
    }),

    getOrganizationDepartments: builder.query({
      query: ({ uuid }: { uuid: string }) => ({
        method: 'GET',
        url: `/organization/departments/${uuid}`,
      }),
    }),
  }),
});

export const {
  useGetOrganizationQuery,
  useLazyGetOrganizationQuery,
  useEditOrganizationMutation,
  useGetOrganizationsMutation,

  useCreateOrganizationMutation,
  useDeleteOrganizationMutation,
  useGetOrganizationDepartmentsQuery,
  useLazyGetOrganizationDepartmentsQuery,
} = organizationsService;
