import { ThemeProvider } from '@emotion/react';
import customColors from './BasicColors';

const theme = {
  ...customColors,
};

const EmotionThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default EmotionThemeProvider;
