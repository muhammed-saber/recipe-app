import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../src/reducers';
import RecipeShow from '../../src/components/RecipeShow';
import { getRecipesStateFactory, getButtonFactory } from '../utility_functions';

describe('<RecipeShow />', () => {
  let store = createStore(reducer);
  let item;
  let getButton = () => {};

  const getRecipesState = getRecipesStateFactory(store);

  beforeEach(() => {
    item = mount(
      <Provider store={store}>
        <RecipeShow routeParams={{ id: 5 }}/>
      </Provider>
    );

    getButton = getButtonFactory(item);
  });


  it('should render', () => {
    expect(item).to.exist;
  });

  it('should render recipe list with id: 5', () => {
    const recipe5 = getRecipesState().find(recipe => recipe.id === 5);
    expect(item.find('h3').first().text()).to.equal(recipe5.name);
  });

  it('should have Edit button', () => {
    expect(getButton('Edit').exists()).to.be.true;
  });

  it('should have Delete button', () => {
    expect(getButton('Delete').exists()).to.be.true;
  });

  it('should have Back To Recipe List button', () => {
    expect(getButton('Back To Recipe List').exists()).to.be.true;
  });

  it('should delete recipe on Delete button click', () => {
    const deleteButton = item.findWhere(el => (
      (el.type() === 'a' || el.type() === 'button') && el.text() === 'Delete'
    )).first();
    const initialStateRecipes = getRecipesState();

    deleteButton.simulate('click');

    const finalStateRecipes = getRecipesState();
    expect(initialStateRecipes.length - finalStateRecipes.length).to.equal(1);
  });
});
