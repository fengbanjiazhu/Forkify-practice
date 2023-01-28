import * as model from './model';
import recipeView from './Views/recipeView';
import searchView from './Views/searchView';
import resultView from './Views/resultView';
import paginationView from './Views/paginationView';
import bookmarksView from './Views/bookmarksView';
import addRecipeView from './Views/addRecipeView';
import { MODEL_CLOSE_SEC } from './config';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    // get the hash from the url bar
    // set guard if no id appears
    const id = window.location.hash.slice(1);
    if (!id) return;
    // render the loading spinner
    recipeView.renderSpinner();

    // update the results view to mark selected
    resultView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // load recipe
    // use id to set the database (model.state.recipe)
    await model.loadRecipe(id);

    // rendering
    // render the page with the data we just set
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const showSearchResults = async function () {
  try {
    resultView.renderSpinner();
    // get search input value
    const query = searchView.getQuery();
    if (!query) return;

    // loading the search data
    await model.loadSearchResults(query);

    // console.log(model.state.search);

    // render the search results
    resultView.render(model.getSearchResultsPage());

    // render pagination results
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  // render New search results
  resultView.render(model.getSearchResultsPage(goToPage));
  // render pagination results
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings in state
  model.updateServings(newServings);
  // update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // add or remove bookmarks
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // update bookmark
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // loading spinner
    addRecipeView.renderSpinner();
    // upload the new recipe data
    await model.uploadRecipe(newRecipe);
    // console.log(model.state.recipe);
    // render recipe
    recipeView.render(model.state.recipe);

    // render success message
    addRecipeView.renderMessage();

    //render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (error) {
    console.log(error);
    addRecipeView.renderError(error.message);
  }
};

// publisher-subscriber pa
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(showSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  // controlServings();
};

init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
