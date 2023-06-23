// import { combineReducers, applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension"
import { productReducer, productDetailsReducer } from "./reducers/productReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";


const reducer = combineReducers({
    products: productReducer,
    productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
});

let initialState = {};

const middleware = [thunk];

// const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
const store = configureStore({
    reducer,
    initialState,
    middleware: [...middleware],
})

export default store;

