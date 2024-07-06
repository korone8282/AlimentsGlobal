import React,  { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TbToolsKitchen, TbWashMachine } from "react-icons/tb";
import { FaBox } from "react-icons/fa";
import { MdFormatColorFill } from "react-icons/md";
import { useDispatch } from 'react-redux'
import { setSection } from '../redux/Slices/dateSlice'
import "./Home.css";

const Home = () => {

  const {userinfo} = useSelector(state => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
   
    if(!userinfo){
      navigate("/Login")
    }
  }, [userinfo,navigate]);
 

  return (
    <div className='bg-gradient-to-r from-fuchsia-500 to-cyan-500 h-screen'>
  
  <div className='flex  gap-10 justify-center py-20 sm:max-lg:gap-2 sm:max-lg:mx-2 sm:max-lg:py-2'>
  <div className=' max-w-sm
    rounded-2xl
    text-white/35
    backdrop-blur-lg
    [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] h-[35rem] w-[25rem] text-center text-5xl font-bold
    sm:max-lg:w-72 sm:max-lg:text-3xl sm:max-lg:h-[20rem]'
    id="navigation-container">
      
      <div className='item p-12 pt-56 sm:max-lg:pt-32'>View Data</div>

      <div className='nav-item-name flex flex-col gap-6 mt-7 sm:max-lg:my-8 text-4xl sm:max-lg:text-2xl'>

<div onClick={()=>{
      dispatch(setSection("Retort"));
      navigate(`admin/Date`)
    }}  className='h-20 sm:max-lg:h-10 flex items-center justify-around bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:text-black w-[90%] rounded-lg mx-auto cursor-pointer'> 
 Retort 
 <TbWashMachine className=" mt-2 sm:max-lg:mt-1 sm:max-lg:h-8" size={50} color='black' />
</div>

<div onClick={()=>{
      dispatch(setSection("Filling"));
      navigate(`admin/Date`)
    }} className='h-20 sm:max-lg:h-10 flex items-center justify-around bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:text-black w-[90%] rounded-lg mx-auto cursor-pointer'> 
 Filling 
 <MdFormatColorFill className=" mt-2 sm:max-lg:mt-1 sm:max-lg:h-8" size={50} color='black' />
</div>

<div onClick={()=>{
      dispatch(setSection("Kitchen"));
      navigate(`admin/Date`)
    }} className='h-20 sm:max-lg:h-10 flex items-center justify-around bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:text-black w-[90%] rounded-lg mx-auto cursor-pointer'> 
 Kitchen 
 <TbToolsKitchen className=" mt-2 sm:max-lg:mt-1 sm:max-lg:h-7" size={50} color='black' />
</div>

<div onClick={()=>{
      dispatch(setSection("Dispatch"));
      navigate(`admin/Date`)
    }} className='h-20 sm:max-lg:h-10 flex items-center justify-around bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:text-black w-[90%] rounded-lg mx-auto cursor-pointer'> 
 Dispatch 
 <FaBox className=" mt-2 sm:max-lg:mt-1 sm:max-lg:h-6" size={36} color='black' />
</div>

</div>
      
    </div>

    
    <div className=' max-w-sm
    rounded-2xl
    text-white/35
    backdrop-blur-lg
    [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] h-[35rem] w-[25rem] text-center text-5xl font-bold
    sm:max-lg:w-72 sm:max-lg:text-3xl sm:max-lg:h-[20rem]'
    id="navigation-container">
      
        <div className='item p-12 pt-56 sm:max-lg:pt-28'>View Analytics</div>

        <div className='nav-item-name flex flex-col gap-6 mt-7 sm:max-lg:my-8 text-4xl sm:max-lg:text-2xl'>

<Link to="/admin/Monthly-Data" className='h-20 sm:max-lg:h-10 flex items-center justify-around bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:text-black w-[90%] rounded-lg mx-auto'> 
 Monthly Data 
</Link>

<Link to="/admin/Product-Data" className='h-20 sm:max-lg:h-10 flex items-center justify-around bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:text-black w-[90%] rounded-lg mx-auto'> 
 Product Data
</Link>

<Link to="/admin/Day-Night" className='h-20 sm:max-lg:h-10 flex items-center justify-around bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:text-black w-[90%] rounded-lg mx-auto'> 
 Day Vs Night 
</Link>

<Link to="/admin/Production-Goal" className='h-20 sm:max-lg:h-10 flex items-center justify-around bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:text-black w-[90%] rounded-lg mx-auto'> 
Production Goal
</Link>

</div>
      
    </div>
    

    <div className=' max-w-sm
    rounded-2xl
    text-white/35
    backdrop-blur-lg
    [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] h-[35rem] w-[25rem] text-center text-5xl font-bold
    sm:max-lg:w-72 sm:max-lg:text-3xl sm:max-lg:h-[20rem]'
    id="navigation-container"
    >
      
      <div className='item p-12 pt-56 sm:max-lg:pt-32'>Create Data</div>

      <div className='nav-item-name flex flex-col gap-6 mt-7 sm:max-lg:my-8 text-4xl sm:max-lg:text-2xl'>

<Link to="/admin/Create-Data-Retort" className='h-20 sm:max-lg:h-10 flex items-center justify-around bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:text-black w-[90%] rounded-lg mx-auto'> 
 Retort 
 <TbWashMachine className=" mt-2 sm:max-lg:mt-1 sm:max-lg:h-8" size={50} color='black' />
</Link>

<Link to="/admin/Create-Data-Filling" className='h-20 sm:max-lg:h-10 flex items-center justify-around bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:text-black w-[90%] rounded-lg mx-auto'> 
 Filling 
 <MdFormatColorFill className=" mt-2 sm:max-lg:mt-1 sm:max-lg:h-8" size={50} color='black' />
</Link>

<Link to="/admin/Create-Data-Kitchen" className='h-20 sm:max-lg:h-10 flex items-center justify-around bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:text-black w-[90%] rounded-lg mx-auto'> 
 Kitchen 
 <TbToolsKitchen className=" mt-2 sm:max-lg:mt-1 sm:max-lg:h-7" size={50} color='black' />
</Link>

<Link to="/admin/Create-Data-Dispatch" className='h-20 sm:max-lg:h-10 flex items-center justify-around bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:text-black w-[90%] rounded-lg mx-auto'> 
 Dispatch 
 <FaBox className=" mt-2 sm:max-lg:mt-1 sm:max-lg:h-6" size={36} color='black' />
</Link>

</div>
      
    </div>

  </div>
 


    </div>

  )
}

export default Home
