import React from 'react'
import { Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import ProfileMenu from './ProfileMenu';
import { AiOutlineHome} from "react-icons/ai";

const Header = () => {

  const date = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const {userinfo} = useSelector(state=>state.auth);

  return ( 
      <div className='w-full h-14 text-[#f59e0b] bg-black flex items-center justify-between '>

       <Link to="/" className='flex items-center w-[30rem] text-2xl font-bold mx-10 sm:max-lg:text-lg sm:max-lg:mx-14'>
        Aliments Global Private Limited
       </Link>
      
  
        <div className='flex text-xl gap-16 items-center font-bold mx-8 sm:max-lg:gap-8'>

        <Link to="/">
          <AiOutlineHome  size={32} />
        </Link>
        
      <div className='flex gap-6 items-center'>
      
        <img src={userinfo?.image} alt='Profile' className='h-12 w-12 border-2 rounded-full object-cover'/>
        <div>{userinfo?.fname}</div>
        
      </div>

      <div className='sm:max-lg:text-sm sm:max-lg:w-32'>
      {date}
      </div>

       

        <div>
          {
            userinfo ? (
              <ProfileMenu/>
            ) : (
              <div className='flex gap-6 items-center'>
              <Link to="/Login" className='hover:translate-y-1 h-10 w-24 flex items-center justify-center text-[#f59e0b] rounded-lg bg-black border-2 hover:scale-105 border-[#f59e0b] text-center cursor-auto hover:bg-[#f59e0b] hover:text-black'>
                Login
            </Link>
            <Link to="/SignUp" className='hover:translate-y-1 h-10 w-24 flex items-center justify-center  text-[#f59e0b] rounded-lg bg-black border-2 hover:scale-105 border-[#f59e0b] text-center cursor-auto hover:bg-[#f59e0b] hover:text-black'>
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
