'use client';
import { store } from '@/src/redux/store';
import SnackbarProvider from '@/src/shared/contexts/SnackbarProvider';
import theme from '@/theme';
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Provider as ReduxProvider } from 'react-redux';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
