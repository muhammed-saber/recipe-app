import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { replaceRecipe } from '../actions';
import RenderField from './RenderField';
import { chooseRecipeOnMount } from './RecipeShow';

const checkValueExistence = value => value ? undefined : 'Required';

class RecipeEdit extends React.Component {
  componentWillMount() {
    this.chosenRecipe = chooseRecipeOnMount(this.props);
  }

  componentDidMount() {
    // Assign default values for redux-form,
    // which will be used on validation
    this.props.initialize(this.chosenRecipe);
  }

  onSubmit(data) {
    const id = parseInt(this.props.routeParams.id);
    this.props.replaceRecipe(Object.assign({}, data, { id }));
    browserHistory.push('/');
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(data => this.onSubmit(data))}>
        <h3 className="text-center">Edit Recipe</h3>
        <div className="form-group">
          <Field
            component={RenderField}
            name="name"
            type="text"
            label="Name"
            validate={checkValueExistence}
          />
        </div>
        <div className="form-group">
          <Field
            component={RenderField}
            name="ingredients"
            type="text"
            multiRow="true"
            label="Ingredients"
            validate={checkValueExistence}
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

const RecipeEditDecorated = reduxForm({
  form: 'RecipeEditForm'
})(RecipeEdit);

function mapStateToProps({ recipes }) {
  return { recipes: recipes.all };
}

export default connect(mapStateToProps, { replaceRecipe })(RecipeEditDecorated);
