import React, { useState } from 'react'
import { Button, Container, Typography } from '@material-ui/core'
import { DropzoneArea } from 'material-ui-dropzone'

function ChangePicturesScreen() {
    const [imagenes, setImagenes] = useState([]);

    return (
        <Container>
            <Typography variant='h4' style={{ marginBottom: 10 }}>
                Cambiar imágenes de la página de inicio
            </Typography>

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

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='contained' color='primary' style={{ marginTop: 15, marginLeft: 'auto' }}>
                    Actualizar imágenes
                </Button>
            </div>
        </Container>
    )
}

export default ChangePicturesScreen
