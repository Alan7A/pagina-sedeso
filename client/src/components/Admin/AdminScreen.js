import React, { useState } from 'react'
import { Typography, AppBar, Tabs, Tab, Box, Container, Paper } from "@material-ui/core";
import { Group, PhotoLibrary } from "@material-ui/icons";
import UsersScreen from './Users/UsersScreen';
import ChangePicturesScreen from './ChangePictures/ChangePicturesScreen';

function AdminScreen() {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (e, newValue) => {
        setSelectedTab(newValue);
    }

    return (
        <Container maxWidth='md' style={{ marginTop: 25 }}>
            <Typography variant='h3' paragraph>Panel de Administrador</Typography>

            <AppBar position="static" color='default'>
                <Tabs value={selectedTab} onChange={handleTabChange} variant='scrollable' scrollButtons='auto' >
                    <Tab label="Cambiar Imágenes" icon={<PhotoLibrary />} {...a11yProps(0)} />
                    <Tab label="Administrar Usuarios" icon={<Group />} {...a11yProps(1)} />
                </Tabs>
            </AppBar>

            <TabPanel value={selectedTab} index={0}>
                <ChangePicturesScreen />
            </TabPanel>

            <TabPanel value={selectedTab} index={1}>
                <UsersScreen />
            </TabPanel>
        </Container>
    )
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Paper elevation={2}
            style={{ minHeight: '70vh' }}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </Paper>
    );
}

export default AdminScreen
