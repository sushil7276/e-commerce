import { combineReducers, applyMiddleware, createStore } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"
import { productReducer, productDetailsReducer } from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";


const reducer = combineReducers({
    products: productReducer,
    productDetailsReducer,
    user: userReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;

