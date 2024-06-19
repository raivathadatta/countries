

import { useContext } from "react";
import StyleContext from "../../../context/style-context";
import { Link } from "react-router-dom";
function CountryCard({ countriesData }) {

    let { isDarkMode } = useContext(StyleContext)

    return (

        <div className="flex flex-row flex-wrap justify-between p-[1%]">
            {countriesData.map((country) => (
                <div key={country.name.common} className={`w-[22%] shadow-md my-[1%] rounded-xl  ${isDarkMode ? 'bg-elementDark text-textDark' : 'bg-elementLight text-textLight'}`} >
                    <Link to={`/${country.cca3}`} >
                        <img src={country.flags.png} alt={country.name.common} className="rounded-xl h-[60%]" />
                        <div className="p-[3%]">
                            <h1 className="text-2xl font-bold my-[2%]">{country.name.common}</h1>
                            <p className="my-[1%]">
                                <b>population:</b> {country.population}
                            </p>
                            <p className="my-[1%]">
                                <b>Region:</b> {country.region}
                            </p>
                            <p className="my-[1%]">
                                <b>capital:</b> {country.capital}
                            </p>
                        </div>
                    </Link>
                </div>
            ))
            }

        </div>
    )
}

export default CountryCard