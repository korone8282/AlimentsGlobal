import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { useSelector } from 'react-redux';
import { PRODUCT_URL, CATEGORIES_URL,  DATA_URL } from '../../redux/Utils/constants';
import { FiSearch } from "react-icons/fi";
import Loader from '../../components/Loader'
import { TbFilterCog } from "react-icons/tb";
import { CiWifiOff } from "react-icons/ci";
import {toast} from 'react-toastify';

const Left = () => {

    const [data, setData] = useState([]);
    const [openBox2, setopenBox2] = useState(0);
    const [loading2, setLoading2] = useState(0);
    const [error, setError] = useState(0);
    const [products, setproducts] = useState([]);
    const [ogData, setogData] = useState([]);
    const [dummy, setdummy] = useState();
    const [openBox, setopenBox] = useState(0);
    const [categories, setcategories] = useState([]); 
    const [info, setInfo] = useState({
       filling:"",
       dispatch:"",
       index:"",
       product:"",
       id:""
    });

    const {userinfo} = useSelector(state=>state.auth);

    useEffect(() => {

        async function getProducts(){
            try {
      
          const res = await apiConnector(`${PRODUCT_URL}/products`,"GET");
          setproducts(res.data.data);
          setogData(res.data.data);
          setdummy(res.data.data);
      
            } catch (error) {
              console.log(error);
            }
            }

    async function getCategories(){
            try {
          
          setError(0);
      
          const res = await apiConnector(`${CATEGORIES_URL}/categories`,"GET");
          setcategories(res.data.data);
      
            } catch (error) {
              setError(1)
              console.log(error);
            }
            }
        
      async function getData(){

  setLoading2(1);

    try {

      const res = await apiConnector(`${DATA_URL}/Left`,"GET",null,{Authorization: `Bearer ${userinfo.token}`});
      setData(res.data.data);
      setLoading2(0);

    } catch (error) {
      setLoading2(0);
      toast(error.response.data.message)
    }
  }
      
      getCategories();
      getProducts();
      getData();

      }, [userinfo.token]);

  function handleSearch(val) {

       if (val === ""){ 
         setproducts(dummy)
         return
         }

        let filterBySearch = ogData.filter((item) => {
            if (item.name.toLowerCase().startsWith(val.toLowerCase())){ 
              return item
             } else {
              return null 
             }
        })
        setogData(dummy)
        setproducts(filterBySearch); 
      }

const inputHandler = async(e) =>{
    setInfo((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  }

async function handleUpdate(){
  try {

    await apiConnector(`${DATA_URL}/Update/${info.id}`,"PUT",info,{Authorization: `Bearer ${userinfo.token}`});
    setopenBox2(!openBox2);
    setInfo({
       filling:"",
       dispatch:"",
       index:"",
       product:"",
       id:""
    })
    toast("Successfully Updated");
    window.location.reload();
  } catch (error) {
    toast(error.response.data.message)
  }

}

  return (
    <div className='relative'>
{
error ? (
    <div className='font-bold text-7xl mt-64 sm:max-lg:mt-4 flex items-center justify-center gap-4'>  
<div>Network Issue</div> 
<div className='mt-2'> <CiWifiOff /> </div> 
</div>
) : ( 
  <div>

<div className='flex items-center justify-center'>

<div className='flex select-none relative justify-center items-center text-xl font-semibold cursor-pointer h-16 w-[9.6rem] sm:max-lg:w-32 sm:max-lg:h-12 hover:bg-black hover:text-white rounded-xl bg-[#f59e0b]'
    onClick={()=>{
        setopenBox(!openBox)
        setproducts(dummy)}}>
    <div className='font-bold text-3xl p-3 sm:max-lg:text-xl'>Filter</div>
    <div className='pr-3 sm:max-lg:pr-1'><TbFilterCog size={32}/> </div>
</div>

<div className={` text-6xl mx-40 font-bold my-8 sm:max-lg:my-4 sm:max-lg:text-3xl sm:max-lg:text-center`}>Product</div>

<div className='flex justify-center sm:max-lg:mr-18 cursor-pointer'>
<input type='text'
       onChange={(e)=>handleSearch(e.target.value)}
       className=' relative w-80 sm:max-lg:w-52 rounded-l-lg h-10 bg-[#f59e0b] font-bold text-2xl focus:outline-none p-4'
/>
<i className='mr-2 bg-[#000000] h-10 w-11 rounded-r-lg'>
<FiSearch className='mt-1.5 ml-2 text-white' size={26}/>
</i>
</div> 

</div>
{/* end div */}


{/* table */}

{
  loading2 ? (
    <div className='mt-[30rem] sm:max-lg:mt-[15rem]'> <Loader/> </div>
  ) : (
    <table className='sm:max-lg:mx-12 text-center mx-auto text-black my-12 sm:max-lg:w-fit text-xl font-bold'>
<thead>
  <tr className='bg-[#f59e0b]'>
    <th rowSpan={2} className='border-4 border-black p-2'>Date</th>
    <td className='border-4 border-black font-bold'>Shift</td>
    <th rowSpan={2} className='border-4 border-black p-2'>Buyer Name</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Product Name</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Batch Code</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Pack Size</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Pouch Filled</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Pouch Packed</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Difference</th>
  </tr>
</thead>

{   
  data.length ? (<tbody>
      {
        data.filter( obj => obj.sectionMain === "Filling").map(val=>(
        val.dataList.filter( object => object.retortCycle !== object.pouchQuantity ).map((ele,i)=>(
          <tr key={i}>
          <td className='border-4 border-black font-bold'>{val.createdAt.substring(5,10)}</td>
          <td className='border-4 border-black font-bold'>{val.dayTime}</td>
          <td className='border-4 border-black font-bold'>{ele.buyerName}</td>
          <td className='border-4 border-black font-bold'>{ele.productName}</td>
          <td className='border-4 border-black font-bold'>{ele.batch}</td>
          <td className='border-4 border-black font-bold'>{ele.packSize }</td>
          <td className='border-4 border-black font-bold'>{ele.pouchQuantity }</td>
          <td onClick = {()=>{
             setInfo((prevData) => ({
                     ...prevData,
                     index:i,
                     id: val._id
                    }));
            setopenBox2(!openBox2)}}
              className='border-4 border-black font-bold hover:bg-slate-300'>{ele.retortCycle}</td>
          <td className='border-4 border-black font-bold'>{ele.pouchQuantity - ele.retortCycle}</td>
          </tr>
        ))
      ))
      }
     
      <tr className='text-center bg-[#f59e0b]'>  
      <td colSpan={6} className='border-4 border-black font-bold'>Total</td>
      <td className='border-4 border-black font-bold'>{data.filter( obj => obj.sectionMain === "Filling").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, object) => accumulator + object.pouchQuantity,0),0)}</td>
      <td className='border-4 border-black font-bold'>{data.filter( obj => obj.sectionMain === "Filling").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, object) => accumulator + object.retortCycle,0),0)}</td>
      <td className='border-4 border-black font-bold'>{(data.filter( obj => obj.sectionMain === "Filling").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, object) => accumulator + object.pouchQuantity,0),0) - data.filter( obj => obj.sectionMain === "Filling").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, object) => accumulator + object.retortCycle,0),0)).toFixed(2) }</td>
        </tr>

    </tbody>) : (<div className='font-bold text-6xl mt-12 sm:max-lg:text-xl'>No Entry Found</div>)
  }
        </table>
  )
}
        





{
    openBox ? (<div className={`absolute flex-col gap-3 bg-[#f59e0b] text-black text-sm font-bold h-fit sm:max-lg:left-[7.9rem] left-[23rem] max-w-60 top-[4.8rem] rounded-lg border-black border-2 p-2`}>
        {
            categories.map((val,ind)=>(
                <div className='flex items-center hover:bg-black hover:text-white rounded-md p-1'
                     key={ind}
                     name='product'
                     onClick={(e)=>{
                            let p = products.filter(item => item.buyer === val.name)
                            setproducts(p)
                            setopenBox(!openBox)}}>
                    ⦿ {val.name}
                </div>
           
            ))
        }
    </div>
    ) : null
}

{
            openBox2 ? (
      <div className="space-y-3 fixed top-[20rem] left-[33rem] bg-slate-300 p-5 [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] w-[30rem] rounded-lg sm:max-lg:left-[12rem] sm:max-lg:top-[12rem]">
       
      <div className='flex justify-between gap-3'>
  <label htmlFor="confirPassword" className='font-bold text-xl'>
     Filling Count :
  </label>
  <input type='number'
         id="confirmPassword" 
         name = "filling"
         onChange={ e => inputHandler(e) }
         className='bg-transparent border-2 border-[#f59e0b] p-1 placeholder-black'
               />
  </div>
  
<div className='flex justify-between gap-3'>
<label htmlFor="confirPassword" className='font-bold text-xl'>
     Dispatch Count : 
  </label>
  <input type='number'
         id="confirmPassword" 
         name = "dispatch"
         onChange={ e => inputHandler(e) }
         className='bg-transparent border-2 border-[#f59e0b] p-1 placeholder-black'
               />
</div>

        <div className="flex justify-center gap-24">
          <button className=" py-2 px-4 rounded-lg text-[#f59e0b] bg-black border-[#f59e0b] border-2 font-semibold hover:scale-105"
          onClick={()=>setopenBox2(!openBox2)}> 
            Cancel
          </button>
          
          <button
          type='submit'
          onClick={handleUpdate}
              className=" py-2 px-4 rounded-lg text-[#f59e0b] bg-black border-[#f59e0b] border-2 font-semibold hover:scale-105"
            >
              Update
            </button>
        </div>
      </div>

            ) : (
              null
            )
          }

</div>
)
}

</div>
  )
}

export default Left

