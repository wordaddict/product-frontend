import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Product from './components/product'
import Details from './components/details'

function App() {
  return (
    <Router>
        <Route exact path="/" component={Product} />
        <Route strict path="/details" component={Details} />
    </Router>
  );
}

export default App;
