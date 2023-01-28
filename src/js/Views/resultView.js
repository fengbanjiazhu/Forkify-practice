import View from './View';
import previewView from './previewView';

class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query, please try again';
  _message = '';

  _generateMarkUp() {
    // console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new resultsView();
