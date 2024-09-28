import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { useSelector } from 'react-redux';
import { PRODUCT_URL, CATEGORIES_URL,  DATA_URL } from '../../redux/Utils/constants';
import { FiSearch } from "react-icons/fi";
import Loader from '../../components/Loader'
import { TbFilterCog } from "react-icons/tb";
import { CiWifiOff } from "react-icons/ci";
import {toast} from 'react-toastify';

const ProductData = () => {

    const [arr, setarr] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(1);
    const [loading2, setLoading2] = useState(0);
    const [error, setError] = useState(0);
    const [products, setproducts] = useState([]);
    const [ogData, setogData] = useState([]);
    const [dummy, setdummy] = useState();
    const [openBox, setopenBox] = useState(0);
    const [categories, setcategories] = useState([]); 
    const [info, setInfo] = useState({
        start:"",
        end:"",
        product:""
    });

    const {userinfo} = useSelector(state=>state.auth);

    useEffect(() => {

        async function getProducts(){
            try {
      
          const res = await apiConnector(`${PRODUCT_URL}/products`,"GET");
          setproducts(res.data.data);
          setogData(res.data.data);
          setdummy(res.data.data);
      
          setLoading(0);
            } catch (error) {
              console.log(error);
            }
            }

    async function getCategories(){
            try {
          
          setError(0);
      
          const res = await apiConnector(`${CATEGORIES_URL}/categories`,"GET");
          setcategories(res.data.data);
      
          setLoading(0);
            } catch (error) {
              setError(1)
              console.log(error);
            }
            }
      
      getCategories();
      getProducts();

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

async function getData(){

  setLoading2(1)

  let array = []
  for (let q = new Date(info.start); q <= new Date(info.end); q = new Date(q.getTime() + 86400000)) {
    array.push(q.toISOString());
  }
  setarr(array)

    try {

      const res = await apiConnector(`${DATA_URL}/Product`,"PUT",info,{Authorization: `Bearer ${userinfo.token}`});
      setData(res.data.data);
      setLoading2(0);

    } catch (error) {
      setLoading2(0);
      toast(error.response.data.message)
    }
  }

  return (
    <div>
{
error ? (
    <div className='font-bold text-7xl mt-64 sm:max-lg:mt-4 flex items-center justify-center gap-4'>  
<div>Network Issue</div> 
<div className='mt-2'> <CiWifiOff /> </div> 
</div>
) : ( 
  <div>

<div className='flex justify-start'>

{/* table 1 */}
<div className='sm:max-lg:w-[26.5rem]'>

<div className={` text-6xl mx-40 font-bold my-8 sm:max-lg:my-4 sm:max-lg:text-3xl sm:max-lg:text-center`}>Product</div>

<div className='flex items-center mx-2 gap-32 sm:max-lg:gap-6'>

<div className='flex select-none relative justify-center items-center text-xl font-semibold cursor-pointer h-16 w-[9.6rem] sm:max-lg:w-32 sm:max-lg:h-12 hover:bg-black hover:text-white rounded-xl bg-[#f59e0b]'
    onClick={()=>{
        setopenBox(!openBox)
        setproducts(dummy)}}>
    <div className='font-bold text-3xl p-3 sm:max-lg:text-xl'>Filter</div>
    <div className='pr-3 sm:max-lg:pr-1'><TbFilterCog size={32}/> </div>
</div>

<div className={`flex justify-center sm:max-lg:mr-8 cursor-pointer ml-32}`}>
<input type='text'
       onChange={(e)=>handleSearch(e.target.value)}
       className=' relative w-80 sm:max-lg:w-52 rounded-l-lg h-10 bg-[#f59e0b] font-bold text-2xl focus:outline-none p-4'
/>
<i className='mr-2 bg-[#000000] h-10 w-11 rounded-r-lg'>
<FiSearch className='mt-1.5 ml-2 text-white' size={26}/>
</i>
</div>

</div>

{
loading ? (<Loader/> 
) : (
<table className='w-[43rem] mx-2 text-center text-black my-12 sm:max-lg:my-6 sm:max-lg:w-[25rem] text-xl font-bold'>
<thead>
  <tr className='bg-[#f59e0b]'>
    <th rowSpan={2} className='border-4 border-black p-2'>S no.</th>
    <th rowSpan={2} className='border-4 border-black'>Buyer</th>
    <th rowSpan={2} className='border-4 border-black'> Product Name</th>
  </tr>
</thead>

{   
  products.length ? (<tbody>
      {
        products.map((val,index)=>(
        <tr key={index} 
            className='text-center hover:bg-slate-400'
            name='product'
            onClick={(e)=>{
                setInfo((prevData) => ({
                ...prevData,
                product: val
    }));
            }}>
    <td className='border-4 border-black font-bold  px-4 p-2'>{index+1}</td>
    <td className='border-4 border-black font-bold max-w-28'>{val.buyer}</td>
    <td className='border-4 border-black font-bold max-w-28'>{val.name}</td>
        </tr>
      ))
      }
     
    </tbody>) : (<div className='font-bold text-6xl mt-12'>No Entry Found</div>)
  }
</table>
)
}

</div>


{/* table 2 */}
<div className='border-l-8 border-dashed border-black p-2 w-screen sm:max-lg:w-[32.5rem] overflow-x-hidden'>
         
         <div className='text-center font-bold text-6xl mt-6 sm:max-lg:my-4 sm:max-lg:text-3xl'> {info.product.name}</div>
         <div className='text-center font-bold text-2xl mt-3 sm:max-lg:my-4 sm:max-lg:text-xl'> ({info.product.buyer}) </div>

<div className='flex justify-center items-center my-8 sm:max-lg:my-2 text-2xl font-bold gap-14 mx-4 sm:max-lg:mx-1 h-16 w-full sm:max-lg:gap-4 '>
        <div className='flex sm:max-lg:flex-col'>
        <label>Start: </label>
            <input type='date'
                   name='start'
                   className='w-44'
                   onChange={ e => inputHandler(e) }
            />
        </div>
        <div className='flex sm:max-lg:flex-col'>
        <label>End: </label>
            <input type='date'
                   className='w-44'
                   name='end'
                   onChange={ e => inputHandler(e) }
            />
        </div>
        <div className='text-xl select-none ml-10 sm:max-lg:ml-0 font-bold h-16 w-[9.6rem] sm:max-lg:w-32 text-center hover:bg-black hover:text-white rounded-xl -mt-2 sm:max-lg:mt-3 pt-4 bg-[#f59e0b]' 
             onClick={()=>{
              setarr([])
              getData()}}
             >Submit</div>
    </div>

{
  loading2 ? (
    <Loader/>
  ) : (
    <table className='mx-auto text-center bg-red-200 text-black my-12 sm:max-lg:w-fit text-xl font-bold'>
<thead>
  <tr className='bg-[#f59e0b]'>
    <th rowSpan={2} className='border-4 border-black p-2'>Date</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Produced</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Pouch Filled</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Pouch Packed</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Pouch Wasted</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Box</th>
  </tr>
</thead>

{   
  data.length ? (<tbody>
      {
        arr.map((val,index)=>(
        <tr key={index} className='text-center'>
    <td className='border-4 border-black font-bold p-0.5'>{val?.substring(5,10)}</td>
    <td className='border-4 border-black font-bold max-w-28'>{data.filter(item=>item.createdAt === val).reduce((acc,obj)=> acc+obj.dataList.filter(object => object.productName === info.product.name).reduce( (accumulator, obj) => accumulator + (obj.yield*obj.batchQuantity) ,0),0).toFixed(2)}</td>
    <td className='border-4 border-black font-bold max-w-28'>{data.filter(item=>item.createdAt === val).reduce((acc,obj)=> acc+obj.dataList.filter(object => object.productName === info.product.name).reduce( (accumulator, obj) => accumulator + obj.pouchQuantity,0),0)}</td>
    <td className='border-4 border-black font-bold max-w-28'>{data.filter(item=>item.createdAt === val).reduce((acc,obj)=> acc+obj.dataList.filter(object => object.productName === info.product.name).reduce( (accumulator, obj) => accumulator + obj.pouchPacked,0),0)}</td>
    <td className='border-4 border-black font-bold max-w-28'>{ 
      data.filter(item=>item.createdAt === val).reduce((acc,obj)=> acc+obj.dataList.filter(object => object.productName === info.product.name).reduce( (accumulator, obj) => accumulator + obj.empty,0),0) +
      data.filter(item=>item.createdAt === val).reduce((acc,obj)=> acc+obj.dataList.filter(object => object.productName === info.product.name).reduce( (accumulator, obj) => accumulator + obj.leaked,0),0) +
      data.filter(item=>item.createdAt === val).reduce((acc,obj)=> acc+obj.dataList.filter(object => object.productName === info.product.name).reduce( (accumulator, obj) => accumulator + obj.foreignMatter,0),0)
    }</td>
    <td className='border-4 border-black font-bold max-w-28'>{ data.filter(item=>item.createdAt === val).reduce((acc,obj)=> acc+obj.dataList.filter(object => object.productName === info.product.name).reduce( (accumulator, obj) => accumulator + obj.box,0),0)}</td>
        </tr>
      ))
      }
     
      <tr className='text-center bg-[#f59e0b]'>
    <td className='border-4 border-black font-bold p-0.5'>Total</td>
    <td className='border-4 border-black font-bold max-w-28'>{data.reduce((acc,obj)=> acc+obj.dataList.filter(object => object.productName === info.product.name).reduce( (accumulator, obj) => accumulator + (obj.yield*obj.batchQuantity) ,0),0).toFixed(2)}</td>
    <td className='border-4 border-black font-bold max-w-28'>{data.reduce((acc,obj)=> acc+obj.dataList.filter(object => object.productName === info.product.name).reduce( (accumulator, obj) => accumulator + obj.pouchQuantity,0),0)}</td>
    <td className='border-4 border-black font-bold max-w-28'>{data.reduce((acc,obj)=> acc+obj.dataList.filter(object => object.productName === info.product.name).reduce( (accumulator, obj) => accumulator + obj.pouchPacked,0),0)}</td>
    <td className='border-4 border-black font-bold max-w-28'>{ 
      data.reduce((acc,obj)=> acc+obj.dataList.filter(object => object.productName === info.product.name).reduce( (accumulator, obj) => accumulator + obj.empty,0),0) +
      data.reduce((acc,obj)=> acc+obj.dataList.filter(object => object.productName === info.product.name).reduce( (accumulator, obj) => accumulator + obj.leaked,0),0) +
      data.reduce((acc,obj)=> acc+obj.dataList.filter(object => object.productName === info.product.name).reduce( (accumulator, obj) => accumulator + obj.foreignMatter,0),0)
    }</td>
    <td className='border-4 border-black font-bold max-w-28'>{ data.reduce((acc,obj)=> acc+obj.dataList.filter(object => object.productName === info.product.name).reduce( (accumulator, obj) => accumulator + obj.box,0),0)}</td>
        </tr>

    </tbody>) : (<div className='font-bold text-6xl mt-12 sm:max-lg:text-xl'>No Entry Found</div>)
  }
        </table>
  )
}
        
</div>


</div>

{
    openBox ? (<div className={`absolute flex-col gap-3 bg-[#f59e0b] text-black text-sm font-bold h-fit sm:max-lg:left-[6.5rem] left-[9rem] max-w-60 top-[11.8rem] rounded-lg border-black border-2 p-2`}>
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

</div>
)
}

</div>
  )
}

export default ProductData

