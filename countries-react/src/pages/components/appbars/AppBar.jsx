
import { useContext } from "react";
import StyleContext from "../../../context/style-context";
import { MdOutlineDarkMode } from "react-icons/md";

function AppBar() {
    let { isDarkMode, updateStyle } = useContext(StyleContext)

    return (
        <header className={`flex flex-row justify-between p-[1%]  shadow-lg ${isDarkMode ? 'bg-elementDark text-textDark' : 'bg-elementLight text-textLight'}`}>
            <h1 className="font-bold text-[2vi] " >  Where In The World?</h1>
            <div className="font-bold flex justify-between "> {MdOutlineDarkMode} <button onClick={updateStyle}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button></div>
        </header>
    )
}
export default AppBar