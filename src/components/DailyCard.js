import React from 'react'
import { useNavigate } from 'react-router-dom'

const DailyCard = ({text}) => {

    const navigate = useNavigate();

    const updatedText = text.split(" ").join("-");

  return (
    <div>
       <div className='bg-gradient-to-r from-[#1e1b4b] to-[#2e1065] flex text-4xl font-bold text-center items-center justify-center hover:border-4 w-[15rem] h-[10rem] rounded-xl hover:scale-105'
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
