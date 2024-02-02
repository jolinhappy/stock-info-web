import { ThemeProvider } from '@emotion/react';
import customColor from './BasicColor';

const theme = {
  ...customColor,
};

const EmotionThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default EmotionThemeProvider;
