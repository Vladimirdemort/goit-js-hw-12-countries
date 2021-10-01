const COUNTRIES_URL = "https://restcountries.com/v3/name"



function fetchCountries(searchCountry) {
    return fetch(`${COUNTRIES_URL}/${searchCountry}`).then(response => {
        return response.json
    })
};


export default { fetchCountries }