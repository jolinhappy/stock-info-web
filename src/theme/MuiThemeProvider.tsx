import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import IBasicColors from './BasicThemeType';
import customColor from './BasicColor';

declare module '@material-ui/core/styles' {
  interface Theme {
    customColor: IBasicColors;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customColor?: IBasicColors
  }
}

const theme = createTheme({
  ...customColor,
});

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default MuiThemeProvider;
