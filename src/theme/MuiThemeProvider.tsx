import { ThemeProvider, createTheme } from '@mui/material/styles';
import IBasicColors from './BasicThemeType';
import customColors from './BasicColors';

declare module '@mui/material/styles' {
  interface Theme {
    customColor: IBasicColors;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customColors?: IBasicColors
  }
}

const theme = createTheme({
  ...customColors,
});

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default MuiThemeProvider;
