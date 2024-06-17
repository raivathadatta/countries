import { useContext } from "react";
import StyleContext from "../../../context/style-context";

function FilterSelection({ sectionOptions, selectionOnChange, defaultSelectionTage }) {
    let { isDarkMode } = useContext(StyleContext)

    return (
        <select onChange={selectionOnChange} className={`outline-none p-[1%] ${isDarkMode ? 'bg-inputDark text-' : 'bg-bgLight '} `}>
            <option hidden>{defaultSelectionTage}</option>
            {
                sectionOptions.map((option) => <option value={option} key={option}>{option}</option>)
            }
        </select>
    )

}

export default FilterSelection