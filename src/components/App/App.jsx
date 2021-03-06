import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import './App.css';

import PizzaList from '../PizzaList/PizzaList';

import PizzaForm from '../PizzaForm/PizzaForm';

import Order from '../Order/Order.jsx'


function App() {

  // setup dispatch
  const dispatch = useDispatch();

  // setup useEffect to call fetchPizza function
  useEffect(() => {
    fetchPizza();
  }, []);

  const fetchPizza = () => {
    console.log('in fetchPizza');

    // send request to server side
    axios.get('/api/pizza')
      .then((res) => {
        // tell client of success
        console.log('pizza from database:', res.data);

        // send data to pizzaReducer
        dispatch({
          type: 'SET_PIZZA',
          payload: res.data
        });
      })
      .catch((err) => {
        // tell client of failure
        console.error('axios GET ERROR!', err);
      });
  }

  return (
    <Router>
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-title'>Prime Pizza</h1>
      </header>
    <Link to="/">Home</Link>
    <Link to="/pizzaList">PizzaList</Link>
    <Link to="/order">Order</Link>
    <br />
      <img src='images/pizza_photo.png' />
      <p>Pizza is great.</p>

      <PizzaForm fetchPizza={fetchPizza} />


      <Route path="/pizzaList" exact>

      <PizzaList />
      </Route>

      <Route path="/order" exact>
      <Order />
      </Route>
    </div>
    </Router>
  );
}

export default App;
