
import FilterInput from "./components/input/FilterInput";
import FilterSelection from "./components/selection/FilterSelection";
// import countriesData from "../data/countries-data";
import { useContext, useEffect, useState } from "react";
import CountryCard from "./components/card/CountryCard";
import StyleContext from "../context/style-context";
import ErrorPage from "./errorPage";

import { DataContext } from "../context/data-context/data-context";



let sort = ['Ascending', 'Descending']
let sortSelectedByPopulation = "";
let sortSelectedByArea = ""


function CountryBody() {
    let { countries, loading, error } = useContext(DataContext);


    let { isDarkMode } = useContext(StyleContext)

    console.log(countries)

    let [filterData, setFilterData] = useState([])
    useEffect(() => {
        let copyOfCountryList = JSON.parse(JSON.stringify(countries))
        setFilterData(copyOfCountryList.countriesList)
    }, [countries])


    console.log(filterData)

    ///sub regions
    let regionList = Object.keys(countries.region)

    let [regionData, setRegionData] = useState({ region: '', subRegionList: [] })///contains data for regions REGION NAME AND SUB REGION DATA 

    let [subRegion, setSubRegion] = useState('')//contains selected subregion name
    if (loading) { return <div id="loader"></div> }
    if (error) return <ErrorPage></ErrorPage>;






    let searchByRegion = (event) => {

        sortSelectedByArea = "";
        sortSelectedByPopulation = "";
        let selectedRegion = event.target.value

        let copyOfCountryList = JSON.parse(JSON.stringify(countries.countriesList))
        let regionCountries = copyOfCountryList.filter(country => country.region.toLowerCase() == selectedRegion.toLowerCase())
        let subregions = regionCountries.reduce((acuminates, currentValue) => {
            acuminates.add(currentValue.subregion)
            return acuminates
        }, new Set())

        setRegionData({
            ...regionData,
            region: selectedRegion,
            subRegionList: [...subregions]
        })

        setFilterData(regionCountries)
        setSubRegion('')// to set the name for filtering data to not to filter 
    }

    let searchBySubRegion = (event) => {
        sortSelectedByArea = "";
        sortSelectedByPopulation = "";
        let selectedSubRegion = event.target.value
        let subRegionCountries = countries.countriesList.filter(country => country.region.toLowerCase() == regionData.region.toLowerCase()).filter(country => country.subregion.toLowerCase() == selectedSubRegion.toLowerCase())
        setFilterData(subRegionCountries)
        setSubRegion(selectedSubRegion)
    }
    let sortByPopuLation = (event) => {

        sortSelectedByPopulation = event.target.value;
        let copyOfFilterData = JSON.parse(JSON.stringify(filterData))
        let sortedCountries = copyOfFilterData.sort((country1, country2) => country1.population - country2.population)

        if (event.target.value == sort[1]) {
            sortedCountries.reverse();
        }
        setFilterData(sortedCountries)
    }

    let sortByArea = (event) => {
        sortSelectedByArea = event.target.value;
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
        let selectedRegion = regionData.region
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
            {

                <>
                    <div className={`flex justify-between p-[1%]  ${isDarkMode ? 'bg-bgDark' : 'bg-bgLight'} `}>
                        <FilterInput searchByInputValue={searchByInput}></FilterInput>
                        <FilterSelection selectionOnChange={searchByRegion} sectionOptions={regionList} defaultSelectionTag={'Filter By Region'} ></FilterSelection>
                        {regionData.subRegionList.length == 0 ? <div></div> : <FilterSelection selectionOnChange={searchBySubRegion} sectionOptions={regionData.subRegionList} defaultSelectionTag={'Filter By SubRegion'} ></FilterSelection>
                        }
                        <FilterSelection defaultValue={sortSelectedByPopulation} selectionOnChange={sortByPopuLation} sectionOptions={sort} defaultSelectionTag={'Sort By Population'} ></FilterSelection>
                        <FilterSelection defaultValue={sortSelectedByArea} selectionOnChange={sortByArea} sectionOptions={sort} defaultSelectionTag={'Sort By Area'} ></FilterSelection>
                    </div>
                    <div className={`min-h-[90vh] ${isDarkMode ? 'bg-bgDark' : 'bg-bgLight'} `}>
                        {
                              <CountryCard countriesData={filterData} ></CountryCard>
                        }
                    </div>
                </>
            }
        </>
    )
}

export default CountryBody