import React from 'react'
import { useSelector } from 'react-redux';
import { MdArrowDropDownCircle } from "react-icons/md";
import { useState } from 'react';
import Dropdown from './Dropdown';

const DataLog = () => {

  const data = useSelector(state=>state.data);

  const [val, setVal] = useState(0);
  return (
        
      <div className='flex select-none items-center justify-center mx-6 gap-96'>

          <div className='flex gap-8 mt-4'>
      <div className='flex items-center text-center font-bold text-2xl h-fit rounded-lg gap-1'
      onClick={()=>setVal( val ? 0 : 1  )}>   
         {data.section}
          <MdArrowDropDownCircle className='mt-1'/>
          {
          val === 1 ? (<div> <Dropdown val={1}/></div>) : (<div></div>)
         }
      </div>
      <div className='flex items-center  text-center font-bold text-2xl h-fit rounded-lg gap-1'
      onClick={()=>setVal( val ? 0 : 2 )}>   
         {data.month}
         <MdArrowDropDownCircle className='mt-1'/>
         {
          val === 2 ? (<div> <Dropdown val={2}/></div>) : (<div></div>)
         }
      </div>
      <div className='flex items-center text-center font-bold text-2xl h-fit rounded-lg gap-1'
      onClick={()=>setVal( val ? 0 : 3 )}>  
         {data.date}
         <MdArrowDropDownCircle className='mt-1'/>
         {
          val === 3 ? (<div> <Dropdown val={3}/></div>) : (<div></div>)
         }
      </div>
          </div>      
    </div>
  )
}

export default DataLog
