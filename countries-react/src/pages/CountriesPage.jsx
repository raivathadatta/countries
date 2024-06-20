import FilterInput from "./components/input/FilterInput";
import FilterSelection from "./components/selection/FilterSelection";
import countriesData from "../data/countries-data";
import { useContext, useEffect, useState } from "react";
import CountryCard from "./components/card/CountryCard";
import StyleContext from "../context/style-context";
import ErrorPage from "./ErrorPage";
function CountriesPage() {
  const sort = ["Ascending", "Decrementing"];
  const { isDarkMode } = useContext(StyleContext);

  const [countries, setCountries] = useState({ countriesList: [], region: {} });
  const [region, setRegion] = useState("");
  const [subRegion, setSubRegion] = useState();
  const [sortByArea, setSortByArea] = useState("");
  const [sortByPopuLation, setSortByPopuLation] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  const regionList = Object.keys(countries.region);

  const [error, setError] = useState(""); // if error is set to the fetch data

  useEffect(() => {
    async function getCountriesData() {
      try {
        const countries = await countriesData();
        const regionData = {};
        countries.forEach((country) => {
          if (!regionData[country.region]) {
            regionData[country.region] = new Set();
          }
          regionData[country.region].add(country.subregion);
        });

        setCountries({ countriesList: countries, region: regionData });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    }
    getCountriesData();
  }, []);

  const getSubRegions = (region) => {
    console.log(region);
    const filteredSubRegions = countries.countriesList
      .filter((country) => country.region === region)
      .map((country) => country.subregion);
    let list = new Set(filteredSubRegions);
    list = [...list];
    return list;
  };

  const searchByInput = (value) => {
    setInputValue(value);
  };
  const searchByRegion = (region) => {
    setInputValue("");
    setRegion(region);
    setSortByPopuLation("");
    setSortByArea("");
    setSubRegion("");
  };

  const searchBySubRegion = (subRegion) => {
    setInputValue("");
    setSubRegion(subRegion);
    setSortByPopuLation("");
    setSortByArea("");
  };

  const filterData = () => {
    let filterData = [...countries.countriesList];
    if (region) {
      filterData = filterData.filter((country) => country.region == region);
    }
    if (subRegion) {
      filterData = filterData.filter(
        (country) => country.subregion == subRegion
      );
    }
    if (sortByArea) {
      filterData = filterData.sort(
        (country1, country2) => country2.area - country1.area
      );
      if (sortByArea == sort[1]) {
        filterData.reverse();
      }
    }
    if (sortByPopuLation) {
      filterData = filterData.sort(
        (country1, country2) => country2.population - country1.population
      );
      if (sortByPopuLation == sort[1]) {
        filterData.reverse();
      }
    }
    if (inputValue) {
      filterData = filterData.filter((country) =>
        country.name.common.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
    return filterData;
  };

  const sortFilterDataBasedOnPopulation = (sortByArea) => {
    setSortByPopuLation(sortByArea);
    setSortByArea("");
    setInputValue("");
  };

  const sortFilterDataBasedOnArea = (area) => {
    setInputValue("");
    setSortByArea(area);
    setSortByPopuLation("");
  };

  const filteredData = filterData();

  const regionData = getSubRegions(region);

  if (loading) {
    return <div id="loader"></div>;
  }

  if (error) {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <>
      {
        <>
          <div
            className={`flex justify-between p-[1%]  ${
              isDarkMode ? "bg-bgDark" : "bg-bgLight"
            } `}
          >
            <FilterInput
              inputValue={inputValue}
              searchByInputValue={searchByInput}
            ></FilterInput>
            <FilterSelection
              selectionOnChange={searchByRegion}
              sectionOptions={regionList}
              defaultSelectionTag={"Filter By Region"}
            ></FilterSelection>
            {regionData.length == 0 ? (
              <div></div>
            ) : (
              <FilterSelection
                selectionOnChange={searchBySubRegion}
                sectionOptions={regionData}
                defaultSelectionTag={"Filter By SubRegion"}
              ></FilterSelection>
            )}
            <FilterSelection
              selectedValue={sortByPopuLation}
              selectionOnChange={sortFilterDataBasedOnPopulation}
              sectionOptions={sort}
              defaultSelectionTag={"Sort By Population"}
            ></FilterSelection>
            <FilterSelection
              selectedValue={sortByArea}
              selectionOnChange={sortFilterDataBasedOnArea}
              sectionOptions={sort}
              defaultSelectionTag={"Sort By Area"}
            ></FilterSelection>
          </div>
          <div
            className={`min-h-[90vh] ${
              isDarkMode ? "bg-bgDark" : "bg-bgLight"
            } `}
          >
            {filteredData.length == 0 ? (
              <h1 className="text-[30px] ml-[2%]">
                {" "}
                No Country Found ................
              </h1>
            ) : (
              <CountryCard countriesData={filteredData}></CountryCard>
            )}
          </div>
        </>
      }
    </>
  );
}

export default CountriesPage;
