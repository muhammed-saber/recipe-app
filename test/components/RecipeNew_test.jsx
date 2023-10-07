import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../src/reducers';
import RecipeNew from '../../src/components/RecipeNew';
import { getRecipesStateFactory, getButtonFactory } from '../utility_functions';

describe('<RecipeNew />', () => {
  let store = createStore(reducer);
  let item;
  let getButton = () => {};

  const getRecipesState = getRecipesStateFactory(store);

  beforeEach(() => {
    item = mount(
      <Provider store={store}>
        <RecipeNew />
      </Provider>
    );

    getButton = getButtonFactory(item);
  });

  it('should render', () => {
    expect(item).to.exist;
  });

  it('should have input field with name "name"', () => {
    expect(item.find('input [name="name"]').first()).to.exist;
  });

  it('should have textare field with name "ingredients"', () => {
    expect(item.find('textarea [name="ingredients"]').first()).to.exist;
  });

  it('should have Cancel button', () => {
    expect(getButton('Cancel').exists()).to.be.true;
  });

  it('should have Submit button', () => {
    expect(getButton('Submit').exists()).to.be.true;
  });

  it('should add recipe to store on submitting new data', () => {
    const wrappedInput = item.find('input [name="name"]').first();
    const wrappedTextArea = item.find('textarea [name="ingredients"]').first();
    const wrappedForm = item.find('form').first();
    const initialStateRecipes = getRecipesState();

    wrappedInput.simulate('change', { target: { value: 'New Recipe' }});
    wrappedTextArea.simulate('change', { target: { value: 'some ingredients' }});
    wrappedForm.simulate('submit');

    const finalStateRecipes = getRecipesState();

    expect(finalStateRecipes.length - initialStateRecipes.length).to.equal(1);
    expect(finalStateRecipes.some(recipe => (
      recipe.name === 'New Recipe' && recipe.ingredients === 'some ingredients'
    ))).to.be.true;

    // Clean up to default store
    store = createStore(reducer);
  });
});
