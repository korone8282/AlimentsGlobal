import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { useSelector } from 'react-redux';
import { PRODUCT_URL, CATEGORIES_URL,  DATA_URL ,DISPATCH_URL } from '../../redux/Utils/constants';
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom';
import { TbFilterCog } from "react-icons/tb";
import { CiWifiOff } from "react-icons/ci";
import {toast} from 'react-toastify';

const Left = () => {

    const [data, setData] = useState([]);
    const [openBox2, setopenBox2] = useState(0);
    const [loading2, setLoading2] = useState(0);
    const [products2, setproducts2] = useState([]);
    const [item, setitem] = useState();
    const [obj, setobj] = useState();
    const [error, setError] = useState(0);
    const [products, setproducts] = useState([]);
    const [openBox, setopenBox] = useState(0);
    const [categories, setcategories] = useState([]); 
    const [openBox3, setopenBox3] = useState();
    const [info, setInfo] = useState({
      filling:"",
      i:"",
      product:"",
      id:"",
      packed:"",
      box:"",
      issue:"",
      count:"",
      element:"",
    });

    const {userinfo} = useSelector(state=>state.auth);

    useEffect(() => {

        async function getProducts(){
            try {
      
          const res = await apiConnector(`${PRODUCT_URL}/products`,"GET");
          setproducts(res.data.data);
      
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

const inputHandler = async(e) =>{
    setInfo((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  }

async function handleUpdate(){
  try {

    await apiConnector(`${DISPATCH_URL}/Update/${info.id}`,"PUT",info,{Authorization: `Bearer ${userinfo.token}`});
    setopenBox2(!openBox2);
    setInfo({
      filling:"",
      i:"",
      product:"",
      id:"",
      packed:"",
      box:"",
      issue:"",
      count:"",
      element:"",
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

<div className='flex items-center justify-center mx-4'>

<div className='flex gap-20 sm:max-lg:gap-8'>
<div className='flex select-none relative justify-center items-center text-xl font-semibold cursor-pointer h-16 w-[9.6rem] sm:max-lg:w-32 sm:max-lg:h-12 hover:bg-black hover:text-white rounded-xl bg-[#f59e0b]'
    onClick={()=>setopenBox(!openBox)}>
    <div className='font-bold text-3xl p-3 sm:max-lg:text-xl'>Filter</div>
    <div className='pr-3 sm:max-lg:pr-1'><TbFilterCog size={32}/> </div>
</div>


<div className='flex select-none relative justify-center items-center text-xl font-semibold cursor-pointer h-16 w-[9.6rem] sm:max-lg:w-32 sm:max-lg:h-12 hover:bg-black hover:text-white rounded-xl bg-[#f59e0b]'
    onClick={()=>setopenBox3(!openBox3)}>
    <div className='font-bold text-3xl p-3 sm:max-lg:text-xl'>Filter</div>
    <div className='pr-3 sm:max-lg:pr-1'><TbFilterCog size={32}/> </div>
</div>
</div>

<div className={` text-6xl mx-40 sm:max-lg:mx-8 font-bold my-8 sm:max-lg:my-4 sm:max-lg:text-3xl sm:max-lg:text-center`}>Product</div> 

<Link 
      to="Packed-Report"
      className='mt-4 h-14 text-[#f59e0b] bg-black border-[#f59e0b] text-center py-2.5 border-2 w-48 rounded-md hover:scale-105 text-xl font-semibold'>Packed
        
      </Link>

</div>
{/* end div */}


{/* table */}

{
  loading2 ? (
    <div className='absolute top-[20rem] left-[50rem] sm:max-lg:left-[25rem] sm:max-lg:top-[10rem]'> <Loader/> </div>
  ) : (
    <div>
      {
        !obj && !item ? (
          <table className='sm:max-lg:mx-2 text-center mx-auto text-black my-12 sm:max-lg:w-fit text-xl font-bold'>
<thead>
  <tr className='bg-[#f59e0b]'>
    <th rowSpan={2} className='border-4 border-black p-2'>Date</th>
    <td rowSpan={2} className='border-4 border-black p-2'>Shift</td>
    <th rowSpan={2} className='border-4 border-black p-2'>Buyer Name</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Product Name</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Batch Code</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Pack Size</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Pouch (Retort)</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Incubation (In)</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Pouch Packed</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Box</th>
  </tr>
</thead>

{   
  data.length ? (<tbody>
      {
        data.filter( obj => obj.sectionMain === "Filling").map(val=>(
        val.dataList.filter( object => object.retortCycle !== object.pouchQuantity ).map((ele,i)=>(
          <tr key={i}
              className='hover:bg-slate-300'
              onClick = {()=>{
              setInfo((prevData) => ({
                     ...prevData,
                     i:i,
                     id: val._id,
                     count:ele.pouchQuantity,
                     element:ele,
                    }));
            setopenBox2(!openBox2)}}>
          <td className='border-4 border-black font-bold p-2'>{val.createdAt.substring(5,10).split('-').reverse().join('-')}</td>
          <td className='border-4 border-black font-bold sm:max-lg:hidden p-2'>{val.dayTime}</td>
          <td className='border-4 border-black font-bold'>{ele.buyerName}</td>
          <td className='border-4 border-black font-bold'>{ele.productName}</td>
          <td className='border-4 border-black font-bold'>{ele.batch}</td>
          <td className='border-4 border-black font-bold sm:max-lg:hidden'>{ele.packSize }</td>
          <td className='border-4 border-black font-bold'>{ele.pouchQuantity }</td>
          <td className='border-4 border-black font-bold'>{ele.pouchQuantity - (ele.pouchPerCycle ? ele.pouchPerCycle : 0)}</td>
          <td className='border-4 border-black font-bold'>{ele.pouchPerCycle }</td>
          <td className='border-4 border-black font-bold'>{ele.retortCycle}</td>
          </tr>
        ))
      ))
      }
     
      <tr className='text-center bg-[#f59e0b]'>  
      <td colSpan='4' className='border-4 border-black font-bold'>Total</td>
      <td className='border-4 border-black font-bold sm:max-lg:hidden'>-</td>
      <td className='border-4 border-black font-bold sm:max-lg:hidden'>-</td>
      <td className='border-4 border-black font-bold'>{data.filter( obj => obj.sectionMain === "Filling").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, object) => accumulator + object.pouchQuantity,0),0)}</td>
      <td className='border-4 border-black font-bold'>{(data.filter( obj => obj.sectionMain === "Filling").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, object) => accumulator + (object.pouchQuantity || 0),0),0) - data.filter( obj => obj.sectionMain === "Filling").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, object) => accumulator + (object.pouchPerCycle || 0),0),0)).toFixed(2)}</td>
      <td className='border-4 border-black font-bold'>{data.filter( obj => obj.sectionMain === "Filling").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, object) => accumulator + (object.pouchPerCycle || 0),0),0)}</td>
      <td className='border-4 border-black font-bold'>{data.filter( obj => obj.sectionMain === "Filling").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, object) => accumulator + (object.retortCycle || 0),0),0)}</td>

        </tr>

    </tbody>) : (<div className='font-bold text-6xl mt-12 sm:max-lg:text-xl'>No Entry Found</div>)
  }
        </table>
        ) : (
          <table className='sm:max-lg:mx-2 text-center mx-auto text-black my-12 sm:max-lg:w-fit text-xl font-bold'>
<thead>
<tr className='bg-[#f59e0b]'>
    <th rowSpan={2} className='border-4 border-black p-4'>Date</th>
    <td rowSpan={2} className='border-4 border-black p-4'>Shift</td>
    <th rowSpan={2} className='border-4 border-black p-4'>Buyer Name</th>
    <th rowSpan={2} className='border-4 border-black p-4'>Product Name</th>
    <th rowSpan={2} className='border-4 border-black p-4'>Batch Code</th>
    <th rowSpan={2} className='border-4 border-black p-4'>Pack Size</th>
    <th rowSpan={2} className='border-4 border-black p-4'>Pouch (Retort)</th>
    <th rowSpan={2} className='border-4 border-black p-4'>Incubation (In)</th>
    <th rowSpan={2} className='border-4 border-black p-4'>Pouch Packed</th>
    <th rowSpan={2} className='border-4 border-black p-4'>Box</th>
  </tr>
</thead>

{   
  data.length ? (<tbody>
      {
        data.filter( obj => obj.sectionMain === "Filling").map(val=>(
        val.dataList.filter( object => object.retortCycle !== object.pouchQuantity && item ? (object.productName === item) : (object.buyerName === obj) ).map((ele,i)=>(
          <tr key={i}
              className='hover:bg-slate-300'
              onClick = {()=>{
              setInfo((prevData) => ({
                     ...prevData,
                     i:i,
                     id: val._id,
                     count:ele.pouchQuantity,
                     element:ele,
                    }));
            setopenBox2(!openBox2)}}>
          <td className='border-4 border-black font-bold'>{val.createdAt.substring(5,10).split('-').reverse().join('-')}</td>
          <td className='border-4 border-black font-bold sm:max-lg:hidden'>{val.dayTime}</td>
          <td className='border-4 border-black font-bold'>{ele.buyerName}</td>
          <td className='border-4 border-black font-bold'>{ele.productName}</td>
          <td className='border-4 border-black font-bold'>{ele.batch}</td>
          <td className='border-4 border-black font-bold sm:max-lg:hidden'>{ele.packSize }</td>
          <td className='border-4 border-black font-bold'>{ele.pouchQuantity }</td>
          <td className='border-4 border-black font-bold'>{ele.pouchQuantity - (ele.pouchPerCycle ? ele.pouchPerCycle : 0)}</td>
          <td className='border-4 border-black font-bold'>{ele.pouchPerCycle }</td>
          <td className='border-4 border-black font-bold'>{ele.retortCycle}</td>
          </tr>
        ))
      ))
      }
     
      <tr className='text-center bg-[#f59e0b]'>  
      <td colSpan='6' className='border-4 border-black font-bold'>Total</td>
      <td className='border-4 border-black font-bold'>{data.filter( obj => obj.sectionMain === "Filling").reduce((acc,o)=> acc+o.dataList.filter(xterm=> item ? (xterm.productName === item) : (xterm.buyerName === obj)).reduce( (accumulator, object) => accumulator + object.pouchQuantity,0),0)}</td>
      <td className='border-4 border-black font-bold'>{(data.filter( obj => obj.sectionMain === "Filling").reduce((acc,o)=> acc+o.dataList.filter(xterm=> item ? (xterm.productName === item) : (xterm.buyerName === obj)).reduce( (accumulator, object) => accumulator + (object.pouchQuantity || 0),0),0) - data.filter( obj => obj.sectionMain === "Filling").reduce((acc,o)=> acc+o.dataList.filter(xterm=> item ? (xterm.productName === item) : (xterm.buyerName === obj)).reduce( (accumulator, object) => accumulator + (object.pouchPerCycle || 0),0),0)).toFixed(2)}</td>
      <td className='border-4 border-black font-bold'>{data.filter( obj => obj.sectionMain === "Filling").reduce((acc,o)=> acc+o.dataList.filter(xterm=> item ? (xterm.productName === item) : (xterm.buyerName === obj)).reduce( (accumulator, object) => accumulator + (object.pouchPerCycle || 0),0),0)}</td>
      <td className='border-4 border-black font-bold'>{data.filter( obj => obj.sectionMain === "Filling").reduce((acc,o)=> acc+o.dataList.filter(xterm=> item ? (xterm.productName === item) : (xterm.buyerName === obj)).reduce( (accumulator, object) => accumulator + (object.retortCycle || 0),0),0)}</td>
        </tr>

    </tbody>) : (<div className='font-bold text-6xl mt-12 sm:max-lg:text-xl'>No Entry Found</div>)
  }
        </table>
        )
      }
    </div>
  )
}
        





{
    openBox ? (<div className={`absolute flex-col gap-3 bg-[#f59e0b] text-black text-sm font-bold h-fit sm:max-lg:left-[6.9rem] sm:max-lg:top-[3rem] left-[12rem] max-w-60 top-[5rem] rounded-lg border-black border-2 p-2`}>
        {
          categories.map((val,ind)=>(
                <div className={`flex items-center ${val === obj ? "bg-black text-white" : null} hover:bg-black hover:text-white rounded-md p-1`}
                     key={ind}
                     name='obj'
                     onClick={()=>{
                        let p = products.filter(item => item.buyer === val.name)
                            setproducts2(p)
                            setobj(val.name)
                            setitem("")
                            setopenBox(0)}}>
                    ⦿ {val.name}
                </div>
           
            ))
        }
    </div>
    ) : null
}

{
            openBox2 ? (
      <div className="space-y-3 fixed top-[18rem] left-[33rem] bg-slate-300 p-5 [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] w-[30rem] rounded-lg sm:max-lg:left-[13.5rem] sm:max-lg:top-[2.5rem]">
       
      <div className='flex justify-between gap-3'>
  <label htmlFor="confirPassword" className='font-bold text-xl'>
     Filling Count :
  </label>
  <input type='number'
         id="confirmPassword" 
         name = "filling"
         placeholder={info.count}
         onChange={ e => inputHandler(e) }
         className='bg-transparent border-2 border-[#f59e0b] p-1 placeholder-black'
               />
  </div>

<div className='flex justify-between gap-3'>
<label htmlFor="confirPassword" className='font-bold text-xl'>
     Packed Count : 
  </label>
  <input type='number'
         id="confirmPassword" 
         name = "packed"
         onChange={ e => inputHandler(e) }
         className='bg-transparent border-2 border-[#f59e0b] p-1 placeholder-black'
               />
</div>

<div className='flex justify-between gap-3'>
<label htmlFor="confirPassword" className='font-bold text-xl'>
    Box : 
  </label>
  <input type='number'
         id="confirmPassword" 
         name = "box"
         onChange={ e => inputHandler(e) }
         className='bg-transparent border-2 border-[#f59e0b] p-1 placeholder-black'
               />
</div>

<div className='flex justify-between sm:max-lg:items-center'>
<label htmlFor="Datex" className='font-bold text-xl'>
      Issue Date
</label>
<input type='date' 
       id="Datex" 
       name="issue" 
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

{
    openBox3 ? (<div className={`absolute flex-col gap-3 bg-[#f59e0b] text-black text-sm font-bold h-fit sm:max-lg:left-[17.9rem] sm:max-lg:top-[2.9rem] left-[26.5rem] max-w-60 top-[5.2rem] rounded-lg border-black border-2 p-2`}>
        {
          products2.map((val,ind)=>(
                <div className='flex items-center hover:bg-black hover:text-white rounded-md p-1'
                     key={ind}
                     name='product'
                     onClick={()=>{
                            setitem(val.name)
                            setopenBox3(0)}}>
                    ⦿ {val.name}
                </div>
           
            ))
        }
    </div>
    ) : null
}

</div>
)
}

</div>
  )
}

export default Left

