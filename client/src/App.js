import { createTheme, MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CentrosCrecerScreen from "./components/CentrosCrecer/CentrosCrecerScreen";
import CentroCrecerScreen from "./components/CentrosCrecer/CentroCrecerScreen";
import CourseScreen from "./components/Course/CourseScreen";
import HomepageScreen from "./components/Homepage/HomepageScreen";
import Navbar from "./components/Navigation/Navbar";
import AboutUsScreen from "./components/AboutUs/AboutUsScreen";
import { useEffect, useState } from "react";
import axios from './utils/axios';
import { useDispatch } from "react-redux";
import { login } from "./redux/actions/auth";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    const obtenerUsuario = async () => {
      const token = localStorage.getItem('token') || '';
      try {
        const response = await axios.get('/auth/renovarToken', { headers: { 'x-token': token } })
        const usuario = response.data.usuario;
        dispatch(login(usuario));
        setIsAuthenticated(true);
      } catch (error) {
        // Token no valido, no ha iniciado sesión
        setIsAuthenticated(false);
        console.log(error.response);
      }
    }
    obtenerUsuario();
  }, [dispatch])

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <ToastContainer />
        <Navbar />

        <Switch>
          <Route exact path='/'>
            <HomepageScreen />
          </Route>

          <Route exact path='/centrosContigo'>
            <CentrosCrecerScreen />
          </Route>

          <Route exact path='/centrosContigo/:centroContigo'>
            <CentroCrecerScreen />
          </Route>

          <Route exact path='/centrosContigo/:centroContigo/cursos/:course'>
            <CourseScreen />
          </Route>

          <Route exact path='/sobreNosotros'>
            <AboutUsScreen />
          </Route>            
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
