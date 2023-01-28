import icons from '../../img/icons.svg';

export default class View {
  _data;

  /**
   *
   * Render the received obj to the dom
   * @param {Object | Object[]} data  The data to be rendered
   * @param {boolean} [render=true]  If false , create markup string instead of rendering to the Dom
   * @return {undefined | string} A markup string is returned if render = false
   * @memberof View
   * @this {Object} View instance
   */
  render(data, render = true) {
    // if there is no data, or the data is an empty array
    // we will show the error message
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkUp();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkUp();
    // now we just need to compare the old markup and new one
    // but _generateMarkUp is a string, its hard to compare
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // loop over the new and old element
      // use  newEl.isEqualNode(curEl));
      // check if there are different between old and new elements
      // update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // change only text content of different nodes
        curEl.textContent = newEl.textContent;
      }
      // update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        // replacing all attributes from curEl with attributes of newEl
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner = function () {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  // if no message passed through, use default message
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
