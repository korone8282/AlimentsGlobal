import React from 'react'
import Month from '../components/Month'
import { useSelector } from 'react-redux';

const Date = () => {

  const data = useSelector(state=>state.data);

  return (
    <div>
      <Month val={data.section}/>
    </div>
  )
}

export default Date
