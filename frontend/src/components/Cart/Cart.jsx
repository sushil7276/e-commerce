import React, { Fragment } from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart, removeCartItem } from '../../actions/cartAction';
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";

function Cart({history}) {

    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        if (stock <= quantity) return;
        const newQty = quantity + 1;
        dispatch(addItemsToCart(id, newQty))
    }

    const decreaseQuantity = (id, quantity) => {
        if (1 >= quantity) return;
        const newQty = quantity - 1;
        dispatch(addItemsToCart(id, newQty))
    }

    // Remove Cart Item
    const deleteCartItem = (id) => {
        dispatch(removeCartItem(id));
    }

    // checkout
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    }

    return (
        <>
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />

                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ) : (
                <Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>
                        {cartItems && cartItems.map((item) => (

                            <div className="cartContainer" key={item.product}>
                                <CartItemCard item={item} deleteCart={deleteCartItem} />

                                {/* Quantity "+" OR "-" */}
                                <div className="cartInput">
                                    <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                    <input type="number" value={item.quantity} readOnly />
                                    <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                </div>

                                {/* Subtotal */}
                                <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                            </div>
                        ))}

                        {/* Gross Profit */}
                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Profit</p>
                                <p>₹{`${cartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0)}`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkoutHandler}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </>
    )
}

export default Cart