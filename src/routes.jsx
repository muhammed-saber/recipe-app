import React from 'react';
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';
import App from './components/App';
import RecipeList from './components/RecipeList';
import RecipeNew from './components/RecipeNew';
import RecipeShow from './components/RecipeShow';
import RecipeEdit from './components/RecipeEdit';

export default (
  <Route path="/">
    <IndexRedirect to="fcc-recipe-box/" />
    <Route path="fcc-recipe-box/" component={App}>
      <IndexRoute component={RecipeList} />
      <Route path="recipe/new" component={RecipeNew} />
      <Route path="recipe/:id" component={RecipeShow} />
      <Route path="recipe/:id/edit" component={RecipeEdit} />
    </Route>
    <Redirect from="*" to="fcc-recipe-box/" />
  </Route>
);
