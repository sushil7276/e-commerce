import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from './components/layout/Header/Header';
import WebFont from 'webfontloader';
import { useEffect } from 'react';
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



function App() {

  const { isAuthenticated, user } = useSelector(state => state.user)


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });


    // login user details store
    store.dispatch(loadUser());

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


          {/* PROTECTED ROUTE */}
          <Route path='/account' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/me/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
          <Route path='/password/update' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />



        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
