import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader'
import { UTIL_URL } from '../../redux/Utils/constants';
import DataLog from '../../components/DataLog';

const Utility = () => {

  const {userinfo} = useSelector(state=>state.auth);

  const date = useSelector(state=>state.data);

  const [loading, setLoading] = useState(1);
  const [error, setError] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    
    async function getData(){
      try {
        const res = await apiConnector(`${UTIL_URL}/${date.date}/${date.month}`,"GET",null,{Authorization: `Bearer ${userinfo.token}`});
        setData(res.data.data);
        setLoading(0);
      } catch (error) {
        setError(1);
        console.log(error);
      }
    }

  getData();
  }, [date,userinfo.token]);

  return (
    <div>
      
      <DataLog/>
     {
      error ? (<div className='text-center font-bold text-7xl mt-64 sm:max-lg:mt-4'> Data Entry Not Found</div>
      ) : (
        loading ? (<Loader/>
        ) : (
          <div>
                    <table className='w-[80rem] mx-32 my-10'>
      <thead>
        <tr>
          <th rowSpan={2} className='border-4 border-black p-0'>Name</th>
          <th rowSpan={2} className='border-4 border-black p-0'>Running (Hr)</th>
          <th colSpan={3} className='border-4 border-black p-2'>Chemical</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Cylinders</th>
          <th rowSpan={2} className='border-4 border-black'>BreakDowns (if any)</th>
          <th rowSpan={2} className='border-4 border-black'>Remarks</th>
        </tr>
        <tr>
          <th rowSpan={2} className='border-4 border-black px-8'>Name</th>
          <th rowSpan={2} className='border-4 border-black px-4'>Standard Doses</th>
          <th rowSpan={2} className='border-4 border-black px-4'>Actual Doses</th>
        </tr>
      </thead>

      <tbody className='font-semibold'>
     <tr>
          <th  className='border-4 border-black py-3'>Boiler</th>
          <td className='border-4 border-black w-24 text-center'>
          {data[0].BoilerRh}
          </td>
          <td className='border-4 border-black text-center'>
          {data[0].BoilerCN}
          </td>
          <td className='border-4 border-black text-center'>
          {data[0].BoilerSD}
          </td>
          <td className='border-4 border-black text-center'>
          {data[0].BoilerAD}
          </td>
          <td rowSpan={3} className='border-4 row-span-4 text-center border-black'>
          {data[0].Cylinder}
          </td>
          <td className='border-4 border-black'>
          <div className='overflow-y-auto h-32 overflow-x-hidden'>{data[0].BoilerBD}</div>
          </td>
          <td className='border-4 border-black'>
          <div className='overflow-y-auto h-32 w-96 overflow-x-hidden'>{data[0].BoilerR}</div>
          </td>
        </tr>

        <tr>
          <th  className='border-4 border-black py-3'>RO</th>
          <td className='border-4 border-black w-24 text-center'>
          {data[0].RoRh}
          </td>
          <td className='border-4 border-black text-center'>
          {data[0].RoCN}
          </td>
          <td className='border-4 border-black text-center'>
          {data[0].RoSD}
          </td>
          <td className='border-4 border-black text-center'>
          {data[0].RoAD}
          </td>
          <td className='border-4 border-black'>
          <div className='overflow-y-auto h-32 overflow-x-hidden'>{data[0].RoBD}</div>
          </td>
          <td className='border-4 border-black'>
          <div className='overflow-y-auto h-32 w-96 overflow-x-hidden'>{data[0].RoR}</div>
          </td>
        </tr>

        <tr>
          <th  className='border-4 border-black py-3'>ETP</th>
          <td className='border-4 border-black w-24 text-center'>
          {data[0].EtpRh}
          </td>
          <td className='border-4 border-black text-center'>
          {data[0].EtpCN}
          </td>
          <td className='border-4 border-black text-center'>
          {data[0].EtpSD}
          </td>
          <td className='border-4 border-black text-center'>
          {data[0].EtpAD}
          </td>
          <td className='border-4 border-black'>
          <div className='overflow-y-auto h-32 overflow-x-hidden'>{data[0].EtpBD}</div>
          </td>
          <td className='border-4 border-black text-ellipsis'>
          <div className='overflow-y-auto h-32 w-96 overflow-x-hidden'>{data[0].ETpR}</div>
          </td>
        </tr>

        <tr>
          <th  className='border-4 border-black py-3'>Digital Generator</th>
          <td className='border-4 border-black w-24 text-center'>
          {data[0].DGRh}
          </td>
          <td colSpan={6} className='border-4 text-center border-black'>
           Diesel Used : {data[0].Diesel}
          </td>
        </tr>
       
     </tbody>
    </table>
                    </div>
        )
      )
     }
    </div>
  )
}

export default Utility
