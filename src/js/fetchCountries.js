import { error } from '@pnotify/core/dist/PNotify';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const BASE_URL = 'https://restcountries.eu/rest/v2/';

function fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}name/${searchQuery}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(
                error({
                    text: `Please enter specific query!`,
                    delay: 500,
                    closeHover: true,
                })
            );
        });
}

// function fetchCountries(searchQuery) {
//     return fetch(`${BASE_URL}name/${searchQuery}`)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//             throw new Error(response.statusText);
//         })
// }

export default { fetchCountries };