import './App.css';
import { BrowserRouter as Router } from "react-router-dom"
import Header from './components/layout/Header/Header';
import WebFont from 'webfontloader';
import { useEffect } from 'react';



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
      </Router>
    </div>
  );
}

export default App;
