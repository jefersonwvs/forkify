import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    // event delegation
    this._parentElement.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupNextButton(currentPage);
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupPreviousButton(currentPage);
    }

    // Other pages
    if (currentPage < numPages) {
      return (
        this._generateMarkupPreviousButton(currentPage) +
        this._generateMarkupNextButton(currentPage)
      );
    }

    // Page 1, and there are no other pages
    return '';
  }

  _generateMarkupPreviousButton(currentPage) {
    return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        currentPage - 1
      }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
    `;
  }

  _generateMarkupNextButton(currentPage) {
    return `
      <button class="btn--inline pagination__btn--next" data-goto="${
        currentPage + 1
      }">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();
