import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please, try again.';
  _message = ''; // success message - for future uses

  // prettier-ignore
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  // prettier-ignore
  _generateMarkupPreview(recipe) {
    return `
      <li class="preview">
        <a class="preview__link" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="${recipe.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
          </div>
        </a>
      </li>`;
  }
}

export default new ResultsView();
