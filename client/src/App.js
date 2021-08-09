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
import Login from "./components/Login/Login";

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

          <Route exact path='/login'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
