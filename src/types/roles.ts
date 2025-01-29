import { IPermission } from './permissions';

export interface IRole {
  id: number;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  createdBy: 0;
  updatedBy: 0;
  name: string;
  descriptionUz: string;
  descriptionUzCyril: string;
  descriptionRu: string;
  descriptionKaa: string;
  permissions: IPermission[];
  active: boolean;
}
