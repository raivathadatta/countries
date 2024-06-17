let countriesData=async  ()=>{
    let result = await fetch("https://restcountries.com/v3.1/all")
    return await result.json()
}

export default countriesData