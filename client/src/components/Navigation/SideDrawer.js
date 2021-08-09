import {
    Drawer,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExitToApp, Menu } from "@material-ui/icons";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth";

const useStyles = makeStyles({
    list: {
        width: 250
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `black`
    }
});

const SideDrawer = ({ navLinks }) => {
    const classes = useStyles();
    const [state, setState] = useState({ right: false });

    const { usuario } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const toggleDrawer = (anchor, open) => event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ [anchor]: open });
    };

    const sideDrawerList = anchor => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List component="nav">
                {navLinks.map(({ title, path, icon }) => (
                    <a href={path} key={title} className={classes.linkText}>
                        <ListItem button>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={title} />
                        </ListItem>
                    </a>
                ))}
                {usuario && (
                    <Link underline='none' key='logout' className={classes.linkText}>
                        <ListItem className={classes.linkText} onClick={() => dispatch(logout())}>
                            <ListItemIcon className={classes.icon}>
                                <ExitToApp />
                            </ListItemIcon>
                            <ListItemText primary='Cerrar Sesión' />
                        </ListItem>
                    </Link>
                )}
            </List>
        </div>
    );

    return (
        <React.Fragment>
            <IconButton
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer("right", true)}
            >
                <Menu fontSize="large" style={{ color: `white` }} />
            </IconButton>

            <Drawer
                anchor="right"
                open={state.right}
                onClose={toggleDrawer("right", false)}
            >
                {sideDrawerList("right")}
            </Drawer>
        </React.Fragment>
    );
};

export default SideDrawer;