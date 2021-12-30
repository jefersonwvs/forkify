import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Creating a virtual DOM - a DOM object that does not live on the
    // real .html document. It is going to be used for comparison
    // with the real DOM object.
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // Selecting all elements from the virtual DOM object
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    // Selecting all elements from the real DOM object
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    // Looping through DOM looking for changes
    newElements.forEach((newElement, i) => {
      const currentElement = currentElements[i];

      // Updates changed TEXT
      if (
        // Verifying if there are differences between the two elements
        !newElement.isEqualNode(currentElement) &&
        // Verifying if the differences are concerning only to text nodes
        newElement.firstChild?.nodeValue.trim() !== ''
      ) {
        currentElement.textContent = newElement.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newElement.isEqualNode(currentElement)) {
        Array.from(newElement.attributes).forEach(attribute =>
          currentElement.setAttribute(attribute.name, attribute.value)
        );
      }
    });
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
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
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
