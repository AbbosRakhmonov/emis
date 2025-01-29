import { IUser } from './users';

export type IDepartment = {
  id: number;
  uuid: string;
  name: string;
  active: boolean;
  tin: string;
  email: string;
  phone: string;
  level: string;
  type: string;
  country: string;
  state: string;
  city: string;
  district: string;
  line: string;
  serviceArea: string;
  hierarchy: string;
  children: string[];
  users: IUser[];
};
