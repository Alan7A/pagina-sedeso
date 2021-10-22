import { types } from "../types";

const initialState = {
    products: [],
    selectedProduct: null,
    isLoading: false
}

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.setSelectedProduct:
            return {
                ...state,
                selectedProduct: action.payload
            }

        case types.productsLoaded:
            return {
                ...state,
                products: [...action.payload],
                isLoading: false
            }

        case types.productCreated:
            return {
                ...state,
                products: [...state.products, action.payload],
                isLoading: false
            }

        case types.productUpdated:
            return {
                ...state,
                products: state.products.map((product) => (product.idProducto === action.payload.idProducto) ? action.payload : product),
                isLoading: false,
            }

        case types.productDeleted:
            return {
                ...state,
                products: state.products.filter((product) => product.idProducto !== state.selectedProduct.idProducto),
                selectedProduct: null,
                isLoading: false,
            }

        case types.startLoadingProducts:
            return {
                ...state,
                isLoading: true
            }

        case types.stopLoadingProducts:
            return {
                ...state,
                isLoading: false
            }

        default:
            return state
    }
}