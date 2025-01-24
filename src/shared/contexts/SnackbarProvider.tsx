// context/SnackbarProvider.tsx
'use client';
import { setSnackbarRef, SnackbarOptions } from '@/src/utils/snackbarUtils';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import React, { ReactNode, useState } from 'react';

interface SnackbarState extends SnackbarOptions {
  open: boolean;
}

interface SnackbarProviderProps {
  children: ReactNode;
}

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
    autoHideDuration: 3000,
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
    title: '',
    variant: 'standard',
  });

  const showSnackbar = ({
    message,
    severity = 'info',
    autoHideDuration = 3000,
    anchorOrigin = { vertical: 'top', horizontal: 'center' },
    title,
    variant,
  }: SnackbarOptions): void => {
    setSnackbar({
      open: true,
      message,
      severity,
      autoHideDuration,
      anchorOrigin,
      title,
      variant,
    });
  };

  const closeSnackbar = (): void => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Set the global reference for `notification.show`
  setSnackbarRef(showSnackbar);

  return (
    <>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.autoHideDuration}
        onClose={closeSnackbar}
        anchorOrigin={snackbar.anchorOrigin}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.title && <AlertTitle>{snackbar.title}</AlertTitle>}
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackbarProvider;
