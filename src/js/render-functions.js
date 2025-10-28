import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'loaders.css/loaders.min.css';

const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    if (!Array.isArray(images) || images.length === 0) return;

    const markup = images
    .map(img => {
        const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        } = img;

        return `
        <li class="gallery__item">
        <a href="${largeImageURL}" class="gallery__link">
            <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="card-stats">
            <span>👍 ${likes}</span>
            <span>👁 ${views}</span>
            <span>💬 ${comments}</span>
            <span>⬇ ${downloads}</span>
        </div>
        </li>
    `;
    })
    .join('');

    gallery.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();
}

export function clearGallery() {
    gallery.innerHTML = '';
}

export function showLoader() {
    if (!loader) return;
    loader.classList.add('visible');
    loader.setAttribute('aria-hidden', 'false');
}

export function hideLoader() {
    if (!loader) return;
    loader.classList.remove('visible');
    loader.setAttribute('aria-hidden', 'true');
}