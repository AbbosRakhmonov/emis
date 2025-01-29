import { IOrganization } from '@/src/types/organizations';
import { IUser } from '@/src/types/users';
import { createSlice } from '@reduxjs/toolkit';

export type IState = {
  user: IUser;
  organization: IOrganization;
  department: null | {};
};

const initialState: IState = {
  user: {} as IUser,
  organization: {} as IOrganization,
  department: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOrganization: (state, action) => {
      state.organization = action.payload;
    },
    setDepartment: (state, action) => {
      state.department = action.payload;
    },
  },
});

export const { setUser, setOrganization, setDepartment } = authSlice.actions;

export default authSlice.reducer;
