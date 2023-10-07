import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import combinedReducer from './reducers';

import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import './css/style.scss';

function getRecipesFromLocalStorage() {
  const recipesObj = JSON.parse(localStorage.getItem('recipes'));
  return recipesObj ? { recipes: recipesObj } : undefined;
}

const store = createStore(combinedReducer, getRecipesFromLocalStorage());

// Sync recipes in store and localStorage
store.subscribe(() => {
  const recipesAsString = JSON.stringify(store.getState().recipes);
  localStorage.setItem('recipes', recipesAsString);
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector('.container')
);
