import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../src/reducers';
import RecipeEdit from '../../src/components/RecipeEdit';
import { getRecipesStateFactory, getButtonFactory } from '../utility_functions';

describe('<RecipeEdit />', () => {
  let store = createStore(reducer);
  let item;
  let getButton = () => {};

  const getRecipesState = getRecipesStateFactory(store);

  beforeEach(() => {
    item = mount(
      <Provider store={store}>
        <RecipeEdit routeParams={{ id: 5 }}/>
      </Provider>
    );

    getButton = getButtonFactory(item);
  });

  it('should render', () => {
    expect(item).to.exist;
  });

  it('should contain default values for id: 5', () => {
    const recipe5 = getRecipesState().find(recipe => recipe.id === 5);
    const wrappedInput = item.find('input [name="name"]').first();
    const wrappedTextArea = item.find('textarea [name="ingredients"]').first();

    expect(wrappedInput.prop('value')).to.equal(recipe5.name);
    expect(wrappedTextArea.prop('value')).to.equal(recipe5.ingredients);
  });

  it('should have Cancel button', () => {
    expect(getButton('Cancel').exists()).to.be.true;
  });

  it('should have Submit button', () => {
    expect(getButton('Submit').exists()).to.be.true;
  });

  it('should change recipes state on changed recipe 5 submit', () => {
    const wrappedInput = item.find('input [name="name"]').first();
    const wrappedForm = item.find('form').first();
    const initialRecipe = getRecipesState(store).find(recipe => recipe.id === 5);

    wrappedInput.simulate('change', { target: { value: 'New Recipe' }});
    wrappedForm.simulate('submit');

    const finalRecipe = getRecipesState(store).find(recipe => recipe.id === 5);

    expect(initialRecipe).not.to.deep.equal(finalRecipe);
    expect(finalRecipe.name).to.equal('New Recipe');

    // Return to default store state
    store = createStore(reducer);
  });
});
