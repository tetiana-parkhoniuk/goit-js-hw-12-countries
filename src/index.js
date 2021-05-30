import './sass/main.scss';

import countryCardTemplate from '../src/templates/country-card.hbs';
import countriesListTemplate from '../src/templates/countries-list.hbs';

import API from './js/fetchCountries';
import getRefs from './js/getRefs';

import debounce from 'lodash.debounce';

import { error } from '@pnotify/core/dist/PNotify';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';


const refs = getRefs();

refs.input.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(event) {
    const searchQuery = event.target.value;

    clearCountriesContainer();

    API.fetchCountries(searchQuery)
        .then(response => {
            if (!response) {
                return;
            } else if (response.length > 10) {
                showNotification('Too many matches found. Please enter a more specific query!');
            } else if (response.length >= 2 && response.length <= 10) {

                renderCountriesList(response);
            } else if (response.length === 1) {
                renderCountryCard(response);
            } else {
                showNotification('Invalid input. Please try a more specific query!');
            }
        })
    .catch(error => console.log(error))
};

function renderCountryCard(country) {
    const countryCardMarkup = countryCardTemplate(country);
    refs.countriesContainer.insertAdjacentHTML('beforeend', countryCardMarkup);
};

function renderCountriesList(countries) {
    const countriesListMarkup = countriesListTemplate(countries);
    refs.countriesContainer.insertAdjacentHTML('beforeend', countriesListMarkup);

};

function clearCountriesContainer() {
    refs.countriesContainer.innerHTML = '';
};

export default function showNotification(text) {
    error({
        text: `${text}`,
        delay: 1000,
        closeHover: true,
    })
};