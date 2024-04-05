import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import { MdLightMode,MdModeNight } from "react-icons/md";
import { useSelector } from 'react-redux';
import ProfileMenu from './ProfileMenu';

const Header = () => {

  const [mode, setMode] = useState(1);

  const {userinfo} = useSelector(state=>state.auth);

  return (
      <div className='w-full h-14 bg-gradient-to-r from-[#1e1b4b] to-[#2e1065] flex items-center justify-between'>
       
       <Link to="/" className='flex items-center gap-4 text-2xl font-bold mx-24'>
        Aliments Global Foods
       </Link>
       
  
        <div className='flex text-xl gap-16 items-center font-bold mx-8'>

        <div>
    {
      mode ? (
        <MdLightMode color='white' onClick={()=>setMode(!mode)} size={32}/>
      ) : (
        <MdModeNight onClick={()=>setMode(!mode)} size={32}/>
      )
    }
        </div>

        <div>
          {
            userinfo ? (
              <ProfileMenu/>
            ) : (
              <div className='flex gap-6 items-center'>
              <Link to="/Login" className='hover:translate-y-1 h-10 w-24 flex items-center justify-center bg-[#1e1b4b] rounded-md'>
                Login
            </Link>
            <Link to="/SignUp" className='hover:translate-y-1 h-10 w-24 flex items-center justify-center  bg-[#1e1b4b] rounded-md'>
                SignUp
            </Link>
              </div>
            )
          }
        </div>
           
        </div>
      </div>
  )
}

export default Header
