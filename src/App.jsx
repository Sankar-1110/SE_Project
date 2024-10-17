
import './App.css'
import Apifile from './components/Apifile'
import Registartion from './components/registration.jsx'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
     
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'element={<Apifile/>}/>
      <Route path='/register'element={ <Registartion/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
