
import './App.css'
import StyleStateContext from './context/StyleStateContext'
import CountryBody from './pages/CountriesBody'
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppBar from "./pages/components/appbars/App-Bar";
import DetailCountry from "../src/pages/Details"
import ErrorPage from './pages/ErrorPage';
import { DataProvider } from './context/data-context/DataContext';
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
