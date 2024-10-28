import React, {useState, useEffect} from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { toast } from 'react-toastify';
import { CATEGORIES_URL, PRODUCT_URL, EXPORT_URL } from '../../redux/Utils/constants';
import { FaSquareCheck } from "react-icons/fa6";
import { FaTrash} from "react-icons/fa";
import { useSelector } from 'react-redux';

const Exports = () => {

  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]); 
  const [info, setInfo] = useState({
    buyerName:"",
    productName:"",
    pouch:"",
    packSize:"",
  });
  const [name, setName] = useState("C1");
  const [yo, setyo] = useState("");
  const [arr, setarr] = useState([]);
  
  const {userinfo} = useSelector(state=>state.auth)

  console.log(yo)
  useEffect(() => {

    async function getCategories(){
      try {
       const res = await apiConnector(`${CATEGORIES_URL}/categories`,"GET");
       setcategories(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function getProducts(){
      try {

    const res = await apiConnector(`${PRODUCT_URL}/products`,"GET");
    setproducts(res.data.data);

      } catch (error) {
        console.log(error);
      }
      }

    getCategories();
    getProducts();

  }, []);

const inputHandler = async(e) =>{
        setInfo((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value
        }));
      }

  const submitHandler = async() =>{

    
    const toastId = toast.loading("Loading...",{
      position: 'top-center',
    }); 

   try {

    await apiConnector(`${EXPORT_URL}/${name}`,"POST",arr,{Authorization: `Bearer ${userinfo.token}`});

    toast.dismiss(toastId);
    toast("Successfully Submited");
    
    window.location.reload();
   } catch (error) {
    toast.dismiss(toastId);
    toast(error.response.data.message)
   }
  }
console.log(arr.length)
  const rowDataHandler = () =>{
    
   arr.push(info)
    setarr(arr);

    setInfo({
        buyerName:"",
        productName:"",
        pouch:"",
        packSize:"",
  });

  }

  return (
    <div>
      <div className='sm:max-lg:mx-1'>

    <div className='flex justify-center my-12 text-3xl font-bold gap-2'>
      <label htmlFor='main'>Container Name :  </label>
          <input type='name'
                 id='main'
                 className='border-2 border-black'
                 onChange={ e => setName(e.target.value) }
            ></input>

<div className='text-xl select-none font-semibold sm:max-lg:mx-10 mx-32 h-16 w-[9.6rem] text-center hover:bg-black hover:text-white rounded-xl -mt-2 sm:max-lg:mt-0.5 pt-4 bg-[#f59e0b]' 
             onClick={submitHandler}
             >Submit</div>
    </div>

    <table className='w-[60rem] mx-auto my-12 sm:max-lg:w-fit'>
      <thead>
        <tr>
          <th rowSpan={2} className='border-4 border-black p-2 sm:max-lg:p-0.5'>S no.</th>
          <th rowSpan={2} className='border-4 border-black p-2 sm:max-lg:p-0.5'>Buyer Name</th>
          <th rowSpan={2} className='border-4 border-black p-2 sm:max-lg:p-0.5'>Product Name</th>
          <th rowSpan={2} className='border-4 border-black p-2 sm:max-lg:p-0.5'>Pouch Size (kg)</th>
          <th rowSpan={2} className='border-4 border-black p-2 sm:max-lg:p-0.5'>No. Of Pouches</th>
          <th rowSpan={2} className='border-4 border-black p-2 sm:max-lg:p-0.5'>Remarks</th>
          <th rowSpan={2} className='border-4 border-black p-2 sm:max-lg:p-0.5'>Delete</th>
        </tr>
      </thead>

      <tbody>
      {
          arr?.map((val,index)=>(
              <tr key={index}>
          <td className='border-4 border-black px-4 p-2'>{index+1}</td>
          <td className='border-4 border-black'>{val.buyerName}</td>
          <td className='border-4 border-black'>{val.productName}</td>
          <td className='border-4 border-black'>{val.packSize}</td>
          <td className='border-4 border-black'>{val.pouch}</td>
          <td className='border-4 border-black pl-9 hover:bg-slate-300 sm:max-lg:px-7'><FaSquareCheck color='green'/></td>
          <td className='border-4 border-black pl-8 sm:max-lg:px-5 hover:bg-red-500'
              onClick={()=>{
                arr.splice(index,1);
                setarr(arr)
                setyo(index)}}><FaTrash/></td>
              </tr>
            ))
        }
      
        

      <tr className='text-center'>

          <td className='border-4 border-black'>-</td>
          <td className='border-4 border-black'>
          <select
                 name='buyerName'
                 value={info.buyerName}
                 onChange={ e => inputHandler(e)}
            >
            <option selected={1} className=' bg-[#f59e0b]'>Select Buyer</option>
            {
                categories.map((val,index)=>(<option className=' bg-[#f59e0b]' value={`${val.name}`} key={index}>{val.name}</option>))
            }
            </select>
          </td>
          <td className='border-4 border-black'>
          <select
                 name='productName'
                 value={info.productName}
                 onChange={ e => inputHandler(e) }
            >
            <option selected={true} className=' bg-[#f59e0b]'>Select Product</option>
            {
                products?.filter((product) => product.buyer === info.buyerName).map((val,index)=>(<option className=' bg-[#f59e0b] px-2' value={val.name} key={index}>{val.name}</option>))
            }
            </select>
          </td>
          <td className='border-4 border-black'>
          <input type='number'
                 name='packSize'
                 value={info.packSize}
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='number'
                 name='pouch'
                 value={info.pouch}
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black pl-9 sm:max-lg:px-7 hover:bg-green-200'
              onClick={rowDataHandler}><FaSquareCheck color='red' className='hover:text-black'/></td>
          <td className='border-4 border-black px-8 sm:max-lg:px-4'>-</td>
        
      </tr>

      </tbody>
                    </table>

            </div>
    </div>
  )
}

export default Exports
