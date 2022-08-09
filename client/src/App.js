import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Components/login/lognin'
import Secret from './Components/userHome/home'
import Signup from './Components/signup/signup'
import AdmLogin from './Components/admLogin/admLogin'
import "react-toastify/dist/ReactToastify.css"
import AdmHome from './Components/adminHome/admHome'
import AdmTrack from './Components/adminHome/adminTrack'

import './App.css';
import  RegisterForm  from './Components/Forms/CompanyRegistration'
import BookingSlots from './Components/adminHome/BookingSlots'

function App() {
  return (
    <BrowserRouter>
    
    <Routes>
      <Route exact path='/signup' element={<Signup />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/' element={<Secret />} />
      <Route exact path='/admin' element={<AdmLogin />} />
      <Route exact path='/AdminHome' element={<AdmHome />} />
      <Route exact path='/gotoForm' element={<RegisterForm />} /> 
      <Route exact path='/adminTrack' element={<AdmTrack />} /> 
      <Route exact path='/admSlots' element={<BookingSlots />} /> 

    </Routes>
    
    </BrowserRouter>
  )
}

export default App