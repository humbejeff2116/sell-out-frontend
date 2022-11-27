
const CountriesStatesCities = {

    Africa: {

        Nigeria: {

            Benue: [
                {name: "Markudi"},
                {name: "Gboko"},
            ]
        },
    },
} 

const countriesStates = {
    Africa: {
        Nigeria: [
            {name:"Abia"},
            {name:"Adamawa"},
            {name:"Akwaibom"},
            {name:"Anambra"},
            {name:"Bauchi"},
            {name:"Benue"},
            {name:"Borno"}
        ]
    },
}

const countries = {
    Africa: [
        {
            name:"Nigeria"
        },
        {
            name:"Ghana"
        },
        {
            name:"South Africa"
        }
    ]
}

const LinksData = { }
function Countries() { }
Countries.prototype.data = LinksData;

Countries.prototype.getCountryContinent = async function({ country }) {
    let continent;

    for (let key in countries) {
        await countries[key].forEach(cntry => { 
            if (cntry.name === country) {
               return setContinentName(key);
            }
        })
    }

    function setContinentName(key) {
        continent = key;
    }
    return continent;
}

Countries.prototype.getCountries = function({ continent = "" }) {
    return countries[continent]
}

Countries.prototype.getCountryStates = function({ continent = "", country = "" }) {
    if (!continent) {
        const countryContinent = this.getCountryContinent(country);
        return countriesStates[countryContinent][country]
    }

    return countriesStates[continent][country]
}

Countries.prototype.getStateCities = function({ continent = "", country = "", state = "" }) {
    return CountriesStatesCities[continent][country][state]
}

export default new Countries();