import { combineReducers, applyMiddleware } from "redux";
import { createStore } from "redux";
// import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"
import { productReducer, productDetailsReducer, newReviewReducer, newProductReducer, productDeleteUpdateReducer, productReviewsReducer, reviewReducer } from "./reducers/productReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrderReducer, myOrdersReducer, newOrderReducer, orderDeleteUpdateReducer, orderDetailsReducer } from "./reducers/orderReducer";


const reducer = combineReducers({
    products: productReducer,
    productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productDeleteUpdateReducer,
    allOrders: allOrderReducer,
    order: orderDeleteUpdateReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
});

let initialState = {
    cart: {
        // if cart item is present in Local Storage
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    }
}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
// const store = configureStore({
//     reducer,
//     preloadedState: initialState,
//     middleware: [...middleware],
//     devTools: composeWithDevTools(applyMiddleware(...middleware)),
// });

export default store;

