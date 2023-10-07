import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createRecipe } from '../actions';
import RenderField from './RenderField';

class RecipeNew extends React.Component {
  onSubmit(props) {
    this.props.createRecipe(props);
    browserHistory.push('/');
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(props => this.onSubmit(props))}>
        <h3 className="text-center">Add A New Recipe</h3>
        <div className="form-group">
          <Field
            component={RenderField}
            name="name"
            type="text"
            label="Name"
            placeholder="Enter your recipe name"
          />
        </div>
        <div className="form-group">
          <Field
            component={RenderField}
            name="ingredients"
            type="text"
            multiRow="true"
            label="Ingredients"
            placeholder="Enter your ingredients"
          />
        </div>

        <div className="pull-right">
          <button className="btn btn-primary" type="submit">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </div>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) errors.name = 'Enter a recipe name';
  if (!values.ingredients) errors.ingredients = 'Enter some ingredients';

  return errors;
}

const RecipeNewDecorated = reduxForm({
  form: 'RecipeNewForm',
  validate
})(RecipeNew);

export default connect(null, { createRecipe })(RecipeNewDecorated);
