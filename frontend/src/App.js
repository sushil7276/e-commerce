import './App.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
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
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from './components/Admin/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder';
import UserList from './components/Admin/UserList';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews';
import Contact from './components/layout/Contact/Contact';
import About from './components/layout/About/About';
import NotFound from './components/layout/NotFound/NotFound';
import Login from './components/layout/Header/Login';



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

  // inspect menu block
  window.addEventListener("contextmenu", (e) => e.preventDefault());


  return (
    <div className="App">

      <Router>
        <Header />
        {isAuthenticated && user ? <UserOptions user={user} /> : <Login />}

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}

        <Switch>

          {/* ---------------------------------------------------------------------------------------------- */}
          {/* Public Access Route */}
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/about" component={About} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/products" component={Product} />
          <Route path="/products/:keyword" component={Product} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/login" component={LoginSignUp} />
          <Route exact path="/password/forgot" component={ForgotPassword} />
          <Route exact path="/password/reset/:token" component={ResetPassword} />

          {/* Cart */}
          <Route exact path="/cart" component={Cart} />


          {/* ---------------------------------------------------------------------------------------------- */}
          {/* PROTECTED ROUTE */}

          {/* Profile Route */}
          <ProtectedRoute exact path="/account" component={Profile} />
          <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
          <ProtectedRoute exact path="/password/update" component={UpdatePassword} />

          {/* Shipping */}
          <ProtectedRoute exact path="/shipping" component={Shipping} />
          <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

          {/* After payment Order success Route */}
          <ProtectedRoute exact path="/success" component={OrderSuccess} />


          {/* Order Route */}
          <ProtectedRoute exact path="/orders" component={MyOrders} />
          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />


          {/* Payment Route */}
          {/* {stripeApiKey && (
            <Route path='/process/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements></ProtectedRoute>} />
          )} */}



          {/* Admin Route */}
          <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/admin/products" isAdmin={true} component={ProductList} />
          <ProtectedRoute exact path="/admin/product" isAdmin={true} component={NewProduct} />
          <ProtectedRoute exact path="/admin/product/:id" isAdmin={true} component={UpdateProduct} />
          <ProtectedRoute exact path="/admin/orders" isAdmin={true} component={OrderList} />
          <ProtectedRoute exact path="/admin/order/:id" isAdmin={true} component={ProcessOrder} />
          <ProtectedRoute exact path="/admin/users" isAdmin={true} component={UserList} />
          <ProtectedRoute exact path="/admin/user/:id" isAdmin={true} component={UpdateUser} />
          <ProtectedRoute exact path="/admin/reviews" isAdmin={true} component={ProductReviews} />

          {/* If Wrong Route user put then go to this Component */}
          <Route component={window.location.pathname === "/process/payment" ? null : NotFound} />

        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
