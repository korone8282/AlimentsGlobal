import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { STORE_URL } from '../../redux/Utils/constants';
import { useSelector } from 'react-redux';
import { LuClipboardEdit } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import {toast} from 'react-toastify';
import Loader from '../../components/Loader'

const Inventory = () => {

    const [data, setData] = useState([]);
    const [ogData, setogData] = useState([]);
    const [dummy, setdummy] = useState();
    const [openBox, setopenBox] = useState(0);
    const [loading, setLoading] = useState(1);
    const [error, setError] = useState(0);
    const [item, setItem] = useState();
    const [add, setadd] = useState(0);

    const [info, setInfo] = useState({
        pDate:"",
        name:"",
        stock:"",
        rate:"",
        lDate:"",
    });

    const {userinfo} = useSelector(state=>state.auth);

    useEffect(() => {
    
        async function getData(){
          try {
            setError(0);
            const res = await apiConnector(`${STORE_URL}`,"GET",null,{Authorization: `Bearer ${userinfo.token}`});
            setData(res.data.data);
            setogData(res.data.data);
            setdummy(res.data.data);
            setLoading(0);
          } catch (error) {
            setError(1);
            console.log(error);
          }
        }
    
      getData();
      }, [userinfo.token]);

async function handleDelete(){
        try {

          setLoading(1)
          await apiConnector(`${STORE_URL}/${item._id}`,"DELETE",null,{Authorization: `Bearer ${userinfo.token}`});
      
          toast("deleted successfully");
          setInfo({
            pDate:"",
            name:"",
            stock:"",
            rate:"",
            lDate:"",
        });
          setopenBox(0);
          setLoading(0);
          window.location.reload();
      
        } catch (error) {
          console.log(error);
          setLoading(0);
        }
      }
      
async function handleCreate(){
        try {
          setLoading(1)
          await apiConnector(`${STORE_URL}`,"POST",info,{Authorization: `Bearer ${userinfo.token}`});
      
          toast("created successfully");
          setInfo({
            pDate:"",
            name:"",
            stock:"",
            rate:"",
            lDate:"",
        });
          setopenBox(0);
          setLoading(0);
          window.location.reload();
          
        } catch (error) {
          console.log(error.message)
          setLoading(0);
          toast(error.response.data.message)
        }
      }
      
const handleUpdate = async() =>{
        try {
          setLoading(1)
          await apiConnector(`${STORE_URL}/${item._id}`,"POST",info,{Authorization: `Bearer ${userinfo.token}`});
      
          toast("updated successfully");
          setInfo({
            pDate:"",
            name:"",
            stock:"",
            rate:"",
            lDate:"",
        });
          setopenBox(0);
          setLoading(0);
          window.location.reload();
      
        } catch (error) {
          console.log(error);
          setLoading(0);
        }
      }

const inputHandler = async(e) =>{
        setInfo((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value
        }));
      }

  function handleSearch(val) {

       if (val === ""){ 
         setData(dummy)
         return
         }
         console.log(data)
        let filterBySearch = ogData.filter((item) => {
            if (item.name.toLowerCase().includes(val.toLowerCase())){ 
              return item
             } else {
              return null 
             }
        })
        setogData(dummy)
        setData(filterBySearch); 
      }

  return (
    <div >

<div className='flex justify-center items-center sm:max-lg:gap-16'>

<div className='text-5xl font-bold text-center my-8 ml-[30rem] sm:max-lg:ml-[16rem]'>Inventory</div>

<button 
      onClick={()=>{
        setadd(!add)
        setopenBox(!openBox)
        }}
      className='mt-4 h-10 text-[#f59e0b] bg-black border-[#f59e0b] ml-96 sm:max-lg:mx-10 border-2 w-48 rounded-md hover:scale-105 text-xl font-semibold'>Add</button>
</div>

{
error ? (<div className='text-center font-bold text-7xl mt-64 sm:max-lg:mt-4'>No Data Entry Found</div>
) : ( 
  <div>

<div className='flex justify-center mr-20 sm:max-lg:mr-8'>
<input type='text'
       onChange={(e)=>handleSearch(e.target.value)}
       className=' relative w-80 rounded-l-lg h-10 bg-slate-300 focus:outline-none p-4'
/>
<i className='mr-2 bg-slate-500 h-10 w-11 rounded-r-lg'>
<FiSearch className='mt-1.5 ml-2 text-white' size={26}/>
</i>
</div>


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
    <th rowSpan={2} className='border-4 border-black p-2'>Stock Count</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Rate / Part</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Last Issued </th>
    <th rowSpan={2} className='border-4 border-black p-2'>Update</th>
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
    <td className='border-4 border-black font-bold '>{val.stock}</td>
    <td className='border-4 border-black font-bold '>{val.rate}</td>
    <td className='border-4 border-black font-bold '>{val.lDate?.substring(0,10)}</td>
    <td className='border-4 border-black font-bold hover:bg-slate-400' 
        onClick={()=>{
          setopenBox(!openBox)
          setItem(val)
        }}>
        <LuClipboardEdit size={24} className='ml-[5rem] sm:max-lg:ml-[1.5rem]'/></td>
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

{
            openBox ? (
      <div className="fixed top-[9%] sm:max-lg:absolute z-10 flex left-[18%] sm:max-lg:left-6 sm:max-lg:top-20 h-[40rem] backdrop-blur-xl
    [ bg-gradient-to-b from-white/65 to-white/45 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] text-black w-[60rem] sm:max-lg:w-[50rem] rounded-lg">
              <section className='flex flex-col h-full w-full my-1 font-semibold text-3xl sm:max-lg:text-lg  gap-12 mx-9'>
              <div className='flex justify-between gap-16'>


</div>


<div className='flex justify-between sm:max-lg:items-center'>
<label htmlFor="Date">
      Purchase Date
</label>
<input type='date' 
       id="Date" 
       name="pDate" 
       onChange={ e => inputHandler(e) }
       className='bg-transparent border-2 border-[#f59e0b] p-1 placeholder-black'
       />
</div>


  <div className='flex justify-between'>
  <label htmlFor="pass" >
      Name :
  </label>
  <input type='text'
         id="pass" 
         name='name'
         onChange={ e => inputHandler(e) }
         className='bg-transparent border-2 border-[#f59e0b] p-1 placeholder-black'
               />
  </div>
  
  <div className='flex justify-between'>
  <label htmlFor="confirPassword" >
     Stock :
  </label>
  <input type='number'
         id="confirmPassword" 
         name = "stock"
         onChange={ e => inputHandler(e) }
         className='bg-transparent border-2 border-[#f59e0b] p-1 placeholder-black'
               />
  </div>
  
<div className='flex justify-between'>
<label htmlFor="confirPassword">
     Rate : 
  </label>
  <input type='number'
         id="confirmPassword" 
         name = "rate"
         onChange={ e => inputHandler(e) }
         className='bg-transparent border-2 border-[#f59e0b] p-1 placeholder-black'
               />
</div>

<div className='flex justify-between sm:max-lg:items-center'>
<label htmlFor="Datex">
      Issue Date
</label>
<input type='date' 
       id="Datex" 
       name="lDate" 
       onChange={ e => inputHandler(e) }
       className='bg-transparent border-2 border-[#f59e0b] p-1 placeholder-black'
       />
</div>

              {
                add ? (
                  <div className="flex justify-between gap-4 text-3xl py-2 mx-24">
          <button className="px-7 py-2.5 rounded-lg text-[#f59e0b] bg-black border-[#f59e0b] border-2 font-semibold hover:scale-105"
          onClick={()=>{
            setopenBox(!openBox)
            setadd(!add)
            setInfo({
            pDate:"",
            name:"",
            stock:"",
            rate:"",
            lDate:"",
        });
          }}> 
            Cancel
          </button>
          
          <button
          onClick={()=>{
            handleCreate()
            setopenBox(!openBox)
            setadd(!add)
          }}
          className="px-12 rounded-lg text-[#f59e0b] bg-black border-[#f59e0b] border-2 font-semibold hover:scale-105"
            >
              Add
            </button>

        </div>
                ) : (
                  <div className="flex justify-between gap-4 text-3xl py-2 mx-4">
          <button className="px-5 py-2.5 rounded-lg text-[#f59e0b] bg-black border-[#f59e0b] border-2 font-semibold hover:scale-105"
          onClick={()=>{
            setopenBox(!openBox)
            setInfo({
            pDate:"",
            name:"",
            stock:"",
            rate:"",
            lDate:"",
        });
            }}> 
            Cancel
          </button>
          
          <button
          onClick={handleUpdate}
          className="px-5 rounded-lg text-[#f59e0b] bg-black border-[#f59e0b] border-2 font-semibold hover:scale-105"
            >
              Update
            </button>

            <button
            onClick={handleDelete}
            className="px-5 rounded-lg text-[#f59e0b] bg-black border-[#f59e0b] border-2 font-semibold hover:scale-105"
            >
              Delete
            </button>

        </div>
                )
              }

       
        </section>
              </div>
            ) : (
              <div></div>
            )
          }

</div>
  )
}

export default Inventory
