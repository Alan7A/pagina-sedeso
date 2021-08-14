import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { uiReducer } from './reducers/uiReducer';
import { usersReducer } from './reducers/usersReducer';

// Todos los reducers se agregan aquí
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    users: usersReducer
});

// Para tener los middlewares de Redux DevTools y Thunk 
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));