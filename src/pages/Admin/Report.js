import React, {useState} from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { STORE_URL } from '../../redux/Utils/constants';
import Loader from '../../components/Loader'
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';

const Report = () => {

    const [loading, setLoading] = useState(0);
    const [data, setData] = useState([]);
    const [error, setError] = useState(0);

    const {userinfo} = useSelector(state=>state.auth);

    const [info, setInfo] = useState({
        start:"",
        end:"",
    }); 

    async function getData(){
        try {
          setError(0);
          const res = await apiConnector(`${STORE_URL}/Report`,"PUT",info,{Authorization: `Bearer ${userinfo.token}`});
          setData(res.data.data);
          setLoading(0);
        } catch (error) {
          setError(1);
          setLoading(0);
          toast(error.response.data.message);
        }
      }
    
    const inputHandler = async(e) =>{
        setInfo((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value
        }));
      }

  return (
    <div>
         <div className='flex justify-center my-8 text-2xl font-bold gap-24 sm:max-lg:gap-10 sm:max-lg:mx-4'>
        <div>
        <label>Start: </label>
            <input type='date'
                   name='start'
                   onChange={ e => inputHandler(e) }
            />
        </div>
        <div>
        <label>End: </label>
            <input type='date'
                   name='end'
                   onChange={ e => inputHandler(e) }
            />
        </div>
        <div className='text-xl select-none font-semibold h-16 w-[9.6rem] text-center hover:bg-black hover:text-white rounded-xl -mt-2 sm:max-lg:mt-0.5 pt-4 bg-[#f59e0b]' 
             onClick={getData}
             >Submit</div>
    </div>

{
    error ? (
        <div className='text-center text-6xl font-bold my-40'>Error Fetching Data</div>
    ):(
        <div>
        {
loading ? (<Loader/> 
) : (
<div className='sm:max-lg:mx-3'>
<table className='w-[80rem] mx-auto text-center text-black my-12 sm:max-lg:w-fit'>
<thead>
  <tr>
    <th rowSpan={2} className='border-4 border-black p-2'>S no.</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Purchase Date</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Item Name</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Units</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Issue Count</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Rate / Part</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Cost</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Equipment </th>
    <th rowSpan={2} className='border-4 border-black p-2'>Section </th>
  </tr>
</thead>

{   
  data.length ? (<tbody>
      {
        data.map((val,index)=>(
        <tr key={index} className='text-center'>
    <td className='border-4 border-black font-bold  px-4 p-2'>{index+1}</td>
    <td className='border-4 border-black font-bold '>{val.pDate?.substring(0,10)}</td>
    <td className='border-4 border-black font-bold '>{val.name}</td>
    <td className='border-4 border-black font-bold '>{val.unit}</td>
    <td className='border-4 border-black font-bold '>{val.count}</td>
    <td className='border-4 border-black font-bold '>{val.rate}</td>
    <td className='border-4 border-black font-bold '>{(val.rate*val.count).toFixed(2)}</td>
    <td className='border-4 border-black font-bold '>{val.equipment}</td>
    <td className='border-4 border-black font-bold '>{val.section}</td>
        </tr>
      ))
      }
     
      <tr className='text-center bg-teal-400'>
    <td colSpan={4} className='border-4 border-black font-bold  px-4 p-2'>Total Monthly Costing</td>
    <td className='border-4 border-black font-bold '>{ data.reduce((acc,obj)=>  acc + obj.count,0)}</td>
    <td colSpan={4} className='border-4 border-black font-bold '>{ data.reduce((acc,obj)=>  acc + obj.count*obj.rate,0).toFixed(2)}</td>
        </tr>

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

export default Report
