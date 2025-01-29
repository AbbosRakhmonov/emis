import { IOrganization } from './organizations';
import { IRole } from './roles';

export interface IUser {
  id: number;
  uuid: string;
  nnuzb: string;
  ppn: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  birthDate: string;
  active: boolean;
  gender: string;
  country: string;
  state: string;
  city: string;
  district: string;
  line: string;
  organizations: IOrganization[];
  roles: IRole[];
}

