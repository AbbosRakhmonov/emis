import { api } from '@/src/redux/api';
import { setUser } from '@/src/redux/reducers/auth';
import { IUser } from '@/src/types/users';

export const emis = api.injectEndpoints({
  endpoints: (builder) => ({
    authPayload: builder.query<AuthPayloadResponse, void>({
      query: () => ({
        method: 'GET',
        url: '/user/me',
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const { data } = await queryFulfilled;
        dispatch(setUser(data.data));
      },
    }),
  }),
});

export interface AuthPayloadResponse {
  success: boolean;
  message: string;
  data: IUser;
}
export const { useAuthPayloadQuery, useLazyAuthPayloadQuery } = emis;
