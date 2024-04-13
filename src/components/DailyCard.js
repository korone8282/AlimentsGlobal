import React from 'react'
import { useNavigate } from 'react-router-dom'

const DailyCard = ({text}) => {

    const navigate = useNavigate();

    const updatedText = text.split(" ").join("-");

  return (
    <div>
       <div className='bg-black text-[#f59e0b] flex text-4xl font-bold text-center items-center justify-center hover:border-4 w-[15rem] h-[10rem] rounded-lg hover:scale-105'
    onClick={()=>{
      navigate(`user/${updatedText}`)
    }}
    >
    {text}
    </div>
    </div>
  )
}

export default DailyCard
