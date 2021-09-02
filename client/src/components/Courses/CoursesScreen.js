import { Breadcrumbs, Card, Fab, Container, Grid, Link, Tooltip, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Course from './Course'
import axios from '../../utils/axios'
import './styles.css'
import { mostrarErrores } from '../../utils/funcionesUtiles'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(2),
    },
  }));

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
  ];



function CoursesScreen() {
    const [cursos, setCursos] = useState([]);
    const history = useHistory();
    const { idCurso } = useParams();
    const classes = useStyles();
        
    useEffect(() => {
        const getCursos = async () => {
            try {
                const response = await axios.get(`/cursos/todos`);
                setCursos(response.data);
            } catch (error) {
                mostrarErrores(error);
            }
        }
        getCursos();
    }, [idCurso]);

    const options = top100Films.map((option) => {
        const firstLetter = option.title[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
      });
    return (
        <Container maxWidth='lg' style={{ marginTop: 35 }}>
            <Breadcrumbs style={{ marginTop: 30 }}>
                <Link color="inherit" href="/" onClick={() => history.push('/')}>
                    Inicio
                </Link>
                <Link color="inherit" href="/getting-started/installation/" onClick={() => history.push('/centrosContigo')}>
                    Centros Contigo
                </Link>
                
            </Breadcrumbs>
            <h2 className="subtitulo">Cursos</h2>


            <Grid item container xs={6} alignItems="flex-end" direction="column">
                <Grid item xs={3}>
                    <Autocomplete    
                    placement="right-start"
                    id="grouped-demo"
                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 300, icon: SearchIcon, }}
                    renderInput={(params) => <TextField {...params} label="Buscar curso" variant="outlined" />}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                {cursos.map((curso, i) => <Course curso={curso} centroContigo={curso.Curso} key={i} />)}
                <Grid item xs={12} sm={6} md={4}>
                    <Card elevation={3} style={{ backgroundColor: '#4caf50', color: 'white' }}>
                    </Card>
                </Grid>
            </Grid>
            
            


            <Grid container justifyContent="center">
                <Grid item xs={1}>
                    <Tooltip title="Add" aria-label="add"  placement="top">
                        <Fab color="primary" className={classes.fab}>
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Grid>
            </Grid>
            
            <h2 className="subtitulo"></h2>
        </Container>
    )
}
/*Falta terminar el buscador, me falta conectarlo a la base de datos.*/
//Boton para cargar mas cursos, falta conectar.
export default CoursesScreen
