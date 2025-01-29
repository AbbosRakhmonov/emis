'use client';

import ActionsMenu from '@/src/shared/ui/action-menu';
import { _LIMIT, _PAGE_SIZES } from '@/src/utils/constants';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { memo, useMemo, useState } from 'react';

type UseQuery = (
  arg: any | SkipToken,
  options?: UseQueryOptions
) => UseQueryResult;

type UseQueryOptions = {
  pollingInterval?: number;
  skipPollingIfUnfocused?: boolean;
  refetchOnReconnect?: boolean;
  refetchOnFocus?: boolean;
  skip?: boolean;
  refetchOnMountOrArgChange?: boolean | number;
  selectFromResult?: (result: UseQueryStateDefaultResult) => any;
};

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .no-rows-primary': {
    fill: '#3D4751',
    ...theme.applyStyles('light', {
      fill: '#AEB8C2',
    }),
  },
  '& .no-rows-secondary': {
    fill: '#1D2126',
    ...theme.applyStyles('light', {
      fill: '#E8EAED',
    }),
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={96}
        viewBox="0 0 452 257"
        aria-hidden
        focusable="false"
      >
        <path
          className="no-rows-primary"
          d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
        />
        <path
          className="no-rows-secondary"
          d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
        />
      </svg>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Ничего не найдено
        </Typography>
      </Box>
    </StyledGridOverlay>
  );
}

interface TableProps {
  fetcher: UseQuery;
  fetcherParams?: {};
  columns: GridColDef[];
  allowFetchData?: boolean;
  additionalMenuItems?: any;
  selectItemHandler?: (record: any) => void;
  deleteItemHandler?: (record: any) => void;
  editItemHandler?: (record: any) => void;
  rowExpandContent?: (record: any) => JSX.Element | boolean;
  isRecordSelectable?: any;
}

interface TableComponentProps {
  rowHandler?: (record: any) => void;
}

export function useTable({
  fetcher,
  fetcherParams = {},
  columns,
  editItemHandler,
  rowExpandContent,
  selectItemHandler,
  deleteItemHandler,
  isRecordSelectable,
  additionalMenuItems,
  allowFetchData = true,
}: TableProps) {
  const [selectedRecords, setSelectedRecords] = useState([]);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: _LIMIT,
    page: 1,
  });

  const fetchProps = fetcher(
    {
      page: paginationModel.page,
      size: paginationModel.pageSize,
      ...fetcherParams,
    },
    {
      skip: !allowFetchData,
    }
  );

  const { data, total } = useMemo(() => {
    if (fetchProps.data) {
      return fetchProps.data;
    }
    return { data: [], total: 0 };
  }, [fetchProps.data]);

  const defaultColumns = useMemo<GridColDef[]>(
    () => [
      {
        field: 'index',
        headerName: '№',
        width: 50,
        sortable: false,
        disableColumnMenu: true,
        disableReorder: true,
        resizable: false,
        renderCell: (params) =>
          params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
      },
      ...columns.map((col) => ({
        ...col,
        flex: 1,
      })),
      {
        field: 'actions',
        headerName: 'Меню',
        sortable: false,
        disableColumnMenu: true,
        width: 70,
        renderCell: (params) => (
          <ActionsMenu
            key={params.id}
            params={params}
            selectItemHandler={selectItemHandler}
            editItemHandler={editItemHandler}
            deleteItemHandler={deleteItemHandler}
            additionalMenuItems={additionalMenuItems}
          />
        ),
      },
    ],
    [
      columns,
      selectItemHandler,
      editItemHandler,
      deleteItemHandler,
      additionalMenuItems,
    ]
  );

  const TableComponent = memo(({ rowHandler }: TableComponentProps) => {
    return (
      <Paper elevation={3} style={{ width: '100%', padding: 0 }}>
        <DataGrid
          rows={data}
          columns={defaultColumns}
          paginationModel={paginationModel}
          onPaginationModelChange={(newPaginationModel) => {
            setPaginationModel({
              ...newPaginationModel,
              page: newPaginationModel.page + 1,
            });
          }}
          pageSizeOptions={[..._PAGE_SIZES]}
          rowCount={total}
          paginationMode="server"
          loading={fetchProps.isLoading}
          // checkboxSelection
          // onRowSelectionModelChange={(newSelection) =>
          //   setSelectedRecords(newSelection)
          // }
          getRowId={(row) => row.id || row._id}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          disableColumnMenu
          sx={{
            '& .MuiDataGrid-cell': {
              fontSize: '0.9rem',
            },
            '& .MuiDataGrid-columnHeader': {
              fontSize: '0.95rem',
            },
            '--DataGrid-overlayHeight': '300px',
          }}
        />
      </Paper>
    );
  });

  return {
    page: paginationModel.page,
    TableComponent,
    size: paginationModel.pageSize,
    selectedRecords,
    setSelectedRecords,
  };
}
