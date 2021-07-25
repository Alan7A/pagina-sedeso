import { createTheme, MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CentroCrecerScreen from "./components/CentrosCrecer/CentroCrecerScreen";
import CourseScreen from "./components/Course/CourseScreen";
import HomepageScreen from "./components/Homepage/HomepageScreen";
import Navbar from "./components/Navigation/Navbar";

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
        <Navbar />

        <Switch>
          <Route exact path='/'>
            <HomepageScreen />
          </Route>

          <Route exact path='/centrosContigo/:centroContigo'>
            <CentroCrecerScreen />
          </Route>

          <Route exact path='/centrosContigo/:centroContigo/cursos/:course'>
            <CourseScreen />
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
