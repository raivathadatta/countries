
import './App.css'
import StyleStateContext from './context/Style-State-Context'
import CountryBody from './pages/countriesbody'
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AppBar from "/components/appbars/AppBar";
// import AppBar from "../components/appbars/AppBar";
// import DetailCountry from "./pages/detailcountry";
import AppBar from  "../src/pages/components/appbars/AppBar";
import DetailCountry from "../src/pages/details"
function App() {

  return (
    <>
        <BrowserRouter>
      <StyleStateContext>

        <AppBar></AppBar>

          <Routes>
            <Route exact path="/" element={<CountryBody></CountryBody>}></Route>
            <Route exact path="/:id" element={<DetailCountry></DetailCountry>}></Route>
          </Routes>


      </StyleStateContext>
        </BrowserRouter>
    </>
  )
}

export default App
