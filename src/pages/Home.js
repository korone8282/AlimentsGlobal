import React,  { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TbToolsKitchen} from "react-icons/tb";
import { FaBox } from "react-icons/fa";
import { MdFormatColorFill } from "react-icons/md";
import { useDispatch } from 'react-redux'
import { setSection } from '../redux/Slices/dateSlice'
import { GiIncubator } from "react-icons/gi";
import "./Home.css";
import "./Slider.css"
import { LuGoal } from "react-icons/lu";
import { apiConnector } from '../redux/Utils/apiConnector';
import { PRODUCT_URL } from '../redux/Utils/constants';
import { TbPackageExport } from "react-icons/tb";

const Home = () => {

  const {userinfo} = useSelector(state => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
   
    if(!userinfo){
      navigate("/Login")
    }
  }, [userinfo,navigate]);

  React.useMemo(() => {
    setInterval( async() => {
      try {
        await apiConnector(`${PRODUCT_URL}/dispUpdater`, "GET",null, {Authorization: `Bearer ${userinfo.token}`})
        
      } catch (error) {
        console.log(error)
      }
    },21600000);
  }, [userinfo.token]);

  return (
    <div className='bg-b h-screen bg-cover bg-center'>
<div
    style={{ zIndex: 9999 }}
    className='flex flex-col gap-16 sm:max-lg:gap-8 p-4 bg-[#000] text-black backdrop-blur-xl h-[100vh] absolute [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-r-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ]'
    id="navigation-container2"
  >
       <div className=' heading text-black font-bold text-5xl sm:max-lg:text-3xl sm:max-lg:-ml-2 w-80 '>Create Data</div>

<div className='flex flex-col gap-16 text-4xl sm:max-lg:text-xl sm:max-lg:gap-6 items-start'>

<Link to="/admin/Create-Data-Filling" className='one flex items-center sm:max-lg:gap-1 hover:text-white/35 font-semibold transition-all'> 
⦿ Filling 
<MdFormatColorFill className=" mt-2 sm:max-lg:mt-1 sm:max-lg:h-8" size={50} color='black' />
</Link>

<Link to="/admin/Create-Data-Kitchen" className='two flex gap-2 sm:max-lg:gap-0 items-center justify-around hover:text-white/35 font-semibold'> 
⦿ Kitchen 
<TbToolsKitchen className=" mt-2 sm:max-lg:mt-1 sm:max-lg:h-7" size={50} color='black' />
</Link>

<Link to="/admin/Create-Data-Dispatch" className='three flex gap-4 sm:max-lg:gap-1 items-center justify-around hover:text-white/35 font-semibold transition-all'> 
⦿ Dispatch 
<FaBox className=" mt-2 sm:max-lg:mt-1 sm:max-lg:h-6" size={36} color='black' />
</Link>

<Link to="/admin/Production" className='four sm:max-lg:gap-0 flex gap-2 items-center justify-around hover:text-white/35 font-semibold transition-all'> 
⦿ Goals
<LuGoal className=" mt-2 sm:max-lg:mt-1 sm:max-lg:h-6" size={40} color='black' />
</Link>

<Link to="/admin/Create-Exports" className='two flex gap-2 sm:max-lg:gap-0 items-center justify-around hover:text-white/35 font-semibold'> 
⦿ Exports
<TbPackageExport className=" mt-2 sm:max-lg:mt-1 sm:max-lg:h-7" size={46} color='black' />
</Link>

</div>

</div>
  
  <div className='flex gap-24 justify-center py-20 sm:max-lg:gap-4  sm:max-lg:mx-4 sm:max-lg:ml-40 sm:max-lg:py-2'
      id='mainx'>
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

      <div className='nav-item-name flex flex-col gap-6 mt-7 sm:max-lg:my-2 text-4xl sm:max-lg:text-2xl'>

<div onClick={()=>{
      dispatch(setSection("Filling"));
      navigate(`admin/Date`)
    }} className='h-20 sm:max-lg:h-10 flex items-center justify-around  [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] hover:text-black w-[90%] rounded-lg mx-auto cursor-pointer'> 
 Filling 
 <MdFormatColorFill className=" mt-2 sm:max-lg:mt-1 sm:max-lg:h-8" size={50} color='black' />
</div>

<div onClick={()=>{
      dispatch(setSection("Kitchen"));
      navigate(`admin/Date`)
    }} className='h-20 sm:max-lg:h-10 flex items-center justify-around  [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] hover:text-black w-[90%] rounded-lg mx-auto cursor-pointer'> 
 Kitchen 
 <TbToolsKitchen className=" mt-2 sm:max-lg:mt-1 sm:max-lg:h-7" size={50} color='black' />
</div>

<div onClick={()=>{
      dispatch(setSection("Dispatch"));
      navigate(`admin/Date`)
    }} className='h-20 sm:max-lg:h-10 flex items-center justify-around  [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] hover:text-black w-[90%] rounded-lg mx-auto cursor-pointer'> 
 Dispatch 
 <FaBox className=" mt-2 sm:max-lg:mt-1 sm:max-lg:h-6" size={36} color='black' />
</div>

<Link to="/admin/Daily-List" className='h-20 sm:max-lg:h-10 flex items-center justify-around  [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] hover:text-black w-[90%] rounded-lg mx-auto'> 
Wastage
</Link>

<Link to="/admin/Production-Goal" className='h-20 sm:max-lg:h-10 flex items-center justify-around  [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] hover:text-black w-[90%] rounded-lg mx-auto'> 
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
    id="navigation-container">
      
        <div className='item p-12 pt-56 sm:max-lg:pt-28'>View Analytics</div>

        <div className='nav-item-name flex flex-col gap-6 mt-7 sm:max-lg:my-1.5 text-4xl sm:max-lg:text-2xl'>

<Link to="/admin/Monthly-Data" className='h-20 sm:max-lg:h-10 flex items-center justify-around  [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] hover:text-black w-[90%] rounded-lg mx-auto'> 
 Monthly Data 
</Link>

<Link to="/admin/Product-Data" className='h-20 sm:max-lg:h-10 flex items-center justify-around  [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] hover:text-black w-[90%] rounded-lg mx-auto'> 
 Buyer Product Data
</Link>

<Link to="/admin/Container-List" className='h-20 sm:max-lg:h-10 flex items-center justify-around  [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] hover:text-black w-[90%] rounded-lg mx-auto'> 
 Exports Data 
</Link>

<Link to="/admin/Graph" className='h-20 sm:max-lg:h-10 flex items-center justify-around  [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] hover:text-black w-[90%] rounded-lg mx-auto'> 

Graphs  
</Link>

<Link to="/admin/Day-Night" className='h-20 sm:max-lg:h-10 flex items-center justify-around  [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] hover:text-black w-[90%] rounded-lg mx-auto'> 
Day Vs Night 
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
    id="navigation-container">
      
      <div className='item p-12 pt-56 sm:max-lg:pt-32'>View Inventory</div>

      <div className='nav-item-name flex flex-col gap-6 mt-7 sm:max-lg:my-2 text-4xl sm:max-lg:text-2xl'>

<Link to="/admin/Pouch" className='h-20 sm:max-lg:h-10 flex items-center justify-around  [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] hover:text-black w-[90%] rounded-lg mx-auto'> 
Pouch Stock
</Link>

<Link to="/admin/Dispatched" className='h-20 sm:max-lg:h-10 flex items-center justify-around  [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] hover:text-black w-[90%] rounded-lg mx-auto'> 
Dispatch Stock
</Link>

<Link to="/admin/ProductData" className='h-20 sm:max-lg:h-10 flex items-center justify-around  [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] hover:text-black w-[90%] rounded-lg mx-auto'> 
Product DataList
</Link>

<Link to="/admin/Left" className='h-20 sm:max-lg:h-10 flex items-center justify-around  [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] hover:text-black w-[90%] rounded-lg mx-auto'> 
Incubation <span> <GiIncubator color='black'/></span>
</Link>

<Link to="/admin/Daily-List" className='h-20 sm:max-lg:h-10 flex items-center justify-around  [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] hover:text-black w-[90%] rounded-lg mx-auto'> 
Inventory
</Link>

</div>
      
    </div>
  </div>
 


    </div>

  )
}

export default Home
