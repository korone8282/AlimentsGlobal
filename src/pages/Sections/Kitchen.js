import React, { useEffect, useState } from 'react'
import DataLog from '../../components/DataLog'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { DATA_URL } from '../../redux/Utils/constants';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader'


const Kitchen = () => {

  const date = useSelector(state=>state.data);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(1);
  const [error, setError] = useState(0);

  useEffect(() => {
    async function getData(){
      try {
        const res = await apiConnector(`${DATA_URL}/${date.date}/${date.month}`,"GET");
        setData(res.data.data);
        setLoading(0);
      } catch (error) {
        setError(1);
        console.log(error);
      }
    }

  getData();
  }, [date]);

  const sectionData = data.length ? data.filter( item => item.sectionMain === "Kitchen") : [];

  return (
  <div className='h-[100vh]'>
   <DataLog/>

    {
      error ? (<div className='text-center font-bold text-7xl mt-64'>No Data Entry Found</div>
      ) : ( 
        <div>
   <div className='text-3xl font-bold text-center mt-8 mb-8'>Daily Log</div>
   
   {
    loading ? ( <Loader/>
    ) : ( <div>
      <table className='w-[80rem] mx-auto text-center'>
      <thead>
        <tr>
          <th rowSpan={2} className='border-4 border-black p-2'>S no.</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Buyer Name</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Product Name</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. of Batch</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Batch Size (kg)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Yield (kg)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Yield Loss (kg)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. of Workers</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Cost/Kg</th>
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
          <td className='border-4 border-black'>{val.batchQuantity}</td>
          <td className='border-4 border-black'>{val.batchSize}</td>
          <td className='border-4 border-black'>{val.yield}</td>
          <td className='border-4 border-black'>{val.yieldLoss}</td>
          <td className='border-4 border-black'>{val.workersQuantity}</td>
          <td className='border-4 border-black'>{val.avgCost}</td>
              </tr>
            ))
            }
          </tbody>) : (<div className='font-bold text-3xl mt-12'>No Data Entry Found</div>)
        }

    </table>
    </div>)
   }
  
   </div>
      )
    }
  
  </div>
  )
}

export default Kitchen
