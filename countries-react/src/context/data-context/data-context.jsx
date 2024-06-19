import { createContext, useState, useEffect } from 'react';

// Create a context
let DataContext = createContext();

// Create a provider component
let DataProvider = ({ children }) => {

    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(true);

    let [countries, setCountries] = useState({ countriesList: [], region: {} })

    let fetchData = async () => {
        try {
            let response = await fetch("https://restcountries.com/v3.1/all");
            let countriesData = await response.json();
          
            let regionData = {}
            countriesData.forEach(country => {
                if (!regionData[country.region]) {
                    regionData[country.region] = new Set()
                }
                regionData[country.region].add(country.subregion)
            });
            console.log(countriesData)
            console.log("hello")
            setCountries({ countriesList: countriesData, region: regionData })
          
            
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log(countries)

  return (
        <DataContext.Provider value={ {countries, loading,error} }>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
