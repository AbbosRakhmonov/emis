export interface IOrganization {
  id: number;
  uuid: string;
  name: string;
  active: boolean;
  tin: string;
  email: string;
  phone: string;
  type: string;
  country: string;
  state: string;
  city: string;
  district: string;
  line: string;
  serviceArea: string;
  users: any[];
}
