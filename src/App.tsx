import { RouterProvider } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from './theme/GlobalStyles';
import EmotionThemeProvider from './theme/EmotionThemeProvider';
import MuiThemeProvider from './theme/MuiThemeProvider';
import router from './router';
import { StockInfoDataProvider } from './provider/StockInfoDataProvider';

const App = () => (
  <div className="App">
    <GlobalStyles />
    <EmotionThemeProvider>
      <MuiThemeProvider>
        <StyledEngineProvider injectFirst>
          <StockInfoDataProvider>
            <RouterProvider router={router} />
          </StockInfoDataProvider>
        </StyledEngineProvider>
      </MuiThemeProvider>
    </EmotionThemeProvider>
  </div>
);

export default App;
