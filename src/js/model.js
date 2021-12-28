export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {

  try {
    // https://forkify-api.herokuapp.com/v2
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const json = await response.json();

    if (!response.ok) {
      throw new Error(`${json.message} (${response.status})`);
    }

    const { recipe } = json.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (error) {
    alert(error);
  }
};
