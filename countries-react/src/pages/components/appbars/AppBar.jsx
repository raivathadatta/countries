
import { useContext } from "react";
import StyleContext from "../../../context/style-context";
import { Link } from "react-router-dom";
import { LuMoon } from "react-icons/lu";
import { IoSunnyOutline } from "react-icons/io5";


function AppBar() {
    let { isDarkMode, updateStyle } = useContext(StyleContext)

    return (
        <header className={`flex flex-row justify-between p-[1%]  shadow-xl ${isDarkMode ? 'bg-elementDark text-textDark' : 'bg-elementLight text-textLight'}`}>
            <Link to='/'>
                <h1 className="font-bold text-[2vi] " >  Where In The World?</h1>
            </Link>
            <div className="font-bold flex items-center">{!isDarkMode ? <LuMoon /> : <IoSunnyOutline />} <button onClick={updateStyle}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button></div>
        </header>
    )
}
export default AppBar