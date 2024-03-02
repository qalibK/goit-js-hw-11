import { appendHitsMarkup, clearHitsContainer } from './js/render-functions';
import { ImagesApiService, onError } from './js/pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
    clearWaitingText();
    clearHitsContainer();
    return;
  }

  imagesApiService
    .fetchImages(searchQuery)
    .then(hits => {
      clearWaitingText();
      clearHitsContainer();
      appendHitsMarkup(hits);
      const imagesContainer = document.querySelector('.images');
      const simpleLightbox = new SimpleLightbox('.images a');
    })
    .catch(error => {
      console.log(error);
    });

  refs.searchForm.reset();
}

function clearWaitingText() {
  refs.waitingText.style.display = 'none';
}
