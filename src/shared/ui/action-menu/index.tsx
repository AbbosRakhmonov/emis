'use client';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { memo, useState } from 'react';

type Props = {
  selectItemHandler?: (params: any) => void;
  editItemHandler?: (params: any) => void;
  deleteItemHandler?: (params: any) => void;
  params?: any;
  additionalMenuItems?: any[];
};

const MenuItemWithIcon = ({ icon, title, onClick }: any) => (
  <MenuItem onClick={onClick}>
    {icon}
    <Typography ml={1} variant="body2">
      {title}
    </Typography>
  </MenuItem>
);

const ActionsMenu: React.FC<Props> = ({
  selectItemHandler,
  editItemHandler,
  deleteItemHandler,
  params,
  additionalMenuItems,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <IconButton
        size="small"
        color="primary"
        aria-controls={`basic-menu-${params.id}`}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`basic-menu-${params.id}`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handleClose}
      >
        {!!selectItemHandler && (
          <MenuItemWithIcon
            icon={<VisibilityIcon color="primary" fontSize="small" />}
            title="Просмотреть"
            onClick={(event) => {
              selectItemHandler(params.row as unknown);
              handleClose();
            }}
          />
        )}
        {!!editItemHandler && (
          <MenuItemWithIcon
            icon={<EditIcon color="warning" fontSize="small" />}
            title="Редактировать"
            onClick={(event) => {
              event.stopPropagation();
              editItemHandler(params.row as unknown);
              handleClose();
            }}
          />
        )}
        {!!deleteItemHandler && (
          <MenuItemWithIcon
            icon={<DeleteIcon color="error" fontSize="small" />}
            title="Удалить"
            onClick={(event) => {
              deleteItemHandler(params.row as unknown);
              handleClose();
            }}
          />
        )}
        {additionalMenuItems?.map(
          (
            item: {
              handler: (row: unknown) => void;
              icon: JSX.Element;
              label: string;
            },
            idx: number
          ) => (
            <MenuItem
              key={idx}
              onClick={(event) => {
                event.stopPropagation();
                item.handler(params.row as unknown);
              }}
            >
              {item.icon} {item.label}
            </MenuItem>
          )
        )}
      </Menu>
    </Box>
  );
};
export default memo(ActionsMenu);
