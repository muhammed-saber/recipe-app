import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { deleteRecipe } from '../../src/actions';
import reducer from '../../src/reducers';
import RecipeList from '../../src/components/RecipeList';
import { getButtonFactory } from '../utility_functions';

describe('<RecipeList />', () => {
  let store = createStore(reducer);
  let item;
  let getButton = () => {};

  beforeEach(() => {
    item = mount(
      <Provider store={store}>
        <RecipeList />
      </Provider>
    );

    getButton = getButtonFactory(item);
  });

  it('should render', () => {
    expect(item).to.exist;
  });

  it('should have 5 default recipes', () => {
    expect(item.find('a [type="button"]')).to.have.lengthOf(5);
  });

  it('should have 4 default recipes after one is deleted from store', () => {
    store.dispatch(deleteRecipe(1));
    expect(item.find('a [type="button"]')).to.have.lengthOf(4);
    store = createStore(reducer);
  });

  it('should have Add button', () => {
    expect(getButton('Add Recipe').exists()).to.be.true;
  });
});
