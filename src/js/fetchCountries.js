function fetchCountry(countryName) {
    return  fetch(`https://restcountries.com/v3/name/${countryName}`)
  .then(response => {
     return response.json()});
  }

export default { fetchCountry }