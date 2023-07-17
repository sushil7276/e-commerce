import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import './Product.css';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import { useAlert } from "react-alert";
import Typography from '@material-ui/core/Typography';
import MetaData from '../layout/MetaData';


const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];


const Product = () => {
  const { keyword } = useParams()

  const dispatch = useDispatch();
  const alert = useAlert();

  // current page state
  const [currentPage, setCurrentPage] = useState(1);

  // filter state
  const [price, setPrice] = useState([0, 85000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);


  const {
    loading,
    products,
    error,
    productCount,
    resultPerPage,
    // filteredProductsCount,
  } = useSelector(state => state.products)

  // set current page no
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  // after apply filter count will be updated 
  // let count = filteredProductsCount;

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings))
  }, [dispatch, alert, error, keyword, currentPage, price, category, ratings])



  return (
    <>
      {loading ? <Loader /> :
        (
          <>
            <MetaData title="PRODUCTS -- ECOMMERCE" />
            <h1 className="productsHeading">Products</h1>
            <div className="products">
              {products && products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            <div className='filterBox'>

              {/* Price Field Set */}
              <fieldset>
                <Typography component="legend">Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={85000}
                />
              </fieldset>

              {/* Categories Field Set */}
              <fieldset>
                <Typography component="legend">Categories</Typography>
                <ul className='categoryBox'>
                  {categories.map((category) => (
                    <li
                      className='category-link'
                      key={category}
                      onClick={() => setCategory(category)}
                    >{category}</li>
                  ))}
                </ul>
              </fieldset>

              {/* Rating Field Set */}
              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>

            {resultPerPage < productCount && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </>
        )}
    </>
  )
}

export default Product