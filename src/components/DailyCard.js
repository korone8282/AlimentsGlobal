import React from 'react'
import { useNavigate } from 'react-router-dom'

const DailyCard = ({text}) => {

    const navigate = useNavigate();

    const updatedText = text.split(" ").join("-");

  return (
    <div>
       <div className='bg-gradient-to-br from-30% from-black to-red-700 text-[#f59e0b] flex text-4xl sm:max-lg:text-lg font-bold text-center items-center justify-center hover:border-4 w-[15rem] sm:max-lg:w-32 sm:max-lg:h-32 h-[10rem] rounded-lg hover:scale-105'
    onClick={()=>{
      navigate(`admin/${updatedText}`)
    }}
    >
    {text}
    </div>
    </div>
  )
}

export default DailyCard
