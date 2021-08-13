import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CentrosCrecerScreen from "../CentrosCrecer/CentrosCrecerScreen";
import CentroCrecerScreen from "../CentrosCrecer/CentroCrecerScreen";
import CourseScreen from "../Course/CourseScreen";
import HomepageScreen from "../Homepage/HomepageScreen";
import Navbar from "../Navigation/Navbar";
import AboutUsScreen from "../AboutUs/AboutUsScreen";
import LoginScreen from "../Login/LoginScreen";
import { PublicRoute } from "./PublicRoute";
import { useSelector } from 'react-redux';

function AppRouter() {
    const { usuario } = useSelector(state => state.auth);

    return (
        <Router>
            <ToastContainer />
            <Navbar />

            <Switch>
                <Route exact path='/'>
                    <HomepageScreen />
                </Route>

                <PublicRoute component={LoginScreen} isAuthenticated={ !!usuario } />

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
        </Router >
    );
}

export default AppRouter;
