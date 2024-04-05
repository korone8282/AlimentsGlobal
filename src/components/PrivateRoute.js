import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {

    const {userinfo} = useSelector(state=>state.auth);
    
  return userinfo ? <Outlet/> : <Navigate to='/login' replace/>
}

export default PrivateRoute