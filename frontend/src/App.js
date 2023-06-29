import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from './components/layout/Header/Header';
import WebFont from 'webfontloader';
import { useEffect, useState } from 'react';
import Footer from './components/layout/footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Product from './components/Product/Product';
import Search from './components/Product/Search';
import LoginSignUp from './components/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile';
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './components/Cart/Payment';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"



function App() {

  const { isAuthenticated, user } = useSelector(state => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {

    const { data } = await axios.get("/api/v1/stripeapikey")
    setStripeApiKey(data.stripeApiKey)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });


    // login user details store
    store.dispatch(loadUser());

    // Get Stripe Api Key
    getStripeApiKey();

  }, []);



  return (
    <div className="App">

      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/products' element={<Product />} />
          <Route path='/products/:keyword' element={<Product />} />
          <Route path='/search' element={<Search />} />
          <Route path='/login' element={<LoginSignUp />} />
          <Route path='/password/forgot' element={<ForgotPassword />} />
          <Route path='/password/reset/:token' element={<ResetPassword />} />
          {/* Cart */}
          <Route path='/cart' element={<Cart />} />


          {/* PROTECTED ROUTE */}
          <Route path='/account' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/me/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
          <Route path='/password/update' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
          {/* Shipping */}
          <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
          <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />

          {/* Payment Route */}
          {stripeApiKey && (
            <Route path='/process/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements></ProtectedRoute>} />
          )}



        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
