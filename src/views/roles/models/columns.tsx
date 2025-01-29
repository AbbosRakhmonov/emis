import { translateRole } from '@/src/shared/helpers';
import type { IUser } from '@/src/types/users';
import type { GridColDef } from '@mui/x-data-grid';

export const _COLUMNS: GridColDef<IUser>[] = [
  {
    headerName: 'Имя',
    field: 'name',
    flex: 1,
    minWidth: 150,
    valueGetter: (params, row) => {
      return translateRole(row.name);
    },
  },
  {
    headerName: 'Описание',
    field: 'descriptionRu',
    flex: 1,
    minWidth: 150,
  },
];
