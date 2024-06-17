import AppBar from "./components/appbars/AppBar";
import FilterInput from "./components/input/fFilterInput";
import FilterSelection from "./components/selection/FilterSelection";
import countriesData from "../data/countries-data";
import { useContext, useEffect, useState } from "react";
import CountryCard from "./components/card/CountryCard";
import StyleContext from "../context/style-context";


let sort = ['Ascending', 'Descending']

function CountryBody() {
    let { isDarkMode } = useContext(StyleContext)


    let [countries, setCountries] = useState({ countryiesList: [], region: {} })
    let [filterData, setFilterData] = useState([])

    ///sub regions

    let [region, setRegion] = useState([])//contains selected region name
    let regionList = Object.keys(countries.region)
    // let countriesListData = countries.countryiesList

    let [subRegionList, setSubRegionList] = useState([])//contains subregions list in the region

    ///

    useEffect(() => {
        async function getCountriesData() {
            let countries = await countriesData()
            let regionData = {}
            countries.forEach(country => {
                if (!regionData[country.region]) {
                    regionData[country.region] = new Set()
                }
                regionData[country.region].add(country.subregion)

            });
            setFilterData(countries)
            setCountries({ countryiesList: countries, region: regionData })
        }
        getCountriesData()
    }, [])
    // sectionOptions,selectionOnChange


    let searchByRegion = (event) => {

        let selectedRegion = event.target.value
        setRegion(selectedRegion)
        let copyOfCountryList = JSON.parse(JSON.stringify(countries.countryiesList))
        let regionCountries = copyOfCountryList.filter(country => country.region.toLowerCase() == selectedRegion.toLowerCase())
        let subregions = regionCountries.reduce((accmilater, curentValue) => {
            accmilater.add(curentValue.subregion)
            return accmilater
        }, new Set())
        setSubRegionList([...subregions])
        console.log(regionCountries, "................................")
        setFilterData(regionCountries)

    }

    let searchBySubRegion = (event) => {
        let selectedSubRegion = event.target.value
        let subRegionCountries = countries.countryiesList.filter(country => country.region.toLowerCase() == region.toLowerCase()).filter(country => country.subregion.toLowerCase() == selectedSubRegion.toLowerCase())
        setFilterData(subRegionCountries)

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

    console.log(filterData)

    return (
        <>

            <AppBar></AppBar>
            <div className={`flex justify-between p-[1%]  ${isDarkMode ? 'bg-bgDark' : 'bg-glare'}`}>
                <FilterInput></FilterInput>
                <FilterSelection selectionOnChange={searchByRegion} sectionOptions={regionList} defaultSelectionTage={'Filter By Region'} ></FilterSelection>
                {subRegionList.length == 0 ? <div></div> : <FilterSelection selectionOnChange={searchBySubRegion} sectionOptions={subRegionList} defaultSelectionTage={'Filter By SubRegion'} ></FilterSelection>
                }
                <FilterSelection selectionOnChange={sortByPopuLation} sectionOptions={sort} defaultSelectionTage={'Sort by Population'} ></FilterSelection>
                <FilterSelection selectionOnChange={sortByArea} sectionOptions={sort} defaultSelectionTage={'Sort By Area'} ></FilterSelection>
            </div>


            <CountryCard countriesData={filterData} ></CountryCard>


        </>


    )
}

export default CountryBody