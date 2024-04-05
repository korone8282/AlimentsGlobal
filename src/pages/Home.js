import React from 'react'
import ItemCards from '../components/ItemCards'
import { useState ,useEffect } from 'react';
import DailyCard from '../components/DailyCard';

const Home = () => {

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(()=>{
      setDate(new Date());
    },1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className= 'flex flex-col text-white h-[90vh]'>

      <div className='font-bold text-2xl text-end my-4'>
      {date.toLocaleString()}
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
