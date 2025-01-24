import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 4,
        backgroundColor: '#F4F5FA',
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">Страница не найдена</Typography>
      <Image
        src="/images/5.png"
        width={800}
        height={500}
        alt="404"
        style={{
          width: 'auto',
          maxWidth: '100%',
          maxHeight: '100%',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
      <Button variant="contained" href="/">
        На главную
      </Button>
    </Box>
  );
};

export default NotFoundPage;
