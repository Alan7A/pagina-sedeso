import { Paper, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, withStyles, Button, Modal, Tooltip, IconButton } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import React, { Fragment, useEffect, useState } from 'react'
import axios from '../../utils/axios'
import { mostrarErrores, fileToBase64, headers } from '../../utils/funcionesUtiles'
import { useHistory, useParams } from 'react-router-dom'
import { DropzoneArea } from 'material-ui-dropzone'
import './styles.css'

const initialFormValues = {
    nom: '',
    ub: '',
    tel: ''
}

function CentrosContigoTable() {
    const [centros, setCentros] = useState([]);
    const history = useHistory()
    const { idCentro } = useParams();
    const styles = useStyles();
    const [modalAdd, setModalAdd] = useState(false);
    const [error, setError] = useState(false);
    const [crearCentro, setCrearCentro] = useState(initialFormValues);
    const [imagenes, setImagenes] = useState([]);

    const onChangeCentro = e => {
        setCrearCentro({
            ...crearCentro,
            [e.target.name]: e.target.value
        })
    }

    // Extraer los valores
    const { nom, ub, tel } = crearCentro;

    // Eliminar Centro
    const onDeleteCentro = async (e) => {
        await axios.delete(`/CentrosContigo/eliminar/${e}`, headers);
    }

    // Agregar Centro
    const onSubmitCentro = async (e) => {
        e.preventDefault();

        if (nom.trim() === '' || ub.trim() === '' || tel.trim() === '') {
            setError(true);
            return;
        }

        // Convertir files a base64 para poder subir a la bd
        const imagenesBase64 = await Promise.all(imagenes.map(async (imagen) => await fileToBase64(imagen)))
        // Hacer que las imágenes tengan el formato que acepta mysql
        const nuevasImagenes = imagenesBase64.map((imagen) => (Object.values({ imagen })))

        // Agregar los horarios y las imágenes al objeto que se manda en el body
        let data = crearCentro;
        data.imagenes = nuevasImagenes;

        setError(false);

        await axios.post(`/CentrosContigo/agregarCentro`, data, headers);

        abrirCerrarAdd();

        setCrearCentro({
            nom: '',
            ub: '',
            tel: ''
        })
    }

    useEffect(() => {
        const getCentros = async () => {
            try {
                const response = await axios.get(`/CentrosContigo/`);
                setCentros(response.data);
            } catch (error) {
                mostrarErrores(error);
            }
        }
        getCentros();
    }, [idCentro]);

    const handleClick = (id) => {
        history.push(`/centrosContigo/${id}`)
    }

    const abrirCerrarAdd = () => {
        setModalAdd(!modalAdd);
        setError(false);
        setCrearCentro({
            nom: '',
            ub: '',
            tel: ''
        })
    }

    const ModalAdd = (
        <div className={styles.modal}>
            <div className="center">
                <h2>Agregar centro contigo</h2>
            </div>
            <form
                onSubmit={onSubmitCentro}
            >
                <TextField
                    type="text"
                    label="Nombre del Centro"
                    name="nom"
                    value={nom}
                    onChange={onChangeCentro}
                    className={styles.texttield}
                />
                <br />
                <TextField
                    type="text"
                    label="Ubicación"
                    name="ub"
                    value={ub}
                    onChange={onChangeCentro}
                    className={styles.texttield}
                />
                <br />
                <TextField
                    type="tel"
                    label="Teléfono"
                    name="tel"
                    value={tel}
                    onChange={onChangeCentro}
                    className={styles.texttield}
                />
                <br /> <br />
                <div align="right">
                    <Button variant="contained" color="primary" type="submit" onChange={onChangeCentro} className={styles.button}>
                        <SaveAltIcon></SaveAltIcon>
                    </Button>
                    <Button variant="contained" color="primary" className={styles.button} onClick={() => abrirCerrarAdd()}>
                        <CloseIcon></CloseIcon>
                    </Button>
                </div>
                <DropzoneArea
                    acceptedFiles={['image/*']}
                    initialFiles={imagenes}
                    dropzoneText={"Arrastra tus imágenes o da clic aquí para subir imágenes (máximo 9)"}
                    onChange={(files) => setImagenes(files)}
                    filesLimit={9}
                    getFileLimitExceedMessage={(filesLimit) => `Solo se permiten ${filesLimit} imágenes como máximo`}
                    getFileAddedMessage={(fileName) => `Imagen ${fileName} agregada`}
                    getFileRemovedMessage={(fileName) => `Imagen ${fileName} eliminada`}
                    getDropRejectMessage={(rejectedFile, acceptedFiles, maxFileSize) => {
                        let message = `No Se pudo subir ${rejectedFile.name}. `;
                        if (acceptedFiles.includes(rejectedFile.type)) {
                            message += 'Solo puedes subir imagenes. ';
                        }
                        if (rejectedFile.size > maxFileSize) {
                            message += 'La imagen es demasiado pesada, el tamaño máximo es 3MB.';
                        }
                        return message;
                    }}
                />
            </form>
            {error ? <p className="mensaje error">Todos los campos son obligatorios</p> : null}
        </div>
    )

    return (
        <Fragment>
            <TableContainer component={Paper} style={{ height: 480 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Centro Contigo</StyledTableCell>
                            <StyledTableCell>Ubicación</StyledTableCell>
                            <StyledTableCell>
                                <Fab size="small" aria-label="add" className="" onClick={() => abrirCerrarAdd()}>
                                    <AddIcon />
                                </Fab>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {centros.map((centro, i) =>
                            <StyledTableRow key={i}>
                                <StyledTableCell onClick={() => handleClick(centro.id)}>{centro.CentroContigo}</StyledTableCell>
                                <StyledTableCell onClick={() => handleClick(centro.id)}>{centro.Ubicación}</StyledTableCell>
                                <StyledTableCell>
                                    <Tooltip title='Eliminar' onClick={() => onDeleteCentro(centro.id)}>
                                        <IconButton style={{ color: '#b00020' }}>
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                    {/* <Button variant="contained" color="primary" onClick={() => onDeleteCentro(centro.id)}>
                                        <DeleteIcon></DeleteIcon>
                                    </Button> */}
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>

            </TableContainer>
            <Modal
                open={modalAdd}
                onClose={abrirCerrarAdd}>
                {ModalAdd}
            </Modal>
        </Fragment>
    )
}

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 600,
        height: 450,
        backgroundColor: 'white',
        boxShadow: theme.shadows[5],
        padding: "16px 32px 24px",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    texttield: {
        width: '90%',
        padding: '1rem'
    },
    button: {
        margin: '1rem 0.5rem'
    }
}))

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:hover': {
            backgroundColor: 'rgba(246, 127, 28, .2)',
            cursor: 'pointer'
        }
    },
}))(TableRow);



export default CentrosContigoTable
