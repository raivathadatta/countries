import "./App.css";
import StyleStateContext from "./context/Style-State-Context";
import CountriesPage from "./pages/CountriesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppBar from "./pages/components/appbar/AppBar";
import DetailsPage from "./pages/DetailsPage";
import ErrorPage from "./pages/ErrorPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <StyleStateContext>
          <AppBar></AppBar>

          <Routes>
            <Route exact path="/" element={<CountriesPage></CountriesPage>}></Route>
            <Route
              exact
              path="/:id"
              element={<DetailsPage></DetailsPage>}
            ></Route>
            <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
          </Routes>
        </StyleStateContext>
      </BrowserRouter>
    </>
  );
}

export default App;
