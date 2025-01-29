'use client'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { usePathname } from 'next/navigation';
import React, { useCallback, useState } from 'react';

interface NavGroupProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function NavGroup({ title, children, icon }: NavGroupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Check if any child link is active
  const isActive = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.props.href === pathname
  );

  // If active, ensure the group is open
  React.useEffect(() => {
    if (isActive ) {
      setIsOpen(true);
    }
  }, [isActive]);

  return (
    <>
      <ListItemButton
        selected={isActive}
        sx={{
          '&.Mui-selected': {
            backgroundColor: 'primary.light',
            '&:hover': {
              backgroundColor: 'primary.light',
            },
          },
        }}
        onClick={toggleOpen}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
        }}
        in={isOpen}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
}
