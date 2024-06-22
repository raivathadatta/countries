import StyleContext from "./style-context";
import { useState } from "react";

let StyleStateContext = (props) => {
  let [isDarkMode, setDark] = useState(false);

  let updateStyle = () => {
    setDark(!isDarkMode);
  };

  return (
    <StyleContext.Provider value={{ isDarkMode, updateStyle }}>
      {props.children}
    </StyleContext.Provider>
  );
};
export default StyleStateContext;
