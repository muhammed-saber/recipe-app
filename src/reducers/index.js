import { combineReducers } from 'redux';
import reducerRecipes from './reducerRecipes';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  recipes: reducerRecipes,
  form: formReducer
});
