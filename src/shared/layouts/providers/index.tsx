'use client';
import { store } from '@/src/redux/store';
import SnackbarProvider from '@/src/shared/contexts/SnackbarProvider';
import theme from '@/theme';
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Provider as ReduxProvider } from 'react-redux';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ReduxProvider store={store}>
        <SnackbarProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </SnackbarProvider>
      </ReduxProvider>
    </AppRouterCacheProvider>
  );
}
