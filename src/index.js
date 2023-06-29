import ApiService from './js/api-service.js';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('.search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let shownElementsNum = 0;

const getGalleryData = new ApiService();

searchForm.addEventListener('submit', handleSearchSubmit);
loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);



async function handleSearchSubmit(e) {
  e.preventDefault();

  galleryContainer.innerHTML = '';
  getGalleryData.searchQuery = searchForm.firstElementChild.value.trim();
  
  getGalleryData.resetPageNumber();
  shownElementsNum = 0;

  

   if (getGalleryData.searchQuery === '') {
    Notiflix.Notify.failure(
      'The search string cannot be empty. Please specify your search query.',
    );
    return;
  }

  fetchGallery();
  
}

async function fetchGallery() {
  loadMoreBtn.classList.add('is-hidden');
  
  const result = await getGalleryData.fetchGallery();
  const { hits, total } = result;
  

    
  if (!hits.length) {
     Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    loadMoreBtn.classList.add('is-hidden');
    return;
  }

  createMarkup(hits);
  shownElementsNum += hits.length;
  console.log(`shownElementsNum ${shownElementsNum}`);
   console.log(`total: ${total}`);
  if (shownElementsNum < total) {
    loadMoreBtn.classList.remove('is-hidden');
  } else {
    loadMoreBtn.classList.add('is-hidden');
     Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
}
  
  
  
  console.log(`shownElementsNum: ${shownElementsNum}`);
  
 


function createMarkup(data) {
  const markup = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
      <a href="${largeImageURL}">
        <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${downloads}
        </p>
      </div>
    </div>`;
      }
    )
    .join('');
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}



function handleLoadMoreBtnClick() {
   
   getGalleryData.incrementPageNumber();
  fetchGallery();
  
 
  

}


let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 200,
});