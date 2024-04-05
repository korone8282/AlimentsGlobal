import React from 'react'
import { useState } from 'react';
import { MdArrowDropDownCircle } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDate,setMonth,setDays} from '../redux/Slices/dateSlice';
const Month = ({val}) => {

  const months = [{month:"January",days:31},
                  {month:"February",days:28},
                  {month:"March",days:31},
                  {month:"April",days:30},
                  {month:"May",days:31},
                  {month:"June",days:30},
                  {month:"July",days:31},
                  {month:"August",days:31},
                  {month:"September",days:30},
                  {month:"October",days:31},
                  {month:"November",days:30},
                  {month:"December",days:31}
                 ]

  const [drop, setDrop] = useState(0);

  const data = useSelector(state=>state.data);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className='flex justify-center'>
    {
      <div>

<div className='flex items-center mx-32 gap-2 mt-4 relative w-fit'
onClick={()=>setDrop(!drop)}>
  <div className=' text-center text-white text-3xl font-bold'>
    {months[data.month-1].month}
  </div>
<MdArrowDropDownCircle color='white' size={24} className='mt-2'/>
{
  drop ? (
    <div className='absolute top-10 w-72 h-72 bg-gradient-to-r from-[#1e1b4b] to-[#2e1065] rounded-xl text-white flex gap-3 flex-wrap justify-center items-center'>
    {
  months.map((val,index)=>(
    <div key={index}
    className='text-sm font-bold h-12 w-[4.8rem] border-4 rounded-lg hover:scale-105 text-center cursor-auto pt-2 hover:bg-red-400'
    onClick={()=>{
      dispatch(setMonth(index+1));
      dispatch(setDays(val.days));  
     }}>
      {val.month}
    </div>
  ))
}
    </div>
  ) : (
    <div>
      
    </div>
  )
}
</div>
  
  <div className='flex flex-wrap w-90% justify-center gap-8 mt-8 ml-16'>
    {[...Array(data.days).keys()].map((_, i) => (
      <div key={i} 
      onClick={()=>{
      dispatch(setDate(i+1));
      navigate(`/user/${val}/${data.month}`);
      }} 
      className="text-2xl font-bold h-28 w-36 bg-gradient-to-r from-[#1e1b4b] to-[#2e1065] hover-border-4 rounded-lg hover:translate-y-2 text-center pt-10 cursor-auto">
        Day {i + 1}
      </div>
    ))}
  </div>
</div>
    }
      
    </div>
  )
}

export default Month
