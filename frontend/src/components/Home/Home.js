import React, { Fragment } from 'react'
import { CgMouse } from 'react-icons/cg'
import "./Home.css"
import Product from './Product'
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';

const Home = () => {

    const alter = useAlert()
    const dispatch = useDispatch();
    const { loading, products, error } = useSelector(state => state.products);

    useEffect(() => {
        if (error) {
            alter.error(error)
            dispatch(clearErrors())
        }


        dispatch(getProduct());
    }, [dispatch, error, alter])

    return (
        <>
            {loading ? (<Loader />) : (
                <Fragment>
                    <MetaData title="E-commerce" />
                    <div className='banner'>
                        <p>Welcome to E-commerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>

                        <a href='#container'>
                            <button>
                                Scroll<CgMouse />
                            </button>
                        </a>
                    </div>
                    <h2 className='homeHeading'>Featured Products</h2>
                    <div className='container' id='container'>
                        {
                            products && products.map(product => (
                                <Product product={product} key={product._id} />
                            ))
                        }
                    </div>
                </Fragment>
            )}
        </>
    )
}

export default Home