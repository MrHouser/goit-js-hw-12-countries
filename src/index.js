import fetchCountries from "./fetchCountries";
import countriesTemplate from "./countryList.hbs";
import countryTemplate from "./country.hbs";
import { defaultModules } from '@pnotify/core';
import * as PNotifyBootstrap4 from '@pnotify/bootstrap4';
import { alert, notice, info, success, error } from '@pnotify/core';

defaultModules.set(PNotifyBootstrap4, {});

// const myErr = error({ text: 'qweqwe!' });
// myErr.fire;

const debounce = require('lodash.debounce');
const refs = {
    inputRef: document.querySelector('.input'),
    countriesListRef: document.querySelector('.countries-list'),
    countryContainerRef: document.querySelector('.country-container')
}

refs.inputRef.addEventListener('input', debounce(inputHandler, 500));

function inputHandler() {
    refs.countriesListRef.innerHTML = '';
    refs.countryContainerRef.innerHTML = '';
    fetchCountries(refs.inputRef.value).
        then(handleResult)
        .catch(handleError);
}


function renderCountries(country) {

    refs.countriesListRef.insertAdjacentHTML('beforeend', countriesTemplate(country));
}

function renderCountry(country) {
    refs.countryContainerRef.innerHTML = '';
    refs.countryContainerRef.insertAdjacentHTML('beforeend', countryTemplate(country));
}

function handleResult(res) {
    if (res.length === 1) {
        renderCountry(res);
    } else if (res.length > 10) {
        alert('enter valid country name');
        return;
    } else {
        renderCountries(res);
    }
}

function handleError() {
    alert('Country not found!');
}

