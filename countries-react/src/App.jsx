
import './App.css'
import StyleStateContext from './context/Style-State-Context'
import CountryBody from './pages/countriesbody'
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AppBar from "/components/appbars/AppBar";
// import AppBar from "../components/appbars/AppBar";
// import DetailCountry from "./pages/detailcountry";
import AppBar from "../src/pages/components/appbars/AppBar";
import DetailCountry from "../src/pages/details"
import ErrorPage from './pages/errorPage';
import { DataProvider } from './context/data-context/data-context';
function App() {

  return (
    <>
      <BrowserRouter>
        <StyleStateContext>
          <DataProvider>
            <AppBar></AppBar>

            <Routes>
              <Route exact path="/" element={<CountryBody></CountryBody>}></Route>
              <Route exact path="/:id" element={<DetailCountry></DetailCountry>}></Route>
              <Route path='*' element={<ErrorPage></ErrorPage>}></Route>
            </Routes>

          </DataProvider>
        </StyleStateContext>
      </BrowserRouter>
    </>
  )
}

export default App
