import { useEffect, useState } from "react"
import countriesData from "../data/countries-data"
import { Link, useParams } from "react-router-dom"
import { useContext } from "react";
import StyleContext from "../context/style-context";
import ErrorPage from "./errorPage";




console.log(countriesData())
function DetailCountry() {
    let { id } = useParams()
    let [data, setCountry] = useState([])
    let [loading, setLoading] = useState([true])
    let [error, setError] = useState('')
    let { isDarkMode } = useContext(StyleContext)
    console.log(id,)

    useEffect(() => {

        async function getCountriesData() {
            try {
                let countries = await countriesData()
                countries = countries.filter(country => country.cca3 === id)
                if(countries.length==0) {
                    setError('Country Not Found')
                    return
                }
                setCountry(countries)
                setLoading(false)
            } catch (error) {
                console.log(error.message)
                setError(error.message)
            }

        }
        getCountriesData()
    }, [id])

    return (
        <div className={`${isDarkMode ? 'bg-elementDark text-bgLight' : 'bg-secondary'}  pb-[5%]`}>
            {console.log(data)}
            {error.length > 0 ?
                <ErrorPage></ErrorPage> :
                loading ? (<div id='loader' ></div >) : (
                    <>
                        <div className="pt-7 pl-5"  >
                            <button
                                className="border-2 border-black  p-3 flex align-center"
                                onClick={() => window.history.back()}>
                                &#8592;
                                Go Back
                            </button>
                        </div>



                        <div key={data[0]?.name.common} className="flex m-5 ">
                            <img
                                className="w-[45%] h-[70vh]"
                                src={`${data[0]?.flags.png}`}
                                alt={`${data[0]?.name.common}`} />

                            <div className="w-[50%] px-10">
                                <h2 className="text-4xl font-bold p-2">{data[0]?.name.common}</h2>
                                <p className="p-2">
                                    <b>Capital:</b> {data[0]?.capital}
                                </p>
                                <p className="p-2">
                                    <b>Region:</b> {data[0]?.region}
                                </p>
                                <p className="p-2">
                                    <b>Subregion:</b> {data[0]?.subregion}
                                </p>
                                <p className="p-2">
                                    <b>Population:</b> {data[0]?.population}
                                </p>
                                <p className="p-2">
                                    <b>Top Level Domain:</b> {data[0]?.tld[0]}
                                </p>
                                <p className="p-2">
                                    <b>Currencies : </b>
                                    {Object.keys(data[0]?.currencies)}
                                </p>
                                <p className="p-2">
                                    <b>Languages : </b>
                                    {Object.keys(data[0]?.languages).join(", ")}
                                </p>
                                <ul className="flex">
                                    <b>Border : </b>
                                    {data[0].borders
                                        ? data[0].borders.map((name) => {
                                            return (
                                                <>
                                                    <Link to={`/${name}`}>
                                                        <button key={name} className="border-2 border-black m-5">  {name}</button>
                                                    </Link>
                                                </>


                                            );
                                        })
                                        : " No borders"}
                                </ul>
                            </div>
                        </div ></>

                )
            }


        </div>

    )
}

export default DetailCountry