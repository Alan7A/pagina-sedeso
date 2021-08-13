import { createTheme, MuiThemeProvider } from "@material-ui/core";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { renovarToken } from "./redux/actions/auth";
import AppRouter from "./components/Routes/AppRouter";

function App() {
  const dispatch = useDispatch();

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

  // Obtener el usuario del token, si es que hay
  useEffect(() => {
    dispatch(renovarToken());
  }, [dispatch])

  return (
    <MuiThemeProvider theme={theme}>
      <AppRouter />
    </MuiThemeProvider>
  );
}

export default App;
