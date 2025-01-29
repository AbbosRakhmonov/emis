export interface IBaseResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  state: string;
  statusCode: number;
  message: any;
  total: number;
  data: T;
  errors?: any[];
}

export interface IPagination {
  page: number;
  size: number;
}

export enum GenderTypes {
  MALE = 1,
  FEMALE = 2,
}
