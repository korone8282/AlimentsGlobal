import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { useSelector } from 'react-redux';
import { PRODUCT_URL, CATEGORIES_URL,  DATA_URL  } from '../../redux/Utils/constants';
import Loader from '../../components/Loader'
import { TbFilterCog } from "react-icons/tb";
import { CiWifiOff } from "react-icons/ci";
import {toast} from 'react-toastify';
import { FiSearch } from "react-icons/fi";

const Left = () => {

    const [data, setData] = useState([]);

    const [info, setInfo] = useState({
      start:"",
      end:"",
  });

    const [loading2, setLoading2] = useState(0);
    const [search, setsearch] = useState("");
    const [products2, setproducts2] = useState([]);
    const [ogData, setogData] = useState([]);
    const [dummy, setdummy] = useState();
    const [item, setitem] = useState();
    const [obj, setobj] = useState();
    const [error, setError] = useState(0);
    const [products, setproducts] = useState([]);
    const [openBox, setopenBox] = useState(0);
    const [categories, setcategories] = useState([]); 
    const [openBox3, setopenBox3] = useState();

    const inputHandler = async(e) =>{
      setInfo((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value
      }));
    }

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
      setogData(res.data.data);
      setdummy(res.data.data);
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
          setData(dummy)
          return
          }

         setsearch(val);

         let filterBySearch = ogData.filter((item) => { 
          return item.sectionMain === "Dispatch" && item.dataList.filter((object) => {
                return object.batch.toLowerCase().startsWith(val.toLowerCase())
          }).length > 0
         })

         setogData(dummy)
         setData(filterBySearch); 
       }

 async function getDateData(){
        try {
        setError(0);
        setLoading2(1);
        
        const res = await apiConnector(`${DATA_URL}/DvN`,"PUT",info,{Authorization: `Bearer ${userinfo.token}`});

        setData(res.data.data);

        setLoading2(0);
        

        } catch (e) {
          setError(1);
          console.log(e);
        }
      }

  return (
    <div className='relative'>
{
error ? (
    <div className='font-bold text-7xl mt-64 sm:max-lg:mt-4 flex items-center h-10 justify-center gap-1'>  
<div>Network Issue</div> 
<div className='mt-2'> <CiWifiOff /> </div> 
</div>
) : ( 
  <div>

<div className='flex items-center justify-evenly gap-4 '>

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

<div className={` text-4xl  font-bold my-8 sm:max-lg:hidden`}>Product</div> 

<div className='flex gap-20 sm:max-lg:gap-8 '>

<div className='flex font-bold items-center gap-10 text-lg'>
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
             onClick={getDateData}
             >Submit</div>
</div>


</div>

</div>
{/* end div */}

<div className='flex justify-center'>
<input type='text'
       onChange={(e)=>handleSearch(e.target.value)}
       className=' relative w-80 rounded-l-lg h-10 bg-slate-300 focus:outline-none p-4'
/>
<i className='mr-2 bg-slate-500 h-10 w-11 rounded-r-lg'>
<FiSearch className='mt-1.5 ml-2 text-white' size={26}/>
</i>
</div>
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
  <tr className='bg-[#f59e0b] mx-auto'>
    <th rowSpan={2} className='border-4 border-black p-2'>Date</th>
    <td rowSpan={2} className='border-4 border-black p-2'>Shift</td>
    <th rowSpan={2} className='border-4 border-black p-2'>Buyer Name</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Product Name</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Batch Code</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Pack Size</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Pouch Packed</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Box</th>
  </tr>
</thead>

{   
  data.length ? (<tbody>
      {
        data.filter( obj => obj.sectionMain === "Dispatch").map(value=>(
        value.dataList.filter(object => object.batch.toLowerCase().startsWith(search.toLowerCase())).map((ele,i)=>(
          <tr key={i} className='hover:bg-slate-300'>
          <td className='border-4 border-black font-bold p-2'>{value.createdAt.substring(5,10).split('-').reverse().join('-')}</td>
          <td className='border-4 border-black font-bold p-2'>{value.dayTime}</td>
          <td className='border-4 border-black font-bold'>{ele.buyerName}</td>
          <td className='border-4 border-black font-bold'>{ele.productName}</td>
          <td className='border-4 border-black font-bold'>{ele.batch}</td>
          <td className='border-4 border-black font-bold'>{ele.packSize }</td>
          <td className='border-4 border-black font-bold'>{ele.pouchPacked }</td>
          <td className='border-4 border-black font-bold'>{ele.box}</td>
          </tr>
        ))
      ))
      }
     
      <tr className='text-center bg-[#f59e0b]'>  
      <td colSpan='4' className='border-4 border-black font-bold'>Total</td>
      <td className='border-4 border-black font-bold'>-</td>
      <td className='border-4 border-black font-bold'>-</td>
      <td className='border-4 border-black font-bold'>{data.filter( obj => obj.sectionMain === "Dispatch").reduce((acc,obj)=> acc+obj.dataList.filter(object => object.batch.toLowerCase().startsWith(search.toLowerCase())).reduce( (accumulator, object) => accumulator + (object.pouchPacked|| 0),0),0)}</td>
      <td className='border-4 border-black font-bold'>{data.filter( obj => obj.sectionMain === "Dispatch").reduce((acc,obj)=> acc+obj.dataList.filter(object => object.batch.toLowerCase().startsWith(search.toLowerCase())).reduce( (accumulator, object) => accumulator + (object.box || 0),0),0)}</td>

        </tr>

    </tbody>) : (<div className='font-bold text-6xl mt-12 sm:max-lg:text-xl'>No Entry Found</div>)
  }
        </table>
        ) : (
          <table className='sm:max-lg:mx-2 text-center mx-auto text-black my-12 sm:max-lg:w-fit text-xl font-bold'>
<thead>
<tr className='bg-[#f59e0b]'>
    <th rowSpan={2} className='border-4 border-black p-2'>Date</th>
    <td rowSpan={2} className='border-4 border-black p-2'>Shift</td>
    <th rowSpan={2} className='border-4 border-black p-2'>Buyer Name</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Product Name</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Batch Code</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Pack Size</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Pouch Packed</th>
    <th rowSpan={2} className='border-4 border-black p-2'>Box</th>
  </tr>
</thead>

{   
  data.length ? (<tbody>
      {
        data.filter( obj => obj.sectionMain === "Dispatch").map(val=>(
          val.dataList.filter(object => object.batch.toLowerCase().startsWith(search.toLowerCase())).map((ele,i)=>(
          <tr key={i} className='hover:bg-slate-300'>
          <td className='border-4 border-black font-bold p-2'>{val.createdAt.substring(5,10).split('-').reverse().join('-')}</td>
          <td className='border-4 border-black font-bold p-2'>{val.dayTime}</td>
          <td className='border-4 border-black font-bold'>{ele.buyerName}</td>
          <td className='border-4 border-black font-bold'>{ele.productName}</td>
          <td className='border-4 border-black font-bold'>{ele.batch}</td>
          <td className='border-4 border-black font-bold'>{ele.packSize }</td>
          <td className='border-4 border-black font-bold'>{ele.pouchPacked }</td>
          <td className='border-4 border-black font-bold'>{ele.box}</td>
          </tr>
        ))
      ))
      }
     
      <tr className='text-center bg-[#f59e0b]'>  
      <td colSpan='4' className='border-4 border-black font-bold'>Total</td>
      <td className='border-4 border-black font-bold'>-</td>
      <td className='border-4 border-black font-bold'>-</td>
      <td className='border-4 border-black font-bold'>{data.filter( obj => obj.sectionMain === "Dispatch").reduce((acc,obj)=> acc+obj.dataList.filter(object => object.batch.toLowerCase().startsWith(search.toLowerCase())).reduce( (accumulator, object) => accumulator + (object.pouchPacked|| 0),0),0)}</td>
      <td className='border-4 border-black font-bold'>{data.filter( obj => obj.sectionMain === "Dispatch").reduce((acc,obj)=> acc+obj.dataList.filter(object => object.batch.toLowerCase().startsWith(search.toLowerCase())).reduce( (accumulator, object) => accumulator + (object.box || 0),0),0)}</td>

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

