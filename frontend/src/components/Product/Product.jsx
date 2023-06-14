import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import './Product.css'
import { useParams } from 'react-router-dom'


const Product = () => {

  const { keyword } = useParams()

  const dispatch = useDispatch()
  const { loading, products, error } = useSelector(state => state.products)

  useEffect(() => {

    if (error) {
      dispatch(clearErrors())
    }


    dispatch(getProduct(keyword))
  }, [dispatch, error, keyword])

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
        </>)}
    </>
  )
}

export default Product