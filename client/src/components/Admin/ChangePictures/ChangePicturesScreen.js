import React, { useEffect, useState } from 'react'
import { Button, Container, Typography } from '@material-ui/core'
import { DropzoneArea } from 'material-ui-dropzone';
import axios from '../../../utils/axios'
import { fileToBase64, headers, mostrarErrores, mostrarNotificacionSuccess } from '../../../utils/funcionesUtiles';
import { useSelector } from 'react-redux';
import Loading from '../../Loading';


function ChangePicturesScreen() {
    const [infoCentro, setInfoCentro] = useState({});
    const [imagenes, setImagenes] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const { usuario } = useSelector(state => state.auth);

    useEffect(() => {
        const getImages = async () => {
            try {
                const response = await axios.get(`/CentrosContigo/${usuario.idCentro}`);
                setInfoCentro(response.data);

                const imagenesCurso = response.data.imagenes.map(img => img.imagen);
                setImagenes(imagenesCurso);
            } catch (error) {
                mostrarErrores(error);
            }
            setIsLoading(false)
        }
        getImages();
    }, [usuario.idCentro]);

    const handleActualizarImagenes = async () => {
        try {
            // Convertir files a base64 para poder subir a la bd
            const imagenesBase64 = await Promise.all(imagenes.map(async (imagen) => await fileToBase64(imagen)));
            // Hacer que las imágenes tengan el formato que acepta mysql
            const nuevasImagenes = imagenesBase64.map((imagen) => (Object.values({ imagen })));

            let data = infoCentro;
            data.imagenes = nuevasImagenes;
            console.log(data);

            await axios.put(`/CentrosContigo/editar/${usuario.idCentro}`, data, headers);
            mostrarNotificacionSuccess('Imágenes actualizadas correctamente.');
        } catch (error) {
            mostrarErrores(error)
        }
    }

    return (
        <Container>
            <Typography variant='h4' style={{ marginBottom: 10 }}>
                Cambiar imágenes de la página de inicio
            </Typography>

            {isLoading ? (<Loading />)
                : (
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
                )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant='contained'
                    color='primary'
                    style={{ marginTop: 15, marginLeft: 'auto' }}
                    onClick={handleActualizarImagenes}
                >
                    Actualizar imágenes
                </Button>
            </div>
        </Container>
    )
}

export default ChangePicturesScreen
