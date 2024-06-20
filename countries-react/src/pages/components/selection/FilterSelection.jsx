import { useContext } from "react";
import StyleContext from "../../../context/style-context";

function FilterSelection({ selectedValue, sectionOptions, selectionOnChange, defaultSelectionTag }) {
    const { isDarkMode } = useContext(StyleContext)
    const onChangeCallBack = (event) => {
        selectionOnChange(event.target.value)
    }
    console.log(sectionOptions)

    return (
        <select value={selectedValue} onChange={onChangeCallBack} className={`outline-none p-[1%] shadow-lg ${isDarkMode ? 'bg-inputDark ' : 'bg-elementLight '} `}>
            <option value="" hidden>{defaultSelectionTag}</option>
            {
                sectionOptions.map((option) => <option value={option} key={option}>{option}</option>)
            }
        </select>
    )

}

export default FilterSelection