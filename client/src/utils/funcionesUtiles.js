import { toast } from 'react-toastify';

export function mostrarNotificacionSuccess(mensaje, posicion='top-right') {
    toast.success(mensaje, {
        position: posicion,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
    });
}

export function mostrarErrores(errores) {
    console.error(errores.response);

    if (errores.response.data.errors) {
        errores.response.data.errors.forEach(err => {
            toast.error(err.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
            });
        });
        // Despues tal vez mandar los errores al store
    } 
}