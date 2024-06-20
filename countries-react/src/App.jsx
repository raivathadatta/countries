import "./App.css";
import StyleStateContext from "./context/Style-State-Context";
import CountryBody from "./pages/CountriesBody";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppBar from "../src/pages/components/appbars/AppBar";
import DetailCountry from "../src/pages/Details";
import ErrorPage from "./pages/ErrorPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <StyleStateContext>
          <AppBar></AppBar>

          <Routes>
            <Route exact path="/" element={<CountryBody></CountryBody>}></Route>
            <Route
              exact
              path="/:id"
              element={<DetailCountry></DetailCountry>}
            ></Route>
            <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
          </Routes>
        </StyleStateContext>
      </BrowserRouter>
    </>
  );
}

export default App;
