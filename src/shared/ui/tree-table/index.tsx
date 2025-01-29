import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowModel,
} from '@mui/x-data-grid';
import React, { useCallback, useMemo, useState } from 'react';

interface TreeNode {
  id: string | number;
  [key: string]: any;
  children?: TreeNode[];
}

interface OptimizedTreeDataGridProps {
  data: TreeNode[];
  columns: GridColDef[];
  getChildrenField?: (node: TreeNode) => TreeNode[] | undefined;
  customCellRenderer?: (
    params: GridRenderCellParams,
    level: number
  ) => React.ReactNode;
  expandField?: string;
  levelField?: string;
  initialExpandedRows?: Set<string | number>;
}

const OptimizedTreeDataGrid: React.FC<OptimizedTreeDataGridProps> = React.memo(
  ({
    data,
    columns,
    getChildrenField = (node) => node.children,
    customCellRenderer,
    expandField = 'name',
    levelField = 'level',
    initialExpandedRows = new Set(),
  }) => {
    const [expandedRows, setExpandedRows] =
      useState<Set<string | number>>(initialExpandedRows);

    const handleExpandClick = useCallback((id: string | number) => {
      setExpandedRows((prevExpandedRows) => {
        const newExpandedRows = new Set(prevExpandedRows);
        if (newExpandedRows.has(id)) {
          newExpandedRows.delete(id);
        } else {
          newExpandedRows.add(id);
        }
        return newExpandedRows;
      });
    }, []);

    const getRowsWithChildren = useCallback(
      (nodes: TreeNode[], level = 0): GridRowModel[] => {
        return nodes.flatMap((node) => {
          const row = { ...node, [levelField]: level };
          const children = getChildrenField(node);

          if (children && expandedRows.has(node.id)) {
            return [row, ...getRowsWithChildren(children, level + 1)];
          }

          return [row];
        });
      },
      [expandedRows, getChildrenField, levelField]
    );

    const rows = useMemo(
      () => getRowsWithChildren(data),
      [data, getRowsWithChildren]
    );

    const enhancedColumns: GridColDef[] = useMemo(() => {
      return columns.map((column) => {
        if (column.field === expandField) {
          return {
            ...column,
            renderCell: (params: GridRenderCellParams) => {
              const level = params.row[levelField] || 0;
              const children = getChildrenField(params.row);
              const hasChildren = children && children.length > 0;

              return (
                <Box
                  sx={{ display: 'flex', alignItems: 'center', pl: level * 2 }}
                >
                  {hasChildren && (
                    <IconButton
                      size="small"
                      onClick={() => handleExpandClick(params.row.id)}
                    >
                      {expandedRows.has(params.row.id) ? (
                        <KeyboardArrowDown />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </IconButton>
                  )}
                  {customCellRenderer
                    ? customCellRenderer(params, level)
                    : params.value}
                </Box>
              );
            },
          };
        }
        return column;
      });
    }, [
      columns,
      expandField,
      levelField,
      getChildrenField,
      handleExpandClick,
      expandedRows,
      customCellRenderer,
    ]);

    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={enhancedColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    );
  }
);

export default OptimizedTreeDataGrid;
