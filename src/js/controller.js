import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);

  } catch (error) {
    console.error(error);
  }
};

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', showRecipe);
['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes)
);
