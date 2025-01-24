import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => (
  <Box
    component="main"
    sx={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      backgroundColor: '#F4F5FA',
      overflow: 'auto',
      flexDirection: { xs: 'column', sm: 'row' },
    }}
  >
    <Image
      src="/images/5.webp"
      alt="404"
      width={200}
      height={350}
      style={{ objectFit: 'contain' }}
    />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography
        variant="h1"
        color="text.primary"
        sx={{
          fontSize: { xs: '4rem', sm: '5rem', md: '6rem' },
        }}
      >
        404
      </Typography>
      <Typography
        variant="h5"
        color="text.secondary"
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          textAlign: 'center',
        }}
      >
        Страница не найдена
      </Typography>
      <Link href={'/'} replace passHref>
        <Button size="large" color="primary" variant="contained" sx={{ mt: 2 }}>
          На главную
        </Button>
      </Link>
    </Box>
  </Box>
);

export default NotFoundPage;
