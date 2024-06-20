
import FilterInput from "./components/input/FilterInput";
import FilterSelection from "./components/selection/FilterSelection";
import countriesData from "../data/countries-data";
import { useContext, useEffect, useState } from "react";
import CountryCard from "./components/card/CountryCard";
import StyleContext from "../context/style-context";
import ErrorPage from "./ErrorPage";



const sort = ['Ascending', 'Descending']
let sortSelectedByPopulation = "";
let sortSelectedByArea=""


function CountryBody() {
    const { isDarkMode } = useContext(StyleContext)


    const [countries, setCountries] = useState({ countriesList: [], region: {} })
    const [filterData, setFilterData] = useState([])

    ///sub regions
    const regionList = Object.keys(countries.region)

    const [regionData, setRegionData] = useState({ region: '', subRegionList: [] })///contains data for regions REGION NAME AND SUB REGION DATA 

    const [subRegion, setSubRegion] = useState('')//contains selected subregion name

    const [error, setError] = useState('')// if error is set to the fetch data 

    useEffect(() => {
        async function getCountriesData() {
            try {
                const countries = await countriesData()
                const regionData = {}
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





    const searchByRegion = (event) => {
        sortSelectedByArea = "";
        sortSelectedByPopulation = "";
        const selectedRegion = event.target.value

        const regionCountries = countries.countriesList.filter(country => country.region.toLowerCase() == selectedRegion.toLowerCase())
        const subregions = regionCountries.reduce((acuminates, currentValue) => {
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

    const searchBySubRegion = (event) => {
        sortSelectedByArea = "";
        sortSelectedByPopulation = "";
        const selectedSubRegion = event.target.value
        const subRegionCountries = countries.countriesList.filter(country => country.region.toLowerCase() == regionData.region.toLowerCase()).filter(country => country.subregion.toLowerCase() == selectedSubRegion.toLowerCase())
        setFilterData(subRegionCountries)
        setSubRegion(selectedSubRegion)
    }
    const sortByPopuLation = (event) => {
    
        sortSelectedByPopulation = event.target.value;
        const copyOfFilterData = JSON.parse(JSON.stringify(filterData))
        const sortedCountries = copyOfFilterData.sort((country1, country2) => country1.population - country2.population)

        if (event.target.value == sort[1]) {
            sortedCountries.reverse();
        }
        setFilterData(sortedCountries)
    }

    const sortByArea = (event) => {
        sortSelectedByArea = event.target.value;
        const copyOfFilterData = JSON.parse(JSON.stringify(filterData))
        const sortedCountries = copyOfFilterData.sort((country1, country2) => country1.area - country2.area)

        if (event.target.value == sort[1]) {
            sortedCountries.reverse();
        }
        setFilterData(sortedCountries)
    }

    const searchByInput = (event) => {
    
        const subregion = subRegion
        const searchValue = event.target.value.toLowerCase()
        const selectedRegion = regionData.region
        const selectedRegionsList = countries.countriesList.filter(country => country.region === selectedRegion)
        const selectedSubRegionsList = selectedRegionsList.filter(country => country.subregion === subregion)

        if (selectedSubRegionsList.length > 0) {
            const searchedCountries = selectedSubRegionsList.filter(country => country.name.common.toLowerCase().includes(searchValue))
            setFilterData(searchedCountries)
            return
        } else if (selectedRegionsList.length > 0) {
            const searchedCountries = selectedRegionsList.filter(country => country.name.common.toLowerCase().includes(searchValue))
            setFilterData(searchedCountries)
            return
        }
        const searchedCountries = countries.countriesList.filter(country => country.name.common.toLowerCase().includes(searchValue))
        setFilterData(searchedCountries)
    }



    return (

        <>
            {error.length > 0 ? <ErrorPage></ErrorPage> :
                countries.countriesList.length == 0 ? <div id="loader"></div> :
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
                                filterData.length == 0 ? <h1 className="text-[30px] ml-[2%]"> No Country Found ................</h1> :
                                    <CountryCard countriesData={filterData} ></CountryCard>
                            }
                        </div>
                    </>
            }
        </>
    )
}

export default CountryBody