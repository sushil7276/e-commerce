import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import './Product.css'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'


const Product = () => {

  const { keyword } = useParams()

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch()
  const { loading, products, error, productsCount, resultPerPage } = useSelector(state => state.products)

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }

  useEffect(() => {

    if (error) {
      dispatch(clearErrors())
    }


    dispatch(getProduct(keyword, currentPage))
  }, [dispatch, error, keyword, currentPage])

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

          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
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