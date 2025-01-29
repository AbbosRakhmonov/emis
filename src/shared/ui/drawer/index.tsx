import Navbar from '@/src/shared/ui/navbar';
import {
  Divider,
  Drawer as MuiDrawer,
  Toolbar,
  Typography,
} from '@mui/material';
import type React from 'react';

interface DrawerProps {
  open: boolean;
  drawerWidth: number;
  handleDrawerToggle: () => void;
  isMobile: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  drawerWidth,
  handleDrawerToggle,
  isMobile,
}) => {
  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          EMIS LOGO
        </Typography>
      </Toolbar>
      <Divider />
      <Navbar />
    </div>
  );

  return (
    <MuiDrawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={open}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
    >
      {drawer}
    </MuiDrawer>
  );
};
