export const CREATE_RECIPE = 'CREATE_RECIPE';
export const REPLACE_RECIPE = 'REPLACE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';

export function createRecipe(recipe) {
  return {
    type: CREATE_RECIPE,
    recipe
  };
}

export function replaceRecipe(recipe) {
  return {
    type: REPLACE_RECIPE,
    recipe
  };
}

export function deleteRecipe(id) {
  return {
    type: DELETE_RECIPE,
    id
  };
}
