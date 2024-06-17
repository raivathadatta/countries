
import './App.css'
import StyleStateContext from './context/Style-State-Context'
import CountryBody from './pages/countriesbody'


function App() {

  return (
    <>
     <StyleStateContext>
      <CountryBody/>
     </StyleStateContext>
    </>
  )
}

export default App
