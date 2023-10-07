import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class RecipeList extends React.Component {
  renderRecipes() {
    return this.props.recipes.map(recipe => (
      <Link
        key={recipe.id}
        type="button"
        className="list-group-item"
        to={`/fcc-recipe-box/recipe/${recipe.id}`}
      >
        <span className="badge">{recipe.ingredients.split(/, ?/).length}</span>
        {recipe.name}
      </Link>
    ));
  }

  render() {
    return (
      <div>
        <h2>Recipe List</h2>
        <div className="list-group">
          {this.renderRecipes()}
        </div>
        <Link to="/fcc-recipe-box/recipe/new" className="btn btn-primary pull-right">
          Add Recipe
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ recipes }) {
  return { recipes: recipes.all };
}

export default connect(mapStateToProps)(RecipeList);
