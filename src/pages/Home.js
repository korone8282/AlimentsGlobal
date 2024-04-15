import React,  { useEffect } from 'react'
import ItemCards from '../components/ItemCards';
import DailyCard from '../components/DailyCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const {userinfo} = useSelector(state => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
   
    if(!userinfo){
      navigate("/Login")
    }
  }, [userinfo,navigate]);
 

  return (
    <div className= 'flex flex-col '>

      <div className='w-full  bg-black text-[#f59e0b] h-10 font-bold text-3xl my-8 text-center sm:max-lg:my-2 sm:max-lg:h-6 sm:max-lg:text-base'>
      View Data
      </div>
      
      <div className='flex gap-16 justify-center w-full px-64 flex-wrap sm:max-lg:px-32'>
        <DailyCard text={"Today Data"}/>
        <DailyCard text={"Production Plan"}/>
        <ItemCards text={"Retort"}/>
        <ItemCards text={"Filling"}/>
        <ItemCards text={"Dispatch"}/>
        <ItemCards text={"Kitchen"}/>
      </div>

    </div>

  )
}

export default Home
