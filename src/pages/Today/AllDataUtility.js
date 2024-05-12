import React, {useState, useEffect} from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { toast } from 'react-toastify';
import { DATA_URL, CATEGORIES_URL } from '../../redux/Utils/constants';
import { setData, deleteData, emptyData } from '../../redux/Slices/localSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSquareCheck } from "react-icons/fa6";
import { FaTrash} from "react-icons/fa";
import { MdLightMode,MdModeNight } from "react-icons/md";

const AllDataUtility = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const date = new Date();

  const [formData, setformData] = useState({

  });
  
  const {userinfo} = useSelector(state=>state.auth);

  const submitHandler = async() =>{

    const toastId = toast.loading("Loading...",{
      position: 'top-center',
    });

   try {


    toast.dismiss(toastId);
    toast("Successfully Submited");
    
    navigate("/");
   } catch (error) {
    toast.dismiss(toastId);
    toast("Check Buyer / Product Name ");
    console.log(error);
   }
  }

  const inputHandler = async(e) =>{
    setformData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  }

  const rowDataHandler = () =>{
    
    setformData((prevData) => ({
      ...prevData,

}));

  }

  function deleteRow(index){
   
  }

  return (
    <div>
      <div className='my-8 rounded-xl w-full h-12 flex justify-around items-center'>

    

      <button className='text-xl font-semibold h-16 w-[9.6rem] text-center bg-[#f59e0b] rounded-xl border-[#2e1065] hover:bg-black hover:text-white'
              onClick={submitHandler}>
            Submit
      </button> 

      </div>

         <h2 className='text-center text-2xl font-bold my-8'>DataSheet for : {date.toLocaleDateString()}</h2>
      
         <div>
                    <table className='w-[80rem] mx-auto my-12'>
      <thead>
        <tr>
          <th rowSpan={2} className='border-4 border-black p-2'>S no.</th>
          <th colSpan={3} className='border-4 border-black p-2'>Boiler</th>
          <th colSpan={2} className='border-4 border-black p-2'>RO</th>
          <th colSpan={2} className='border-4 border-black p-2'>ETP</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Remarks</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Delete</th>
        </tr>
        <tr>
          <th rowSpan={2} className='border-4 border-black '>Standard Doses</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Chemical</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Cylinders</th>
          <th rowSpan={2} className='border-4 border-black'>Standard Doses</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Chemical</th>
          <th rowSpan={2} className='border-4 border-black'>Standard Doses</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Chemical</th>
        </tr>
      </thead>

      {/* <tbody>
      {
          initalData[3].map((val,index)=>(
              <tr key={index}>
          <td className='border-4 border-black px-4 p-2'>{index+1}</td>
          <td className='border-4 border-black'>{val.buyerName}</td>
          <td className='border-4 border-black'>{val.productName}</td>
          <td className='border-4 border-black'>{val.batch}</td>
          <td className='border-4 border-black'>{val.packSize}</td>
          <td className='border-4 border-black'>{val.retortCycle}</td>
          <td className='border-4 border-black'>{val.pouchPerCycle}</td>
          <td className='border-4 border-black'>{val.workersQuantity}</td>
          <td className='border-4 border-black px-10 hover:bg-slate-300'><FaSquareCheck color='green'/></td>
          <td className='border-4 border-black px-8 hover:bg-red-500'
              onClick={()=>deleteRow(index)}><FaTrash/></td>
              </tr>
            ))
        }
      
        

      <tr className='text-center'>

          <td className='border-4 border-black'>-</td>
          <td className='border-4 border-black'>
          <select
                 name='buyerName'
                 className='w-fit bg-transparent'
                 onChange={ e => inputHandler(e) }
                 value={formData.buyerName}
            >
            <option className=' bg-[#f59e0b]'>Select Buyer</option>
            {
                categories.map((val,index)=>(<option className=' bg-[#f59e0b]' value={`${val._id}-${val.name}`} key={index}>{val.name}</option>))
            }
            </select>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 name='productName'
                 value={formData.productName}
                 className='w-full bg-transparent'
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 name='batch'
                 value={formData.batch}
                 className='w-32 bg-transparent'
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='number'
                 name='packSize'
                 value={formData.packSize}
                 className='w-32 bg-transparent'
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='number'
                 name='retortCycle'
                 value={formData.retortCycle}
                 className='w-full bg-transparent'
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='number'
                 value={formData.pouchPerCycle}
                 name='pouchPerCycle'
                 className='w-full bg-transparent'
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='number'
                 name='workersQuantity'
                 value={formData.workersQuantity}
                 className='w-full bg-transparent'
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black px-10 hover:bg-green-200'
              onClick={rowDataHandler}><FaSquareCheck color='red' className='hover:text-black'/></td>
          <td className='border-4 border-black px-8'>-</td>
        
      </tr>

      </tbody> */}
    </table>
                    </div>

    </div>
  )
}

export default AllDataUtility
