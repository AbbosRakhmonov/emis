'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#0077b6',
      main: '#023e8a',
      dark: '#03045e',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#a4133c',
      main: '#800f2f',
      dark: '#590d22',
      contrastText: '#FFFFFF',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#f9f9f9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#BDBDBD',
    },
    divider: '#E0E0E0',
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
    components: {},
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            // primary color
            backgroundColor: '#023e8a',
            '&:hover': {
              backgroundColor: '#023e8a',
            },
            '& *': {
              color: '#FFFFFF',
            },
          },
          '&:hover': {
            backgroundColor: '#0077b6',
            '& *': {
              color: '#FFFFFF',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 15px rgba(0,0,0,0.15)',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            color: '#333',
            fontSize: '1rem',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-columnSeparator': {
            color: '#e0e0e0',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f0f0f0',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #e0e0e0',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#f5f5f5',
            color: '#333',
          },
        },
      },
    },
  },
});

export default theme;
