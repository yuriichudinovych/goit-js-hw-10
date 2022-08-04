import markupCountryTpl from '../temlates/markup-country.hbs';
import markupCountryListTpl from '../temlates/murcup-country-list.hbs';
import '../css/styles.css';
import fetchCountries from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const debounce = require('lodash.debounce');

const searchBoxRef = document.querySelector('#search-box');
const countryInfoRef = document.querySelector('.country-info');
const countryListRef = document.querySelector('.country-list');

const DEBOUNCE_DELAY = 300;

const deleleMarkup = () => {
  countryInfoRef.innerHTML = '';
  countryListRef.innerHTML = '';
};

const createMarkup = countries => {
  deleleMarkup();
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  if (countries.length >= 2) {
    countryListRef.innerHTML = markupCountryListTpl(countries);
    return;
  }

  if (countries.length === 1) {
    countryInfoRef.innerHTML = markupCountryTpl(countries);
    return;
  }
};

searchBoxRef.addEventListener(
  'input',
  debounce(() => {
    if (searchBoxRef.value.trim() === '') {
      countryListRef.innerHTML = '';
      return;
    }
    fetchCountries(searchBoxRef.value.trim())
      .then(res => {
        console.log(res);
        createMarkup(res);
      })
      .catch(error => {
        deleleMarkup();
        Notify.failure('Oops, there is no country with that name');
      });
  }, DEBOUNCE_DELAY)
);
