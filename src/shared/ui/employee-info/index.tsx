'use client';

import { IUser } from '@/src/types/users';
import { Business, LocationOn, Person, VpnKey } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { memo } from 'react';
import { translateRole } from '../../helpers';

type Props = {
  user: IUser;
};

const EmployeeInfo = ({ user }: Props) => {
  return (
    <Card
      sx={{
        margin: 'auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <CardContent>
        {/* Header Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              border: '4px solid #f3f4f6',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
            src={user?.photo || '/images/user.png'}
          />
          <Typography variant="h4" gutterBottom color="primary">
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {user.phoneNumber}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Personal Information */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Person sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" color="primary.main">
              Персональная информация
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ pl: 4 }}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                ПИНФЛ:
              </Typography>
              <Typography>{user.nnuzb}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Пасспорт серия и номер:
              </Typography>
              <Typography>{user.ppn}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Дата рождения:
              </Typography>
              <Typography>{user.birthDate}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Пол:
              </Typography>
              <Typography>{user.gender}</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Address Information */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOn sx={{ mr: 1, color: 'secondary.main' }} />
            <Typography variant="h6" color="secondary.main">
              Адрес
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ pl: 4 }}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Страна
              </Typography>
              <Typography>{user.country}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Провинция
              </Typography>
              <Typography>{user.state}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Город
              </Typography>
              <Typography>{user.city}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Округ:
              </Typography>
              <Typography>{user.district}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Адрес
              </Typography>
              <Typography>{user.line}</Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Organizations */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Business sx={{ mr: 1, color: 'success.main' }} />
            <Typography variant="h6" color="success.main">
              Организации
            </Typography>
          </Box>
          <Box sx={{ pl: 4 }}>
            {user.organizations.map((org, index) => (
              <Chip
                key={org.id}
                label={org.name}
                sx={{
                  m: 0.5,
                  bgcolor: 'success.light',
                  color: 'success.contrastText',
                  '&:hover': {
                    bgcolor: 'success.main',
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Roles and Permissions */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <VpnKey sx={{ mr: 1, color: 'info.main' }} />
            <Typography variant="h6" color="info.main">
              Роли
            </Typography>
          </Box>
          <Box sx={{ pl: 4 }}>
            {user.roles.map((role) => (
              <Box key={role.id} sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 'bold', color: 'info.dark' }}
                >
                  {translateRole(role.name)}
                </Typography>
                {/* <Box sx={{ pl: 2 }}>
                  {role.permissions.map((permission) => (
                    <Chip
                      key={permission.id}
                      label={permission.name}
                      size="small"
                      sx={{
                        m: 0.5,
                        bgcolor: 'info.light',
                        color: 'info.contrastText',
                        '&:hover': {
                          bgcolor: 'info.main',
                        },
                      }}
                    />
                  ))}
                </Box> */}
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default memo(EmployeeInfo);
