'use client';
import { IState } from '@/src/redux/reducers';
import { useLogoutMutation } from '@/src/redux/services';
// import ApartmentIcon from '@mui/icons-material/Apartment';
// import EmailIcon from '@mui/icons-material/Email';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const UserInfo = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    {icon}
    <Typography variant="caption">{title}</Typography>
  </Box>
);

const UserInfoSection = ({ user }: { user: IUserInfo }) => (
  <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
    <UserInfo
      icon={<PersonIcon fontSize="small" color="primary" />}
      title={`${user.firstName} ${user.lastName} ${user.middleName}`}
    />
    <UserInfo
      icon={<PhoneIcon sx={{ color: '#7B1FA2' }} fontSize="small" />}
      title={user.phoneNumber}
    />
    {/* <UserInfo
      icon={<EmailIcon fontSize="small" color="warning" />}
      title={organization.email}
    />
    <UserInfo
      icon={<ApartmentIcon fontSize="small" color="success" />}
      title={organization.name}
    /> */}
  </Box>
);

const LogoutButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) => (
  <MenuItem
    onClick={onClick}
    disabled={disabled}
    sx={{ color: 'secondary.main' }}
  >
    <MeetingRoomIcon sx={{ marginRight: 1 }} />
    <Typography textAlign="center">Logout</Typography>
  </MenuItem>
);

export const UserMenu: React.FC<UserMenuProps> = () => {
  const { user } = useSelector((state: IState) => state.auth);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout().unwrap();
    localStorage.clear();
    window.location.replace('/auth/login');
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={user.firstName}
            src={user?.photo || '/images/user.png'}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <UserInfoSection user={user} />
        <Divider />
        <LogoutButton onClick={handleLogout} disabled={isLoading} />
      </Menu>
    </>
  );
};
