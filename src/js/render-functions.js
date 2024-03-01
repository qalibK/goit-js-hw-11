const imagesContainer = document.querySelector('.js-images-container');

export function appendHitsMarkup(data) {
  const markup = data
    .map(
      item =>
        `<li class="gallery-item">
          <a href="${item.largeImageURL}">
            <img src="${item.webformatURL}" alt="${item.tags}" width="360" height="200"/>
            <div class="text-content-box">
                <p class="image-text"><span class="image-title">Likes</span> ${item.likes}</p>
                <p class="image-text"><span class="image-title">Views</span> ${item.views}</p>
                <p class="image-text"><span class="image-title">Comments</span> ${item.comments}</p>
                <p class="image-text"><span class="image-title">Downloads</span> ${item.downloads}</p>
            </div>
        </a>
      </li>`
    )
    .join('');

  imagesContainer.insertAdjacentHTML('beforeend', markup);
}

export function clearHitsContainer() {
  imagesContainer.innerHTML = '';
}
