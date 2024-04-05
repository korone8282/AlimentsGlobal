import React from 'react'
import { useDispatch } from 'react-redux'
import { setSection } from '../redux/Slices/dateSlice'
import { useNavigate } from 'react-router-dom';

const ItemCards = ({text}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className='bg-gradient-to-r from-[#1e1b4b] to-[#2e1065] flex text-4xl font-bold text-center items-center justify-center hover:border-4 w-[15rem] h-[10rem] rounded-xl hover:scale-105'
    onClick={()=>{
      dispatch(setSection(text));
      navigate(`user/Date`)
    }}
    >
    {text}
    </div>
  )
}

export default ItemCards
