import React,  { useEffect } from 'react'
import ItemCards from '../components/ItemCards';
import DailyCard from '../components/DailyCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const date = new Date();

  const {userinfo} = useSelector(state => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
   
    if(!userinfo){
      navigate("/Login")
    }
  }, [userinfo,navigate]);
 

  return (
    <div className= 'flex flex-col text-white h-[90vh]'>
      
    <div className='font-bold text-2xl my-4 w-full justify-between flex px-32 items-center'>
      <div className='flex gap-6 items-center'>
      
        <img src={userinfo?.image} alt='Profile' className='h-24 w-24 rounded-full object-cover'/>
        <div>{userinfo?.fname}</div>
        
      </div>

      <div>
      {date.toLocaleString().substring(0,10)}
      </div>

    </div>
     

      <div className='w-full bg-gradient-to-r from-[#1e1b4b] to-[#2e1065] h-10 font-bold text-3xl my-8 text-center'>
      Today's Data
      </div>
      
      <div className='flex gap-16 justify-center'>
        <DailyCard text={"Today Data"}/>
        <DailyCard text={"Production Plan"}/>
      </div>

    <h2 className='w-full text-center bg-gradient-to-r from-[#1e1b4b] to-[#2e1065] h-10 font-bold text-3xl my-8'>View Previous Feeds</h2>

      <div className='flex flex-wrap gap-14 h-[35rem] justify-center'>
        <ItemCards text={"Retort"}/>
        <ItemCards text={"Filling"}/>
        <ItemCards text={"Dispatch"}/>
        <ItemCards text={"Kitchen"}/>
      </div>

    </div>

  )
}

export default Home
