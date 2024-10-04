import React from 'react'
import Home from './pages/Home'
import { Route,Routes } from 'react-router-dom'
import Header from './components/Header'
import Filiing from './pages/Sections/Filiing'
import Dispatch from './pages/Sections/Dispatch'
import Kitchen from './pages/Sections/Kitchen'
import Login from './pages/User/Login'
import SignUp from './pages/User/SignUp'
import DataLog from './components/DataLog'
import Date from './pages/Date'
import AdminRoute from './components/AdminRoute'
import UsersList from './pages/Admin/UsersList'
import OtpLogin from './pages/User/OtpLogin'
import Profile from './pages/User/Profile'
import AllDataKitchen from './pages/Today/AllDataKitchen'
import AllDataDispatch from './pages/Today/AllDataDispatch'
import AllDataFilling from './pages/Today/AllDataFilling'
import UpdateProfile from './pages/User/UpdateProfile'
import Buyer from './pages/Admin/Buyer'
import BuyerProducts from './pages/Admin/BuyerProducts'
import Monthly from './pages/Admin/Monthly'
import Product from './pages/Admin/Product'
import DvN from './pages/Admin/DvN'
import ProductionGoal from './pages/Admin/ProductionGoal'
import Production from './pages/Admin/Production'
import KvF from './pages/Admin/KvF'
import Inventory from './pages/Admin/Inventory'
import ProductData from './pages/Admin/ProductData'
import Report from './pages/Admin/Report'

const App = () => {
  
  return (
<div>

<Header/>

<Routes>

  <Route path='/' element={<Home/>}/>


  <Route path="/admin" element={<AdminRoute/>}>
     <Route path='Inventory/Report' element={<Report/>} />
     <Route path='Profile/:id' element={<Profile/>} />
     <Route path='ProductData' element={<ProductData/>} />
     <Route path='Inventory' element={<Inventory/>} />
     <Route path='updateProfile/:id' element={<UpdateProfile/>} />
     <Route path='Monthly-Data' element={<Monthly/>} />
     <Route path='Production-Goal' element={<ProductionGoal/>} />
     <Route path='Production' element={<Production/>} />
     <Route path='Create-Data-Kitchen' element={<AllDataKitchen/>} />
     <Route path='Create-Data-Dispatch' element={<AllDataDispatch/>} />
     <Route path='Create-Data-Filling' element={<AllDataFilling/>} />
     <Route path='UserList' element={<UsersList/>}></Route>
     <Route path='Kitchen/:month' element={<Kitchen/>} />
     <Route path='Filling/:month' element={<Filiing/>} />
     <Route path='Dispatch/:month' element={<Dispatch/>} />
     <Route path='Date' element={<Date/>} />
     <Route path=':section/:month' element={<DataLog/>} />
     <Route path='BuyerList' element={<Buyer/>}></Route>
     <Route path='ProductList' element={<Product/>}></Route>
     <Route path='Product-Data' element={<BuyerProducts/>}></Route>
     <Route path='Day-Night' element={<DvN/>}></Route>
     <Route path='Daily-List' element={<KvF/>}></Route>
  </Route>

  <Route path='Login' element={<Login/>} />
  <Route path='SignUp' element={<SignUp/>}/>
  <Route path='OtpLogin' element={<OtpLogin/>}/>

</Routes>

</div>

  )
}

export default App

