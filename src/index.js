import fetchCountries from "./fetchCountries";
import countriesTemplate from "./countryList.hbs";
import countryTemplate from "./country.hbs";
import { alert } from '@pnotify/core';
import notifications from "./notifications";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/countdown/dist/PNotifyCountdown.css";
import "./styles.css";



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
        then(res => {
            if (res.status === 404) {
                handleError();
                return;
            } else handleResult(res);
        });
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
        alert(notifications.found);
    } else if (res.length > 10) {
        alert(notifications.foundTooMany);
        return;
    } else {
        renderCountries(res);
        alert(notifications.foundMany);
    }
}


function handleError() {
    alert(notifications.notFound);
}