'use client';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import BadgeIcon from '@mui/icons-material/Badge';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import List from '@mui/material/List';
import { memo } from 'react';
import { NavGroup } from './NavGroup';
import { NavLink } from './NavLink';

const navigationItems = [
  {
    title: 'Главная',
    href: '/',
    icon: <DashboardIcon />,
  },
  {
    title: 'Администрация',
    icon: <AdminPanelSettingsIcon />,
    children: [
      {
        title: 'Сотрудники',
        href: '/employees',
        icon: <GroupsIcon />,
      },
      {
        title: 'Организации',
        href: '/organizations',
        icon: <AssuredWorkloadIcon />,
      },
      {
        title: 'Роли',
        href: '/roles',
        icon: <BadgeIcon />,
      },
    ],
  },
];

const Navbar = () => {
  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      {navigationItems.map((item) => (
        <div key={item.title}>
          {item.children ? (
            <NavGroup title={item.title} icon={item.icon}>
              {item.children.map((child) => (
                <NavLink
                  key={child.href}
                  href={child.href}
                  icon={child.icon}
                  inset
                >
                  {child.title}
                </NavLink>
              ))}
            </NavGroup>
          ) : (
            <NavLink href={item.href} icon={item.icon}>
              {item.title}
            </NavLink>
          )}
        </div>
      ))}
    </List>
  );
};

export default memo(Navbar);
