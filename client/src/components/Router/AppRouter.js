import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CentrosCrecerScreen from "../CentrosCrecer/CentrosCrecerScreen";
import CentroCrecerScreen from "../CentrosCrecer/CentroCrecerScreen";
import CourseScreen from "../Courses/CourseScreen";
import HomepageScreen from "../Homepage/HomepageScreen";
import Navbar from "../Navigation/Navbar";
import AboutUsScreen from "../AboutUs/AboutUsScreen";
import LoginScreen from "../Login/LoginScreen";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from './PrivateRoute'
import { useDispatch, useSelector } from 'react-redux';
import UsersScreen from '../Users/UsersScreen';
import { useEffect } from 'react';
import { renovarToken } from '../../redux/actions/auth';
import Loading from '../Loading';
import UpdateCentroCrecerForm from '../CentrosCrecer/UpdateCentroCrecerForm';
import CoursesScreen from '../Courses/CoursesScreen';
import Footer from '../Footer/Footer';
import CoursesForm from '../Courses/CoursesForm';

function AppRouter() {
    const dispatch = useDispatch();
    const { usuario, isLoading } = useSelector(state => state.auth);

    useEffect(() => {
        // Obtener el usuario del token, si es que hay
        dispatch(renovarToken());
    }, [dispatch])

    if (isLoading) {
        return <Loading />
    }

    return (
        <Router>
            <ToastContainer />
            <Navbar />

            <body className="app">
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

                    <Route exact path='/cursos'>
                        <CoursesScreen />
                    </Route>

                    <PrivateRoute exact path='/cursos/crearCurso' isAuthenticated={!!usuario} >
                        <CoursesForm />
                    </PrivateRoute>

                    <PrivateRoute exact path='/cursos/modificarCurso/:idCurso' isAuthenticated={!!usuario} >
                        <CoursesForm editar />
                    </PrivateRoute>

                    <Route exact path='/sobreNosotros'>
                        <AboutUsScreen />
                    </Route>

                    <Route exact path='/actualizarCentroContigo'>
                        <UpdateCentroCrecerForm />
                    </Route>

                    <PublicRoute exact path='/login' component={LoginScreen} isAuthenticated={!!usuario} />

                    <PrivateRoute exact path='/usuarios' isAuthenticated={!!usuario} >
                        <UsersScreen />
                    </PrivateRoute>
                </Switch>
            </body>

            <Footer />
        </Router >
    );
}

export default AppRouter;
