import { useContext } from "react";
import StyleContext from "../../../context/style-context";



let FilterInput = ({ searchByInputValue,inputValue}) => {
    let { isDarkMode } = useContext(StyleContext)
    const searchInput = (event) => {
        console.log("searchInput")
        searchByInputValue(event.target.value)
    }

    return (
        <input type="text" value={inputValue} onChange={searchInput} className={`w-[30%] p-[1%] shadow-lg ${isDarkMode ? 'bg-inputDark ' : 'bg-elementLight '}`} placeholder="Search for country .." />

    )
}
export default FilterInput