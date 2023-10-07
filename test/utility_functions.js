export const getRecipesStateFactory = store => (
  () => store.getState().recipes.all
);

export const getButtonFactory = wrappedEnzymeItem => (
  name => (
    wrappedEnzymeItem.findWhere(el => (
      (el.type() === 'a' || el.type() === 'button') && el.text() === name
    ))
  )
);
