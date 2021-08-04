import * as React from "react";
import {
    AppBar,
    Toolbar,
    Container,
    List,
    ListItem,
    ListItemText,
    Hidden,
    ListItemIcon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SideDrawer from "./SideDrawer";
import { Business, Home, HelpOutline } from "@material-ui/icons";

const navLinks = [
    {
        title: `Inicio`,
        path: '/',
        icon: <Home/>
    },
    {
        title: `Centros Contigo`,
        path: '/centrosContigo',
        icon: <Business />
    },
    {
        title: 'Sobre Nosotros',
        path: '/sobreNosotros',
        icon: <HelpOutline />
    }
];

const Navbar = () => {
    const classes = useStyles();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
                    <a href="/">
                        <img src="/images/logoAGS.png" alt="logo" height='70px' />
                    </a>
                    <Hidden xsDown>
                        <List
                            component="nav"
                            aria-labelledby="main navigation"
                            className={classes.navDisplayFlex}
                        >
                            {navLinks.map(({ title, path, icon }) => (
                                <a href={path} key={title} className={classes.linkText}>
                                    <ListItem button>
                                        <ListItemIcon className={classes.icon}>
                                            {icon}
                                        </ListItemIcon>
                                        <ListItemText primary={title} />
                                    </ListItem>
                                </a>
                            ))}
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
        alignItems: 'center'
    },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    linkText: {
        textDecoration: `none`,
        color: `white`,
        transition: 'linear .3s',
        "&:hover": {
            background: '#1f304d'
        }
    },
    icon: {
        color: 'white',
        marginRight: -25
    }
});

export default Navbar;