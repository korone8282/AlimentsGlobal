import React, {useState, useEffect} from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { PRODUCT_URL, CATEGORIES_URL,DISPATCH_URL } from '../../redux/Utils/constants';
import Loader from '../../components/Loader'
import { TbFilterCog } from "react-icons/tb";
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';

const PackedReport = () => {

    const [loading, setLoading] = useState(0);
    const [data, setData] = useState([]);
    const [openBox, setopenBox] = useState(0);
    const [error, setError] = useState(0);
    const [products, setproducts] = useState([]);
    const [products2, setproducts2] = useState([]);
    const [categories, setcategories] = useState([]); 
    const [item, setitem] = useState();
    const [obj, setobj] = useState();

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

  setLoading(1);

    try {

      const res = await apiConnector(`${DISPATCH_URL}/packReport`,"GET",null,{Authorization: `Bearer ${userinfo.token}`});
      setData(res.data.data);
      setLoading(0);

    } catch (error) {
      setLoading(0);
      toast(error.response.data.message)
    }
  }
      
      getCategories();
      getProducts();
      getData();

      }, [userinfo.token]);

    const [info, setInfo] = useState({
        start:"",
        end:"",
    }); 

async function getReport(){
        try {
          setError(0);
          const res = await apiConnector(`${DISPATCH_URL}/packDateReport`,"PUT",info,{Authorization: `Bearer ${userinfo.token}`});
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
    <div className='flex gap-6 sm:max-lg:gap-0'>

    <div className='bg-[#f59e0b] h-full w-52 sm:max-lg:text-sm sm:max-lg:w-40 flex justify-start flex-col font-bold text-lg  rounded-b-lg sm:max-lg:mb-3'>
        <div className='text-center text-2xl bg-[#000000] text-white p-1 border-solid border-[#f59e0b] border-t-4 sm:max-lg:text-lg'> Buyer</div>
        <div> {
            categories.map((val,ind)=>(
                <div className={`flex items-center ${val === obj ? "bg-black text-white" : null} hover:bg-black hover:text-white rounded-md p-1`}
                     key={ind}
                     name='obj'
                     onClick={()=>{
                        let p = products.filter(item => item.buyer === val.name)
                            setproducts2(p)
                            setitem("")
                            setobj(val.name)}}>
                    ⦿ {val.name}
                </div>
           
            ))
        }
        </div>
    </div>

    <div>
    <div className='flex justify-center my-8 text-2xl mx-2 font-bold gap-24 sm:max-lg:gap-4 sm:max-lg:mx-2'>

    <div className='flex select-none relative justify-center items-center text-xl cursor-pointer h-16 w-[9.6rem] sm:max-lg:w-32 sm:max-lg:h-12 hover:bg-black hover:text-white rounded-xl bg-[#f59e0b]'
    onClick={()=>setopenBox(!openBox)}>
    <div className='text-3xl p-3 sm:max-lg:text-xl'>Filter</div>
    <div className='pr-3 sm:max-lg:pr-1'><TbFilterCog size={32}/> </div>
         </div>

        <div>
        <label>Start: </label>
            <input type='date'
                   name='start'
                   className='sm:max-lg:max-w-48'
                   onChange={ e => inputHandler(e) }
            />
        </div>
        <div>
        <label>End: </label>
            <input type='date'
                   name='end'
                   className='sm:max-lg:max-w-48'
                   onChange={ e => inputHandler(e) }
            />
        </div>
        <div className='text-xl select-none font-semibold h-16 w-[9.6rem] text-center hover:bg-black hover:text-white rounded-xl -mt-2 sm:max-lg:mt-0.5 pt-4 bg-[#f59e0b]' 
             onClick={getReport}
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

<div>
  {
    !obj && !item ? (
      <div className='sm:max-lg:mx-3'>
<table className='w-[80rem] mx-auto text-center text-black my-12 sm:max-lg:w-fit'>
<thead>
  <tr>
    <th rowSpan={2} className='border-4 border-black'>Date</th>
    <th rowSpan={2} className='border-4 border-black'>Buyer Name</th>
    <th rowSpan={2} className='border-4 border-black'>Product Name</th>
    <th rowSpan={2} className='border-4 border-black'>Batch</th>
    <th rowSpan={2} className='border-4 border-black'>Pack Size</th>
    <th rowSpan={2} className='border-4 border-black'>Pouch Packed</th>
    <th rowSpan={2} className='border-4 border-black'>Box</th>
  </tr>
</thead>

{   
  data.length ? (<tbody>
      {
        data.map((val,index)=>(
        <tr key={index} className='text-center'>
    <td className='border-4 border-black font-bold '>{val.lDate?.substring(0,10)}</td>
    <td className='border-4 border-black font-bold '>{val.buyerName}</td>
    <td className='border-4 border-black font-bold '>{val.productName}</td>
    <td className='border-4 border-black font-bold '>{val.batch}</td>
    <td className='border-4 border-black font-bold '>{val.packSize}</td>
    <td className='border-4 border-black font-bold '>{val.pouchPacked}</td>
    <td className='border-4 border-black font-bold '>{val.box}</td>
        </tr>
      ))
      }
     
      <tr className='text-center bg-teal-400'>
    <td colSpan={5} className='border-4 border-black font-bold  px-4 p-2'>Total : </td>
    <td className='border-4 border-black font-bold '>{ data.reduce((acc,obj)=>  acc + obj.pouchPacked,0)}</td>
    <td className='border-4 border-black font-bold '>{ data.reduce((acc,obj)=>  acc + obj.box,0)}</td>
        </tr>

    </tbody>) : (<div className='font-bold text-3xl mt-12'>No Data Entry Found</div>)
  }
</table>
</div>
    ) : (
      <div>
<table className='w-[80rem] mx-auto text-center text-black my-12 sm:max-lg:w-fit'>
<thead>
  <tr>
    <th rowSpan={2} className='border-4 border-black'>Date</th>
    <th rowSpan={2} className='border-4 border-black'>Buyer Name</th>
    <th rowSpan={2} className='border-4 border-black'>Product Name</th>
    <th rowSpan={2} className='border-4 border-black'>Batch</th>
    <th rowSpan={2} className='border-4 border-black'>Pack Size</th>
    <th rowSpan={2} className='border-4 border-black'>Pouch Packed</th>
    <th rowSpan={2} className='border-4 border-black'>Box</th>
  </tr>
</thead>

{   
  data.length ? (<tbody>
      {
        data.filter(xterm=> item ? (xterm.productName === item) : (xterm.buyerName === obj)).map((val,index)=>(
        <tr key={index} className='text-center'>
    <td className='border-4 border-black font-bold '>{val.lDate?.substring(0,10)}</td>
    <td className='border-4 border-black font-bold '>{val.buyerName}</td>
    <td className='border-4 border-black font-bold '>{val.productName}</td>
    <td className='border-4 border-black font-bold '>{val.batch}</td>
    <td className='border-4 border-black font-bold '>{val.packSize}</td>
    <td className='border-4 border-black font-bold '>{val.pouchPacked}</td>
    <td className='border-4 border-black font-bold '>{val.box}</td>
        </tr>
      ))
      }
     
      <tr className='text-center bg-teal-400'>
    <td colSpan={5} className='border-4 border-black font-bold  px-4 p-2'>Total : </td>
    <td className='border-4 border-black font-bold '>{ data.filter(xterm=> item ? (xterm.productName === item) : (xterm.buyerName === obj)).reduce((acc,obj)=>  acc + obj.pouchPacked,0)}</td>
    <td className='border-4 border-black font-bold '>{ data.filter(xterm=> item ? (xterm.productName === item) : (xterm.buyerName === obj)).reduce((acc,obj)=>  acc + obj.box,0)}</td>
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

{
    openBox && obj ? (<div className={`absolute flex-col gap-3 bg-[#f59e0b] text-black text-sm font-bold h-fit sm:max-lg:top-[7.9rem] sm:max-lg:left-[9.9rem] left-[24rem] max-w-60 top-[9rem] rounded-lg border-black border-2 p-2`}>
        {
            products2.map((val,ind)=>(
                <div className='flex items-center hover:bg-black hover:text-white rounded-md p-1'
                     key={ind}
                     name='product'
                     onClick={()=>{
                            setitem(val.name)
                            setopenBox(0)}}>
                    ⦿ {val.name}
                </div>
           
            ))
        }
    </div>
    ) : null
}

    </div>
    

    </div>
  )
}

export default PackedReport
