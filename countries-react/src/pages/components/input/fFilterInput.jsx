import { useContext } from "react";
import StyleContext from "../../../context/style-context";



let FilterInput = ({ searchByInputValue }) => {
    let { isDarkMode } = useContext(StyleContext)

    return (
        <input type="text" onKeyUp={searchByInputValue} className={`w-[20%] p-[1%] ${isDarkMode ? 'bg-inputDark' : 'bg-inputLight'}`} placeholder="Search for country .." />

    )
}
export default FilterInput