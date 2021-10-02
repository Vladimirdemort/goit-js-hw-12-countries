// ----------------------------------------------------------------------------
// --------------------------------- ИМПОРТЫ ----------------------------------
// ----------------------------------------------------------------------------

import countryList from './templates/countryList.hbs'
import countryTmpl from './templates/countryTmpl.hbs'
import API from './js/fetchCountries'
import getRefs from './js/refs'
const refs = getRefs();
import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js'
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js'
import '@pnotify/core/dist/PNotify.css'
import '@pnotify/core/dist/BrightTheme.css'
defaultModules.set(PNotifyMobile, {})
import { defaults } from '@pnotify/core'
defaults.width = '400px'
defaults.delay = '3000'
defaults.minHeight = '86px'

var debounce = require('lodash.debounce');


refs.searchForm.addEventListener('input', debounce(onSearch, 500))

// function onSearch(e) {
//   API.fetchCountries(e.target.value).then(quantityCheckCountries).catch(onFetchError)
// }

function quantityCheckCountries(country) {
  if (country.status === 404) {
    refs.cardContainer.innerHTML = ''
    alert({ text: 'Check the correctness of the data entered, this country does not exist!' })
    return
  } else if (country.length > 10) {
    refs.cardContainer.innerHTML = ''
    error({ text: 'Too many matches found. Please enter a more specific query!' })
    return
  } else if (country.length > 1) {
    refs.cardContainer.innerHTML = countryList(country)
    return
  }
  refs.cardContainer.innerHTML = countryTmpl(country)
};

function onFetchError(err) {
  refs.cardContainer.innerHTML = ''
  alert({ text: 'Check the correctness of the data entered!' })
};

function onSearch(e) {
  API.fetchCountry(e.target.value)
  .then(quantityCheckCountries)
 
}



// function fetchCountry(countryName) {
//   return  fetch(`https://restcountries.com/v3/name/${countryName}`)
// .then(response => {
//    return response.json()});
// }

function renderCountry(country) {  
    const markup = countryTmpl(country);
       refs.cardContainer.innerHTML = markup;
};

