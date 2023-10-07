import { CREATE_RECIPE, DELETE_RECIPE, REPLACE_RECIPE } from '../actions';
import INITIAL_STATE from '../defaultRecipes';

function getNewID(state) {
  return state.all.reduce((maxID, e) => (
    e.id > maxID ? e.id : maxID
  ), 0) + 1;
}

function getRecipeWithNewID(state, recipe) {
  return Object.assign({}, recipe, { id: getNewID(state) });
}

function createRecipe(state, recipe) {
  return Object.assign(
    {},
    state,
    { all: state.all.concat(
      recipe.id ? recipe : getRecipeWithNewID(state, recipe)
    ) }
  );
}

function deleteRecipe(state, id) {
  return Object.assign(
    {},
    state,
    { all: state.all.filter(recipe => recipe.id !== id) }
  );
}

export default function(state = INITIAL_STATE, action) {
  if (!action) return state;

  switch(action.type) {
  case CREATE_RECIPE:
    return createRecipe(state, action.recipe);
  case DELETE_RECIPE:
    return deleteRecipe(state, action.id);
  case REPLACE_RECIPE:
    return createRecipe(deleteRecipe(state, action.recipe.id), action.recipe);
  default:
    return state;
  }
}
