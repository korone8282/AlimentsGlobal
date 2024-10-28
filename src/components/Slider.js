import React from 'react'
import "../components/Slider.css"
import { Link } from 'react-router-dom';
import { TbToolsKitchen} from "react-icons/tb";
import { MdFormatColorFill } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { LuGoal } from "react-icons/lu";
import { TbPackageExport } from "react-icons/tb";

const Navigation = () => {
  
  return (
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


  )
}

export default Navigation