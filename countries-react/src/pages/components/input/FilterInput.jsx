import { useContext } from "react";
import StyleContext from "../../../context/style-context";



let FilterInput = ({ searchByInputValue }) => {
    let { isDarkMode } = useContext(StyleContext)

    return (
        <input type="text" onKeyUp={searchByInputValue} className={`w-[30%] p-[1%] shadow-lg ${isDarkMode ? 'bg-inputDark ' : 'bg-elementLight '}`} placeholder="Search for country .." />

    )
}
export default FilterInput