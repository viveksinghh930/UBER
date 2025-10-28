import Reac from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import Captainlogin from './pages/Captainlogin'
import CaptainSignup from './pages/CaptainSignup'

const App = () => {

  
  return (
    <div>
      
      <Routes>
      <Route path='/' element={<Home/>}> </Route>
      <Route path='/login' element={<UserLogin/>}> </Route>
      <Route path='/signup' element={<UserSignup/>}> </Route>
      <Route path='/captain-login' element={<Captainlogin/>}> </Route>
      <Route path='/captain-signup' element={<CaptainSignup/>}> </Route>



      </Routes>
    </div>
  )
}

export default App