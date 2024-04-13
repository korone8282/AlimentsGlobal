import React, { useEffect, useState } from 'react'
import DataLog from '../../components/DataLog'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { DATA_URL } from '../../redux/Utils/constants';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader'

const Dispatch = () => {

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

  const sectionData = data.length !==0 ? data.filter( item => item.sectionMain === "Dispatch") : [];

  return (
    <div>
   <DataLog/>

    {
      error ? (<div className='text-center font-bold text-7xl mt-64'>No Data Entry Found</div>
      ) : (
        <div>
   <div className='text-3xl font-bold text-center mt-8 mb-8'>Daily Log</div>

   {
    loading ? ( <Loader/>
    ) : (
      <div>
      <table className='w-[80rem] mx-auto text-center bg-[#f59e0b] text-black my-12'>
      <thead>
        <tr>
          <th rowSpan={2} className='border-4 border-black p-2'>S no.</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Buyer Name</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Product Name</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Batch No.</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Pouch Size (kg)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Pouch Packed</th>
          <th colSpan={4} className='border-4 border-black p-2'>No. Of Pouch Rejected</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Box</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. of Workers</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Cost/Pouch</th>
        </tr>
        <tr>
          <th className='border-4 border-black p-1'>Leaked</th>
          <th className='border-4 border-black p-1'>Bloated</th>
          <th className='border-4 border-black p-1'>X-Ray</th>
          <th className='border-4 border-black p-1'>Others</th>
        </tr>
      </thead>

      { 
          sectionData.length ? (<tbody>
            
            {
              sectionData[0].dataList.map((val,index)=>(
              <tr key={index}>
          <td className='border-4 border-black font-bold  px-4 p-2'>{index+1}</td>
          <td className='border-4 border-black font-bold '>{val.buyerName}</td>
          <td className='border-4 border-black font-bold '>{val.productName}</td>
          <td className='border-4 border-black font-bold '>{val.batch}</td>
          <td className='border-4 border-black font-bold '>{val.packSize}</td>
          <td className='border-4 border-black font-bold '>{val.pouchPacked}</td>
          <td className='border-4 border-black font-bold '>{val.leaked}</td>
          <td className='border-4 border-black font-bold '>{val.bloated}</td>
          <td className='border-4 border-black font-bold '>{val.foreignMatter}</td>
          <td className='border-4 border-black font-bold '>{val.other}</td>
          <td className='border-4 border-black font-bold '>{val.box}</td>
       {
        !index ?  (<td rowSpan={sectionData[0].dataList.length+1} className='border-4 border-black font-bold '>{val.workersQuantity}</td>) : (<td></td>)
       }   
       {
        !index ?  (<td rowSpan={sectionData[0].dataList.length+1} className='border-4 border-black font-bold '>{((val.workersQuantity*500)/(sectionData[0].dataList.reduce( (accumulator, obj) => accumulator + obj.pouchPacked,0))).toFixed(3)}</td>) : (<td></td>)
       }   
              </tr>
            ))
            }
            <tr >
          <td className='border-4 border-black font-bold' colSpan={5}>Total: </td>
          <td className='border-4 border-black font-bold'>{sectionData[0].dataList.reduce( (accumulator, obj) => accumulator + obj.pouchPacked,0)}</td>
          <td className='border-4 border-black font-bold'>{sectionData[0].dataList.reduce( (accumulator, obj) => accumulator + obj.leaked,0)}</td>
          <td className='border-4 border-black font-bold'>{sectionData[0].dataList.reduce( (accumulator, obj) => accumulator + obj.bloated,0)}</td>
          <td className='border-4 border-black font-bold'>{sectionData[0].dataList.reduce( (accumulator, obj) => accumulator + obj.foreignMatter,0)}</td>
          <td className='border-4 border-black font-bold'>{sectionData[0].dataList.reduce( (accumulator, obj) => accumulator + obj.other,0)}</td>
          <td className='border-4 border-black font-bold'>{sectionData[0].dataList.reduce( (accumulator, obj) => accumulator + obj.box,0)}</td>
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

export default Dispatch
