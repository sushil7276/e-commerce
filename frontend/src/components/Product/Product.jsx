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


const Product = () => {
  const { keyword } = useParams()

  const dispatch = useDispatch();
  const alert = useAlert();

  // current page state
  const [currentPage, setCurrentPage] = useState(1);

  // default price range
  const [price, setPrice] = useState([0, 85000]);


  const {
    loading,
    products,
    error,
    productCount,
    resultPerPage,
    // filteredProductsCount,
  } = useSelector(state => state.products)

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

    dispatch(getProduct(keyword, currentPage, price))
  }, [dispatch, alert, error, keyword, currentPage, price])



  return (
    <>
      {loading ? <Loader /> :
        (<>
          <h1 className="productsHeading">Products</h1>
          <div className="products">
            {products && products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className='filterBox'>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={85000}
            />
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