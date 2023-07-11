import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import "./ProductDetails.css"
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from 'react-alert';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from "../../actions/cartAction"
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core"
import { Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constant/productConstant';


function ProductDetails() {

    // Get the id from URL
    const { id } = useParams();

    const alert = useAlert();

    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(state => state.productDetailsReducer);

    const { success, error: reviewError } = useSelector((state) => state.newReview);

    // This options for rating stars
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    }

    // useState
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    // Quantity increase or decrease //
    const [quantity, setQuantity] = useState(1);

    // increase   
    const increaseQuantity = () => {
        if (product.stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    //decrease
    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);

    };

    // Add cart items
    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart");
    };

    // Submit Review
    const reviewSubmitHandler = () => {

        const myForm = new FormData();
        myForm.set('rating', rating);
        myForm.set('comment', comment);
        myForm.set('productId', id);

        dispatch(newReview(myForm));

        // close dialog box
        setOpen(false);
    }


    const submitReviewToggle = () => {

        open ? setOpen(false) : setOpen(true);
    }

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }

        // We will get the product details
        dispatch(getProductDetails(id));



    }, [dispatch, id, error, alert, reviewError, success]);




    return (
        <>
            {loading ? (<Loader />) :
                (
                    <>
                        <MetaData title={`${product.name} -- ECOMMERCE`} />
                        <div className="ProductDetails">
                            <div>
                                <Carousel>
                                    {product.images && product.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={item.url}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                                </Carousel>
                            </div>

                            <div>
                                <div className="detailsBlock-1">
                                    <h2>{product.name}</h2>
                                    <p>Product # {product._id}</p>
                                </div>
                                <div className='detailsBlock-2'>
                                    <ReactStars {...options} />
                                    <span className='detailsBlock-2-span'>({product.numOfReviews} Reviews)</span>
                                </div>

                                <div className="detailsBlock-3">
                                    <h1>{`₹ ${product.price}`}</h1>

                                    <div className="detailsBlock-3-1">

                                        {/* quantity */}
                                        <div className="detailsBlock-3-1-1">
                                            <button onClick={decreaseQuantity}>-</button>
                                            <input readOnly type="number" value={quantity} />
                                            <button onClick={increaseQuantity}>+</button>
                                        </div>

                                        {/* Add to cart */}
                                        <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                                    </div>

                                    <p>
                                        Status:
                                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                            {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                        </b>
                                    </p>
                                </div>

                                <div className="detailsBlock-4">
                                    Description : <p>{product.description}</p>
                                </div>

                                <button className='submitReview' onClick={submitReviewToggle}>Submit Review</button>

                            </div>
                        </div>

                        <h3 className="reviewsHeading">REVIEWS</h3>
                        <Dialog
                            aria-labelledby='simple-dialog-title'
                            open={open}
                            onClose={submitReviewToggle}
                        >
                            <DialogTitle>Submit Review</DialogTitle>
                            <DialogContent className='submitDialog'>
                                <Rating
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating}
                                    size='large'
                                />

                                <textarea
                                    className='submitDialogTextArea'
                                    cols='30'
                                    rows='5'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
                                <Button color='primary' onClick={reviewSubmitHandler}>Submit</Button>
                            </DialogActions>

                        </Dialog>

                        {product.reviews && product.reviews[0] ? (
                            <div className='reviews'>
                                {product.reviews && product.reviews.map((review, i) => (<ReviewCard review={review} key={i} />))}
                            </div>
                        ) : (<p className='noReviews'>No Reviews Yet</p>)}
                    </>)}
        </>
    )
}

export default ProductDetails