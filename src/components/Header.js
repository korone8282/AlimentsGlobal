import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import { MdLightMode,MdModeNight } from "react-icons/md";
import { useSelector } from 'react-redux';
import ProfileMenu from './ProfileMenu';

const Header = () => {

  const [mode, setMode] = useState(1);

  const date = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const {userinfo} = useSelector(state=>state.auth);

  return ( 
      <div className='w-full h-14 text-[#f59e0b] bg-black flex items-center justify-between '>
       
       <Link to="/" className='flex items-center w-[30rem] text-2xl font-bold mx-8'>
        Aliments Global Foods
       </Link>
      
  
        <div className='flex text-xl gap-16 items-center font-bold mx-8'>
      <div className='flex gap-6 items-center'>
      
        <img src={userinfo?.image} alt='Profile' className='h-12 w-12 border-2 rounded-full object-cover'/>
        <div>{userinfo?.fname}</div>
        
      </div>

      <div>
      {date}
      </div>

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
