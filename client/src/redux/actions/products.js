import axios from '../../utils/axios';
import { headers, mostrarErrores, mostrarNotificacionSuccess } from '../../utils/funcionesUtiles';
import { types } from "../types"
import { closeCreateProductModal, closeDeleteProductDialog, closeEditProductModal } from './ui';

export const setSelectedProduct = (product) => ({
    type: types.setSelectedProduct,
    payload: product
});

export const loadProducts = () => {
    return async (dispatch) => {
        dispatch(startLoading());

        try {
            const response = await axios.get('/productos/todos', headers);
            dispatch(productsLoaded(response.data));
        } catch (error) {
            mostrarErrores(error);
        }
    }
}

const productsLoaded = (products) => ({
    type: types.productsLoaded,
    payload: products
});

export const startCreatingProduct = (productName) => {
    return async (dispatch) => {
        dispatch(startLoading());

        try {
            const response = await axios.post('/productos/agregar', { producto: productName }, headers);
            mostrarNotificacionSuccess(response.data.msg);
            dispatch(productCreated(response.data.idProducto, productName));
        } catch (error) {
            mostrarErrores(error);
            dispatch(stopLoading());
        }
        dispatch(closeCreateProductModal());
    }
}

const productCreated = (idProducto, productName) => ({
    type: types.productCreated,
    payload: formatoNuevoProducto(idProducto, productName)
});

export const updateProduct = (product) => { // product tiene que tener id, nombre y comentarios
    return async (dispatch) => {
        dispatch(startLoading());

        try {
            const response = await axios.put('/productos/editar/' + product.idProducto, product, headers);
            mostrarNotificacionSuccess(response.data.msg);
            dispatch(productUpdated(response.data.product)); // Por el momento no funciona porque el back manda los datos en otro formato
        } catch (error) {
            mostrarErrores(error);
            dispatch(stopLoading());
        }
        dispatch(closeEditProductModal());
    }
}

const productUpdated = (product) => ({
    type: types.productUpdated,
    payload: product
});

export const deleteProduct = (idProducto) => {
    return async (dispatch) => {
        dispatch(startLoading());

        try {
            const response = await axios.delete(`/productos/eliminar/${idProducto}`, headers);
            mostrarNotificacionSuccess(response.data.msg);
            dispatch(productDeleted());
        } catch (error) {
            mostrarErrores(error);
            dispatch(stopLoading());
        }
        dispatch(closeDeleteProductDialog());
    }
}

const productDeleted = () => ({ type: types.productDeleted });

const startLoading = () => ({ type: types.startLoadingProducts });
const stopLoading = () => ({ type: types.stopLoadingProducts })

function formatoNuevoProducto(idProducto, nombreProducto) {
    return {
        idProducto,
        Producto: nombreProducto,
        Enero: 0,
        Febrero: 0,
        Marzo: 0,
        Abril: 0,
        Mayo: 0,
        Junio: 0,
        Julio: 0,
        Agosto: 0,
        Septiembre: 0,
        Octubre: 0,
        Noviembre: 0,
        Diciembre: 0,
        Total: 0,
        'Meta Anual': 0,
        Observaciones: ''
    }
}


