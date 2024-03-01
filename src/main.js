import { appendHitsMarkup, clearHitsContainer } from './js/render-functions';
import { ImagesApiService, onError } from './js/pixabay-api';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  waitingText: document.querySelector('.js-waiting-text'),
};

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  refs.waitingText.style.display = 'block';

  imagesApiService.query = e.currentTarget.elements.query.value;
  imagesApiService.resetPage();

  if (imagesApiService.query === '') {
    onError();
    clearHitsContainer();
    return;
  }

  imagesApiService
    .fetchImages(searchQuery)
    .then(hits => {
      clearWaitingText();
      clearHitsContainer();
      appendHitsMarkup(hits);
    })
    .catch(error => {
      console.log(error);
    });

  refs.searchForm.reset();
}

function clearWaitingText() {
  refs.waitingText.style.display = 'none';
}
