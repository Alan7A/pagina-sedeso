import { toast } from 'react-toastify';

export function mostrarNotificacionSuccess(mensaje, posicion = 'top-right') {
    toast.success(mensaje, {
        position: posicion,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
    });
}

export function mostrarNotificacionError(mensaje, posicion = 'top-right') {
    toast.error(mensaje, {
        position: posicion,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
    });
}

export function mostrarErrores(errores) {
    console.error(errores.response.data);

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

export const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const isTimeValid = (horaInicio, horaFin) => {
    const horaI = Number(horaInicio.substr(0, 2));
    const minutoI = Number(horaInicio.substr(3, 2));
    const horaF = Number(horaFin.substr(0, 2));
    const minutoF = Number(horaFin.substr(3, 2));
    console.log(horaInicio, horaFin);

    if (horaI === horaF) {
        if (minutoI >= minutoF) return false
    } else if (horaI >= horaF) {
        return false
    } else return true
}

export const headers = { headers: { 'x-token': localStorage.getItem('token') } }