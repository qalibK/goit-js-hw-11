import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://pixabay.com/api/';

export class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}?key=42616276-59c99055eec179e7b1bf68313&q=${this.searchQuery}&lang=en&per_page=15&Page=${this.page}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.total === 0) {
          onError();
        }

        this.incrementPage();
        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export function onError(error) {
  iziToast.show({
    message: `Sorry, there are no images matching <br> your search query. Please, try again!`,
    position: 'topRight',
    timeout: 5000,
    backgroundColor: '#ef4040',
    messageColor: '#ffffff',
    messageSize: '12',
    close: true,
    closeOnEscape: true,
    progressBarColor: '#B51B1B',
    progressBar: true,
    layout: 2,
    maxWidth: 432,
    maxHeigth: 88,
    animateInside: true,
    iconUrl: '/x-octagon.svg',
    transitionIn: 'fadeInRight',
    transitionOut: 'fadeOutRight',
  });
}
