import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Header from './components/layout/Header/Header';
import WebFont from 'webfontloader';
import { useEffect } from 'react';
import Footer from './components/layout/footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';


function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])
  return (
    <div className="App">

      <Router>
        <Header />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/product/:id' element={<ProductDetails />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
