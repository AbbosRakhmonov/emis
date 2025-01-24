'use client';
import { createTheme } from '@mui/material/styles';

// This theme is based on the US Web Design System 2.0
// https://designsystem.digital.gov/components/button/
const theme = createTheme({
  palette: {
    primary: {
      main: '#1A202C',
    },
    secondary: {
      main: '#4C5154',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A202C',
      secondary: '#4C5154',
    },
  },
  typography: {
    fontFamily: 'Roboto, "Times New Roman", Times, serif',
  },
});

export default theme;
