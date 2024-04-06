import React, { useEffect, useState } from 'react'
import DataLog from '../../components/DataLog'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { DATA_URL } from '../../redux/Utils/constants';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader'

const Filiing = () => {

  const date = useSelector(state=>state.data);
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(1);
  const [error, setError] = useState(0);

  const {userinfo} = useSelector(state=>state.auth);

  useEffect(() => {
    
    async function getData(){
      try {
        const res = await apiConnector(`${DATA_URL}/${date.date}/${date.month}`,"GET",null,{Authorization: `Bearer ${userinfo.token}`});
        setData(res.data.data);
        setLoading(0);
      } catch (error) {
        setError(1);
        console.log(error);
      }
    }

  getData();
  }, [date,userinfo.token]);

  const sectionData = data.length ? data.filter( item => item.sectionMain === "Filling") : [];

  return (
    <div>
    <DataLog/>
    
    {
      error ? (<div className='text-center font-bold text-7xl mt-64'>No Data Entry Found</div>
      ) : ( 
        <div>
    <div className='text-3xl font-bold text-center mt-8 mb-8'>Daily Log</div>
    
    {
      loading ? (<Loader/>
      ) : (
        <div>
        <table className='w-[80rem] mx-auto text-center'>
      <thead>
        <tr>
          <th rowSpan={2} className='border-4 border-black p-2'>S no.</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Buyer Name</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Product Name</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Pouch Produced</th>
          <th colSpan={2} className='border-4 border-black p-2'>No. Of Pouch Rejected</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. of Workers</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Cost/Pouch</th>
        </tr>
        <tr>
          <th className='border-4 border-black p-1'>Empty</th>
          <th className='border-4 border-black p-1'>Filled</th>
        </tr>
      </thead>

      {   
        sectionData.length ? (<tbody>
            {
              sectionData[0].dataList.map((val,index)=>(
              <tr key={index}>
          <td className='border-4 border-black px-4 p-2'>{index+1}</td>
          <td className='border-4 border-black'>{val.buyerName}</td>
          <td className='border-4 border-black'>{val.productName}</td>
          <td className='border-4 border-black'>{val.pouchQuantity}</td>
          <td className='border-4 border-black'>{val.empty}</td>
          <td className='border-4 border-black'>{val.filled}</td>
          <td className='border-4 border-black'>{val.workersQuantity}</td>
          <td className='border-4 border-black'>{val.avgCost}</td>
              </tr>
            ))
            }
          </tbody>) : (<div className='font-bold text-3xl mt-12'>No Data Entry Found</div>)
        }

    </table>
        </div>
      )
    }
   
    </div>
      )
    }
   
   </div>
  )
}

export default Filiing
