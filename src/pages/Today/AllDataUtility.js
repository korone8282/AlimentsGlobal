import React from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { toast } from 'react-toastify';
import { UTIL_URL } from '../../redux/Utils/constants';
import { setUtil, setStorage, emptyUtil } from '../../redux/Slices/utilSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AllDataUtility = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const date = new Date();
  
  const initalData = useSelector(state=>state.util);

  const {userinfo} = useSelector(state=>state.auth);

  const submitHandler = async() =>{

    dispatch(setStorage());

    const toastId = toast.loading("Loading...",{
      position: 'top-center',
    });

   try {

    await apiConnector(`${UTIL_URL}/data`,"POST",initalData,{Authorization: `Bearer ${userinfo.token}`});

    toast.dismiss(toastId);
    toast("Successfully Submited");

    dispatch(emptyUtil());
    dispatch(setStorage());

    navigate("/");
   } catch (error) {
    toast.dismiss(toastId);
    toast("Error");
    console.log(error);
   }
  }

  return (
    <div>
      <div className='my-8 rounded-xl w-full h-12 flex justify-center gap-32 items-center'>

      <button className='text-xl font-semibold h-16 w-[9.6rem] text-center bg-[#f59e0b] rounded-xl border-[#2e1065] hover:bg-black hover:text-white'
              onClick={()=>{
                dispatch(setStorage());
                toast("Saved");
              }}>
            Save
      </button> 

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
          <th rowSpan={2} className='border-4 border-black p-0'>Name</th>
          <th rowSpan={2} className='border-4 border-black p-0'>Running (Hr)</th>
          <th colSpan={3} className='border-4 border-black p-2'>Chemical</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Cylinders</th>
          <th rowSpan={2} className='border-4 border-black'>BreakDowns (if any)</th>
          <th rowSpan={2} className='border-4 border-black'>Remarks</th>
        </tr>
        <tr>
          <th rowSpan={2} className='border-4 border-black px-8'>Name</th>
          <th rowSpan={2} className='border-4 border-black p-0'>Standard Doses</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Actual Doses</th>
        </tr>
      </thead>

     <tbody>
     <tr>
          <th  className='border-4 border-black py-3'>Boiler</th>
          <td className='border-4 border-black w-24'>
          <input type='number'
                 value={initalData.BoilerRh}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'BoilerRh',val:e.target.value}))}
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 value={initalData.BoilerCN}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'BoilerCN',val:e.target.value}))}
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='number'
                 value={initalData.BoilerSD}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'BoilerSD',val:e.target.value}))}
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='number'
                 value={initalData.BoilerAD}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'BoilerAD',val:e.target.value}))}
            ></input>
          </td>
          <td rowSpan={3} className='border-4 row-span-4 border-black'>
          <input type='number'
                 value={initalData.Cylinder}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'Cylinder',val:e.target.value}))}
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 value={initalData.BoilerBD}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'BoilerBD',val:e.target.value}))}
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 value={initalData.BoilerR}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'BoilerR',val:e.target.value}))}
            ></input>
          </td>
        </tr>

        <tr>
          <th  className='border-4 border-black py-3'>RO</th>
          <td className='border-4 border-black w-24'>
          <input type='number'
                 value={initalData.RoRh}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'RoRh',val:e.target.value}))}
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 value={initalData.RoCN}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'RoCN',val:e.target.value}))}
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='number'
                 value={initalData.RoSD}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'RoSD',val:e.target.value}))}
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='number'
                 value={initalData.RoAD}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'RoAD',val:e.target.value}))}
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 value={initalData.RoBD}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'RoBD',val:e.target.value}))}
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 value={initalData.RoR}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'RoR',val:e.target.value}))}
            ></input>
          </td>
        </tr>

        <tr>
          <th  className='border-4 border-black py-3'>ETP</th>
          <td className='border-4 border-black w-24'>
          <input type='number'
                 value={initalData.EtpRh}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'EtpRh',val:e.target.value}))}
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 value={initalData.EtpCN}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'EtpCN',val:e.target.value}))}
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='number'
                 value={initalData.EtpSD}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'EtpSD',val:e.target.value}))}
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='number'
                 value={initalData.EtpAD}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'EtpAD',val:e.target.value}))}
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 value={initalData.EtpBD}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'EtpBD',val:e.target.value}))}
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 value={initalData.EtpR}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'EtpR',val:e.target.value}))}
            ></input>
          </td>
        </tr>

        <tr>
          <th  className='border-4 border-black py-3'>Digital Generator</th>
          <td className='border-4 border-black w-24'>
          <input type='number'
                 value={initalData.DGRh}
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'DGRh',val:e.target.value}))}
            ></input>
          </td>
          <td colSpan={6} className='border-4 border-black'>
          <input type='number'
                 value={initalData.Diesel}
                 placeholder='Diesel: '
                 className='w-full bg-transparent'
                 onChange={ e => dispatch(setUtil({name:'Diesel',val:e.target.value}))}
            ></input>
          </td>
        </tr>
       
     </tbody>
    </table>
                    </div>

    </div>
  )
}

export default AllDataUtility
