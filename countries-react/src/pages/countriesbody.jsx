
import FilterInput from "./components/input/FilterInput";
import FilterSelection from "./components/selection/FilterSelection";
import countriesData from "../data/countries-data";
import { useContext, useEffect, useState } from "react";
import CountryCard from "./components/card/CountryCard";
import StyleContext from "../context/style-context";
import ErrorPage from "./errorPage";



let sort = ['Ascending', 'Descending']

function CountryBody() {
    let { isDarkMode } = useContext(StyleContext)


    let [countries, setCountries] = useState({ countriesList: [], region: {} })
    let [filterData, setFilterData] = useState([])

    ///sub regions

    let [region, setRegion] = useState('')//contains selected region name
    let regionList = Object.keys(countries.region)
    
    // let countriesListData = countries.countriesList

    let [subRegionList, setSubRegionList] = useState([])//contains subregions list in the region
    let [subRegion, setSubRegion] = useState('')//contains selected subregion name

    let [error, setError] = useState('')//
    

    useEffect(() => {
        async function getCountriesData() {
            try {
                let countries = await countriesData()
                let regionData = {}
                countries.forEach(country => {
                    if (!regionData[country.region]) {
                        regionData[country.region] = new Set()
                    }
                    regionData[country.region].add(country.subregion)

                });
                setFilterData(countries)
                setCountries({ countriesList: countries, region: regionData })

            } catch (error) {
                console.log(error)
                setError(error.message)

            }
        }
        getCountriesData()
    }, [])
    // sectionOptions,selectionOnChange



    let searchByRegion = (event) => {

        let selectedRegion = event.target.value
        setRegion(selectedRegion)
        let copyOfCountryList = JSON.parse(JSON.stringify(countries.countriesList))
        let regionCountries = copyOfCountryList.filter(country => country.region.toLowerCase() == selectedRegion.toLowerCase())
        let subregions = regionCountries.reduce((acuminates, currentValue) => {
            acuminates.add(currentValue.subregion)
            return acuminates
        }, new Set())

        setSubRegionList([...subregions])
        setFilterData(regionCountries)
        setSubRegion('')

    }

    let searchBySubRegion = (event) => {

        let selectedSubRegion = event.target.value
        let subRegionCountries = countries.countriesList.filter(country => country.region.toLowerCase() == region.toLowerCase()).filter(country => country.subregion.toLowerCase() == selectedSubRegion.toLowerCase())
        setFilterData(subRegionCountries)
        setSubRegion(selectedSubRegion)
    }
    let sortByPopuLation = (event) => {
        let copyOfFilterData = JSON.parse(JSON.stringify(filterData))
        let sortedCountries = copyOfFilterData.sort((country1, country2) => country1.population - country2.population)

        if (event.target.value == sort[1]) {
            sortedCountries.reverse();
        }
        setFilterData(sortedCountries)
    }

    let sortByArea = (event) => {
        let copyOfFilterData = JSON.parse(JSON.stringify(filterData))
        let sortedCountries = copyOfFilterData.sort((country1, country2) => country1.area - country2.area)

        if (event.target.value == sort[1]) {
            sortedCountries.reverse();
        }
        setFilterData(sortedCountries)
    }

    let searchByInput = (event) => {
        let copyOfCountryList = JSON.parse(JSON.stringify(countries.countriesList))
        let subregion = subRegion
        let searchValue = event.target.value.toLowerCase()
        let selectedRegion = region
        let selectedRegionsList = copyOfCountryList.filter(country => country.region === selectedRegion)
        let selectedSubRegionsList = selectedRegionsList.filter(country => country.subregion === subregion)

        if (selectedSubRegionsList.length > 0) {
            let searchedCountries = selectedSubRegionsList.filter(country => country.name.common.toLowerCase().includes(searchValue))
            setFilterData(searchedCountries)
            return
        } else if (selectedRegionsList.length > 0) {
            let searchedCountries = selectedRegionsList.filter(country => country.name.common.toLowerCase().includes(searchValue))
            setFilterData(searchedCountries)
            return
        }
        let searchedCountries = copyOfCountryList.filter(country => country.name.common.toLowerCase().includes(searchValue))
        setFilterData(searchedCountries)
    }


    return (

        <>
            {error.length > 0 ? <ErrorPage></ErrorPage> :
                countries.countriesList.length == 0 ? <div id="loader"></div> :
                    <>
                        <div className={`flex justify-between p-[1%]  ${isDarkMode ? 'bg-bgDark' : 'bg-bgLight'}`}>
                            <FilterInput searchByInputValue={searchByInput}></FilterInput>
                            <FilterSelection selectionOnChange={searchByRegion} sectionOptions={regionList} defaultSelectionTag={'Filter By Region'} ></FilterSelection>
                            {subRegionList.length == 0 ? <div></div> : <FilterSelection selectionOnChange={searchBySubRegion} sectionOptions={subRegionList} defaultSelectionTag={'Filter By SubRegion'} ></FilterSelection>
                            }
                            <FilterSelection selectionOnChange={sortByPopuLation} sectionOptions={sort} defaultSelectionTag={'Sort by Population'} ></FilterSelection>
                            <FilterSelection selectionOnChange={sortByArea} sectionOptions={sort} defaultSelectionTag={'Sort By Area'} ></FilterSelection>
                        </div>
                        <CountryCard countriesData={filterData} ></CountryCard>
                    </>
            }
        </>
    )
}

export default CountryBody