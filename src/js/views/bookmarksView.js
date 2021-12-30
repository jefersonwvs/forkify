import View from './View.js';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No recipes yet. Find a nice recipe and bookmark it ;)';
  _message = ''; // success message - for future uses

  // prettier-ignore
  _generateMarkup() {
    return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
  }
}

export default new BookmarksView();
