'use client';
import { UserMenu } from '@/src/shared/ui/user-menu';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, AppBar as MuiAppBar, Toolbar } from '@mui/material';
import type React from 'react';

interface AppBarProps {
  open: boolean;
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

export const AppBar: React.FC<AppBarProps> = ({
  open,
  drawerWidth,
  handleDrawerToggle,
}) => {
  return (
    <MuiAppBar
      position="fixed"
      sx={{
        width: { sm: open ? `calc(100% - ${drawerWidth}px)` : '100%' },
        ml: { sm: open ? `${drawerWidth}px` : 0 },
        transition: (theme) =>
          theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <UserMenu />
      </Toolbar>
    </MuiAppBar>
  );
};
