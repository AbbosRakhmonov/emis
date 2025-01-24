'use client';
import {
  Box,
  Container,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
            height: {
              xs: '80vh',
              md: 'auto',
            },
          }}
        >
          {/* Left Section */}
          {!isMobile && (
            <Box
              sx={{
                position: 'relative',
                flex: 1,
                bgcolor: '#f5f5f5',
                p: { md: 4, lg: 8 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  mt: 4,
                }}
              >
                <Image
                  src="/images/login.svg"
                  alt="Doctor illustration"
                  fill
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
              </Box>
            </Box>
          )}

          {/* Right Section */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 4, md: 6, lg: 8 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              '::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                transform: 'translate(0, -80%)',
                opacity: '0.1',
                bgcolor: '#2e7d32',
              },
              '::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                opacity: '0.1',
                transform: 'translate(0, 80%)',
                bgcolor: '#2e7d32',
              },
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{ mb: 1, textAlign: 'center' }}
            >
              <span style={{ color: '#2e7d32' }}>EMIS</span> Система
            </Typography>
            {children}
          </Box>
        </Paper>
        {/* copy right */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            p: 2,
            width: '100%',
          }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            &copy; 2025 EMIS. Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;
