import React, { useEffect, useState } from 'react'
import DataLog from '../../components/DataLog'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { DATA_URL } from '../../redux/Utils/constants';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader'
import { MdLightMode,MdModeNight } from "react-icons/md"; 

const Kitchen = () => {

  const date = useSelector(state=>state.data);

  const [data, setData] = useState([]);
  const dayArray = ["Day","Night"];
  const [loading, setLoading] = useState(1);
  const [error, setError] = useState(0);
  const [mode, setMode] = useState(0);


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

  const sectionData = data.length ? data.filter( item => item.sectionMain === "Kitchen" && item.dayTime === `${dayArray[+mode]}`) : [];

  return (
  <div>
        <div className='flex justify-center items-center h-24'>
    <DataLog/>
    <div className='mt-5' onClick={()=>setMode(!mode)}>
    {
      !mode ? (
        <MdLightMode  size={36}/>
      ) : (
        <MdModeNight  size={36}/>
      )
    }
        </div>
    </div>

    {
      error ? (<div className='text-center font-bold text-7xl mt-64 sm:max-lg:mt-4'>No Data Entry Found</div>
      ) : ( 
        <div>
   <div className='text-3xl font-bold text-center my-8'>Daily Log</div>
   
   {
    loading ? ( <Loader/>
    ) : ( <div className='sm:max-lg:ml-16 sm:max-lg:mr-2'>
      <table className='w-[80rem] mx-auto text-center my-12 text-black sm:max-lg:w-fit'>
      <thead>
        <tr>
          <th rowSpan={2} className='border-4 border-black p-2'>S no.</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Buyer Name</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Product Name</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Batch No.</th>
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
          <td className='border-4 border-black font-bold px-4 p-2'>{index+1}</td>
          <td className='border-4 border-black font-bold'>{val.buyerName}</td>
          <td className='border-4 border-black font-bold'>{val.productName}</td>
          <td className='border-4 border-black font-bold'>{val.batch}</td>
          <td className='border-4 border-black font-bold'>{val.batchQuantity}</td>
          <td className='border-4 border-black font-bold'>{val.batchSize}</td>
          <td className='border-4 border-black font-bold'>{val.yield}</td>
          <td className='border-4 border-black font-bold'>{val.yieldLoss}</td>
          {
        !index ?  (<td rowSpan={sectionData[0].dataList.length+1} className='border-4 border-black font-bold '>{val.workersQuantity}</td>) : (<td></td>)
       }   
       {
        !index ?  (<td rowSpan={sectionData[0].dataList.length+1} className='border-4 border-black font-bold '>{((val.workersQuantity*500)/(sectionData[0].dataList.reduce( (accumulator, obj) => accumulator + (obj.yield*obj.batchQuantity),0))).toFixed(3)}</td>) : (<td></td>)
       }   
              </tr>
            ))
            }
            <tr >
          <td className='border-4 border-black font-bold' colSpan={4}>Total: </td>
          <td className='border-4 border-black font-bold'>{sectionData[0].dataList.reduce( (accumulator, obj) => accumulator + obj.batchQuantity,0)}</td>
          <td className='border-4 border-black font-bold'>--</td>
          <td className='border-4 border-black font-bold'>{sectionData[0].dataList.reduce( (accumulator, obj) => accumulator + obj.batchQuantity*obj.yield,0)}</td>
          <td className='border-4 border-black font-bold'>{sectionData[0].dataList.reduce( (accumulator, obj) => accumulator + obj.yieldLoss,0)}</td>
              </tr>
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
