class searchView {
  #parentElement = document.querySelector('.search');
  #data;

  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    // clear inout area
    this.clearInput();

    return query;
  }

  clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      // prevent the submit action will reload the page
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
