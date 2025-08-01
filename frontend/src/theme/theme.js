import { createTheme } from '@mui/material/styles';

const basePalette = {
  "dark": {
    "background": {
      "default": "#263238",
      "paper": "#455a64"
    },
    "text": {
      "primary": "#e5e7eb",
      "secondary": "#b0bec5"
    },
    "primary": {
      "main": "#bcaaa4",
      "contrastText": "#272730"
    },
    "secondary": {
      "main": "#1a237e",
      "contrastText": "#e5e5e5"
    }
  },
  "light": {
    "background": {
      "default": "#FFFFFF",
      "paper": "#bdbdbd"
    },
    "text": {
      "primary": "#212121",
      "secondary": "#063672"
    },
    "primary": {
      "main": "#8d6e63",
      "contrastText": "#f9fafc"
    },
    "secondary": {
      "main": "#3f51b5",
      "contrastText": "#212121"
    }
  }
};

export const getTheme = (mode = "dark") => createTheme({
    palette: {
        mode,
        ...basePalette[mode],
    },
    typography: {
        fontFamily: ["Roboto", "Open-sans", "Inter", "system-ui", "sans-serif"].join(',')
    },
    
});

