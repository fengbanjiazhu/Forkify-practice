import View from './View';

import icons from '../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      // passthrough the data to controller
      handler(goToPage);
    });
  }

  _generateMarkUp() {
    // debug
    // console.log(this._data.length);
    // console.log(this._data.resultsPerPage);

    // prettier-ignore
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    const curPage = this._data.page;
    // console.log(curPage);
    // Page 1, with other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateNextButton(curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generatePrevButton(curPage);
    }
    // other pages
    if (curPage < numPages) {
      return this._generatePrevButton(curPage).concat(
        this._generateNextButton(curPage)
      );
    }
    // Page 1, with No other pages
    return '';
  }

  _generatePrevButton(Page) {
    return `
        <button data-goto="${
          Page - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>${Page - 1}</span>
        </button>`;
  }

  _generateNextButton(Page) {
    return `
    <button data-goto="${Page + 1}" class="btn--inline pagination__btn--next">
      <span>${Page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
  `;
  }
}

export default new paginationView();
