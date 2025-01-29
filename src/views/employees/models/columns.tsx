import { translateRole } from '@/src/shared/helpers';
import type { IUser } from '@/src/types/users';
import { Chip } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';

export const _COLUMNS: GridColDef<IUser>[] = [
  {
    headerName: 'Фамилия',
    field: 'lastName',
    width: 150,
  },
  {
    headerName: 'Имя',
    field: 'firstName',
    width: 150,
  },
  {
    headerName: 'Отчество',
    field: 'middleName',
    width: 150,
  },
  // {
  //   headerName: 'Имя пользователя',
  //   field: 'username',
  //   flex: 1,
  //   valueGetter: (params, row) => {
  //     return '-';
  //   },
  // },
  {
    headerName: 'ПИНФЛ',
    field: 'nnuzb',
    width: 150,
  },
  {
    headerName: 'Дата рождения',
    field: 'birthDate',
    width: 150,
  },
  {
    headerName: 'Телефон',
    field: 'phoneNumber',
    width: 150,
  },
  {
    headerName: 'Роль',
    field: 'role',
    align: 'center',
    width: 100,
    renderCell(params) {
      return params.row.roles.map((role) => (
        <Chip
          size="small"
          key={role.id}
          label={translateRole(role.name)}
          color="success"
        />
      ));
    },
  },
  // {
  //   headerName: 'Степень',
  //   field: '5',
  //   valueGetter: (params, row) => {
  //     return '-';
  //   },
  // },
  {
    headerName: 'Статус',
    field: 'active',
    width: 150,
    valueGetter: (params, row) => {
      return row.active ? 'Активный' : 'Не активный';
    },
  },
];
