import axios from 'axios';

const API_BASE = 'https://pixabay.com/api/';
const API_KEY = '52976301-a1fb84bd42c9f8b3493191a02';

export function getImagesByQuery(query) {
    const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    };

    return axios.get(API_BASE, { params }).then(response => {
    return response.data;
    });
}