import GlobalStyles from './theme/GlobalStyles';
import EmotionThemeProvider from './theme/EmotionThemeProvider';
import MuiThemeProvider from './theme/MuiThemeProvider';
import TopBar from './components/common/TopBar';

const App = () => {
  console.log();
  return (
    <div className="App">
      <GlobalStyles />
      <EmotionThemeProvider>
        <MuiThemeProvider>
          <TopBar />
        </MuiThemeProvider>
      </EmotionThemeProvider>
    </div>
  );
};

export default App;
