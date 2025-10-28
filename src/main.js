import { getImagesByQuery } from './js/pixabay-api.js';
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');

function notifyEmptyQuery() {
    iziToast.warning({
    title: 'Warning',
    message: 'Please enter a search query.',
    position: 'topRight',
    });
}

function notifyNoResults() {
    iziToast.error({
    title: 'No results',
    message:
        'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
    });
}

function notifyError(errorMessage = 'An error occurred while fetching images') {
    iziToast.error({
    title: 'Error',
    message: errorMessage,
    position: 'topRight',
    });
}

form.addEventListener('submit', event => {
    event.preventDefault();

    const query = input.value.trim();

    if (query.length === 0) {
    notifyEmptyQuery();
    return;
    }

    clearGallery();
    showLoader();

    getImagesByQuery(query)
    .then(data => {
        if (!data || !Array.isArray(data.hits)) {
        notifyError('Unexpected response format from API.');
        return;
        }

        if (data.hits.length === 0) {
        notifyNoResults();
        return;
        }

        createGallery(data.hits);
    })
    .catch(error => {
        console.error('API error:', error);
        notifyError(error.message || 'Failed to fetch images.');
    })
    .finally(() => {
        hideLoader();
    });
});
