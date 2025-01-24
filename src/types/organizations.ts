export interface IOrganization {
  id: number;
  name: string;
  shortName: string;
  address: string;
  hierarchy: string;
  parent: string;
  parentId: string | number;
  status: string;
  uuid: string;
  children: any[];
}
