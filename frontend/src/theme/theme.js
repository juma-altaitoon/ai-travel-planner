import { createTheme } from '@mui/material/styles';

const basePalette = {
  dark: {
    background: {
      default: '#0F172A',
      paper: '#1E293B'
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8'
    },
    primary: {
      main: '#10B981',
      contrastText: '#ffffff'
    }
  },
  light: {
    background: {
      default: '#ffffff',
      paper: '#f9fafb'
    },
    text: {
      primary: '#111827',
      secondary: '#475569'
    },
    primary: {
      main: '#0EA5E9',
      contrastText: '#ffffff'
    }
  }
};

export const getTheme = (mode = "dark") => createTheme({
    palette: {
        mode,
        ...basePalette[mode],
    },
    typography: {
        fontFamily: ["Inter", "system-ui", "sans-serif"].join(',')
    },
    
});

