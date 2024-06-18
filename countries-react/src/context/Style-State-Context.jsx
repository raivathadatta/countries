
import StyleContext from "./style-context"
import { useState } from 'react'


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