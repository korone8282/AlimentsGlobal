import React from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDate,setMonth,setDays,setSection } from '../redux/Slices/dateSlice';

const Dropdown = ({val}) => {

    const sections = ["Kitchen","Filling","Retort","Dispatch"];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector(state=>state.data);
  
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
                 ];
                 
  return (
    <div className='absolute'>
      {
        val === 1 ? (
            <div className='absolute bg-gradient-to-br from-30% from-black to-red-700 border-black border-4 rounded-xl text-[#f59e0b]  top-10 w-48 h-36 flex gap-3 flex-wrap justify-center items-center'>
              {
            sections.map((val,index)=>(
              <div key={index}
              className='text-sm font-bold h-12 w-[4.8rem] bg-gradient-to-br from-30% from-black to-red-700 border-4 rounded-lg hover:scale-105 text-center cursor-auto pt-2 hover:bg-red-400'
              onClick={()=>{
                dispatch(setSection(val));
                navigate(`/user/${val}/${data.month}`);  
               }}>
                {val}
              </div>
            ))
          }
            </div>
        ) : (
            <div>
                {
                    val === 2 ? (
              <div className='absolute bg-gradient-to-br from-30% from-black to-red-700 border-black border-4 rounded-xl text-[#f59e0b] sm:max-lg:top-6 top-10 w-72 h-72 flex gap-3 flex-wrap justify-center items-center'>
              {
            months.map((val,index)=>(
              <div key={index}
              className='text-sm font-bold h-12 w-[4.8rem] bg-gradient-to-br from-30% from-black to-red-700 border-4 rounded-lg hover:scale-105 text-center cursor-auto pt-2 hover:bg-red-400'
              onClick={()=>{
                dispatch(setMonth(index+1));
                dispatch(setDays(val.days));
                navigate(`/user/${data.section}/${val.month}`);  
               }}>
                {val.month}
              </div>
            ))
          }
            </div>
                    ) : (
            <div className='absolute bg-gradient-to-br from-30% from-black to-red-700 border-black border-4 rounded-xl text-[#f59e0b] sm:max-lg:-top-12 sm:max-lg:h-fit sm:max-lg:w-80 top-10 w-[21rem] h-[21rem] flex gap-3 flex-wrap justify-center items-center p-0.5'>
              {[...Array(data.days).keys()].map((_, i) => (
                <div key={i} 
                onClick={()=>{
                dispatch(setDate(i+1));
                navigate(`/user/${data.section}/${data.month}`);
                }} 
                className='text-sm font-bold h-11 w-11 sm:max-lg:h-10 sm:max-lg:text-xs sm:max-lg:w-12 bg-gradient-to-br from-30% from-black to-red-700 border-4 rounded-lg hover:scale-105 text-center cursor-auto pt-2 hover:bg-red-400'>
                {i + 1}
                </div>
              ))}
                        </div>    
                    )
                }
            </div>
        )
      }
    </div>
  )
}

export default Dropdown
