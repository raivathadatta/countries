import { useContext } from "react";
import StyleContext from "../../../context/style-context";

function FilterSelection({ sectionOptions, selectionOnChange, defaultSelectionTag }) {
    let { isDarkMode } = useContext(StyleContext)

    return (
        <select onChange={selectionOnChange} className={`outline-none p-[1%] shadow-lg ${isDarkMode ? 'bg-inputDark ' : 'bg-elementLight '} `}>
            <option hidden>{defaultSelectionTag}</option>
            {
                sectionOptions.map((option) => <option value={option} key={option}>{option}</option>)
            }
        </select>
    )

}

export default FilterSelection