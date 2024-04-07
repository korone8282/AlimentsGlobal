import React from 'react'
import Home from './pages/Home'
import { Route,Routes } from 'react-router-dom'
import Header from './components/Header'
import Retort from './pages/Sections/Retort'
import Filiing from './pages/Sections/Filiing'
import Dispatch from './pages/Sections/Dispatch'
import Kitchen from './pages/Sections/Kitchen'
import Login from './pages/User/Login'
import SignUp from './pages/User/SignUp'
import DataLog from './components/DataLog'
import Date from './pages/Date'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import BuyerList from './pages/Admin/BuyerList'
import UsersList from './pages/Admin/UsersList'
import Dashboard from './pages/Admin/Dashboard'
import OtpLogin from './pages/User/OtpLogin'
import Profile from './pages/User/Profile'
import ProductionPlan from './pages/Today/ProductionPlan'
import AllDataKitchen from './pages/Today/AllDataKitchen'
import AllDataDispatch from './pages/Today/AllDataDispatch'
import AllDataFilling from './pages/Today/AllDataFilling'
import AllDataRetort from './pages/Today/AllDataRetort'
import Navbar from './components/Navbar'
import UpdateProfile from "./pages/User/UpdateProfile";

const App = () => {
  
  return (
<div className='bg-gradient-to-r from-[#3730a3] to-[#1e1b4b] text-white h-[100vh]'>

<Header/>
<Navbar/>

<Routes>

  <Route path='/' element={<Home/>}/>

  <Route path="/user" element={<PrivateRoute/>}>
     <Route path='Retort/:month' element={<Retort/>} />
     <Route path='Kitchen/:month' element={<Kitchen/>} />
     <Route path='Filling/:month' element={<Filiing/>} />
     <Route path='Dispatch/:month' element={<Dispatch/>} />
     <Route path='Production-Plan' element={<ProductionPlan/>} />
     <Route path='Create-Data-Kitchen' element={<AllDataKitchen/>} />
     <Route path='Create-Data-Dispatch' element={<AllDataDispatch/>} />
     <Route path='Create-Data-Filling' element={<AllDataFilling/>} />
     <Route path='Create-Data-Retort' element={<AllDataRetort/>} />
     <Route path='Date' element={<Date/>} />
     <Route path=':section/:month' element={<DataLog/>} />
     <Route path='Profile/:id' element={<Profile/>} />
     <Route path='updateProfile/:id' element={<UpdateProfile/>} />
  </Route>

  <Route path="/admin" element={<AdminRoute/>}>
      <Route path='Dashboard' element={<Dashboard/>}></Route>
      <Route path='UserList' element={<UsersList/>}></Route>
      <Route path='BuyerList' element={<BuyerList/>}></Route>
  </Route>

  <Route path='Login' element={<Login/>} />
  <Route path='SignUp' element={<SignUp/>}/>
  <Route path='OtpLogin' element={<OtpLogin/>}/>

</Routes>

</div>

  )
}

export default App
