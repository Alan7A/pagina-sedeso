import React from "react";
import { AppBar, Toolbar, Container, List, ListItem, ListItemText, Hidden, ListItemIcon, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SideDrawer from "./SideDrawer";
import { School, Home, HelpOutline, ExitToApp, Event } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth";



const Navbar = () => {
    const classes = useStyles();
    const { usuario } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const navLinks = [
        {
            title: `Inicio`,
            path: '/',
            icon: <Home />
        },
        {
            title: `Cursos`,
            path: '/cursos',
            icon: <School />
        },
        {
            title: `Eventos`,
            path: '/eventos',
            icon: <Event />
        },
        {
            title: 'Sobre Nosotros',
            path: '/sobreNosotros',
            icon: <HelpOutline />
        },
        {
            title: usuario && 'Cerrar Sesión',
            action: () => dispatch(logout()),
            icon: usuario && <ExitToApp />
    
        }
    ];

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
                    <Link href="/">
                        <img src="/images/logoAGS.png" alt="logo" height='70px' />
                    </Link>
                    <Hidden xsDown>
                        <List
                            component="nav"
                            aria-labelledby="main navigation"
                            className={classes.navDisplayFlex}
                        >
                            {navLinks.map(({ title, path, icon, action }) => (
                                <Link underline='none' href={path} key={title} className={classes.linkText}>
                                    <ListItem button onClick={action}>
                                        <ListItemIcon className={classes.icon}>
                                            {icon}
                                        </ListItemIcon>
                                        <ListItemText primary={title} />
                                    </ListItem>
                                </Link>
                            ))}
                            {/* {usuario && (
                                <Link underline='none' key='logout' className={classes.linkText}>
                                    <ListItem className={classes.linkText} onClick={() => dispatch(logout())}>
                                        <ListItemIcon className={classes.icon}>
                                            <ExitToApp />
                                        </ListItemIcon>
                                        <ListItemText primary='Cerrar Sesión' />
                                    </ListItem>
                                </Link>
                            )} */}
                        </List>
                    </Hidden>
                    <Hidden smUp>
                        <SideDrawer navLinks={navLinks} />
                    </Hidden>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

const useStyles = makeStyles({
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: 'center',
    },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`,
    },
    linkText: {
        textDecoration: `none`,
        color: `white`,
        transition: 'linear .3s',
        "&:hover": {
            background: '#1f304d',
            cursor: 'pointer'
        },
    },
    icon: {
        color: 'white',
        marginRight: -25
    }
});

export default Navbar;