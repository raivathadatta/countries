
import StyleContext from "./style-context"
import { useState } from 'react'


const StyleStateContext = (props) => {

    const [isDarkMode, setDark] = useState(false)


    const updateStyle = () => {
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