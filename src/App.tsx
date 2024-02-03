import { RouterProvider } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from './theme/GlobalStyles';
import EmotionThemeProvider from './theme/EmotionThemeProvider';
import MuiThemeProvider from './theme/MuiThemeProvider';
import router from './router';

const App = () => (
  <div className="App">
    <GlobalStyles />
    <EmotionThemeProvider>
      <MuiThemeProvider>
        <StyledEngineProvider injectFirst>
          <RouterProvider router={router} />
        </StyledEngineProvider>
      </MuiThemeProvider>
    </EmotionThemeProvider>
  </div>
);

export default App;
