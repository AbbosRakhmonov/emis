'use client';
import { AppBar } from '@/src/shared/ui/appbar';
import { Drawer } from '@/src/shared/ui/drawer';
import {
  Box,
  CssBaseline,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type React from 'react';
import { memo, useCallback, useState } from 'react';

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

const ChildrenWrapper = memo(({ children }: { children: React.ReactNode }) => (
  <Box sx={{ flex: 1, overflow: 'hidden' }}>{children}</Box>
));

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(!isMobile);

  const handleDrawerToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <CssBaseline />
      <AppBar
        open={open}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component={'section'}
        sx={{
          display: 'flex',
          flexGrow: 1,
        }}
      >
        <Box
          component="nav"
          sx={{
            width: open ? `${drawerWidth}px` : 0,
          }}
          aria-label="navbar"
        >
          <Drawer
            open={open}
            drawerWidth={drawerWidth}
            handleDrawerToggle={handleDrawerToggle}
            isMobile={isMobile}
          />
        </Box>
        <Box
          component="main"
          sx={{
            width: open ? `calc(100% - ${drawerWidth}px)` : '100%',
            p: 3,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Toolbar />
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </Box>
      </Box>
    </Box>
  );
}
