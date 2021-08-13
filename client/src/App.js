import { createTheme, MuiThemeProvider } from "@material-ui/core";
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from "./components/Routes/AppRouter";

function App() {
  // Cambiar color primario y secundario
  const theme = createTheme({
    palette: {
      primary: {
        main: '#24395b',
      },
      secondary: {
        main: '#f67f1c'
      }
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <AppRouter />
    </MuiThemeProvider>
  );
}

export default App;
