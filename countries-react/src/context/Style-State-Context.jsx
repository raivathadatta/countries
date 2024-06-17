
import StyleContext from "./style-context"
import { useState } from 'react'


// let lightModeStyle = {
//     bodyStyle: 'bg-white text-black',
//     headerBackgroundStyle: 'flex flex-row justify-between p-[1%] bg-[#FFFFFF]',
//     headerStyle: "flex flex-row justify-between shadow-md p-[1%] bg-[#FFFFFF]",
//     filterStyle: "bg-gray-100 text-blackshadow-md outline-none p-[1%] ",
//     countryCardStyle: 'w-[22%] m-4 shadow-md rounded-xl bg-white ',
//     CountrySectionStyle: "flex flex-wrap justify-between bg-white text-black"
// }

// let darkModeStyle = {
//     bodyStyle: 'bg-black',
//     headerBackgroundStyle: 'flex flex-row justify-between p-[1%] bg-black',
//     headerStyle: "flex flex-row justify-between shadow-md p-[1%] bg-black text-white",
//     countryCardStyle: 'w-[22%] m-4 box-shadow-white shadow-md rounded-xl bg-gray-400 ',
//     filterStyle: "bg-gray-300 text-black boder-white p-[1%] ",
//     CountrySectionStyle: "flex flex-wrap justify-between bg-black text-black"
// }

let StyleStateContext = (props) => {

    let [isDarkMode, setDark] = useState(false)


    let updateStyle = () => {
        console.log("isDArkMode", isDarkMode)
        setDark(!isDarkMode)
    }


    return (
        <StyleContext.Provider value={{ isDarkMode, updateStyle }}>

            {props.children}

        </StyleContext.Provider>
    )
}
export default StyleStateContext