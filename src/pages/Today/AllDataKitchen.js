import React, {useState, useEffect} from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { toast } from 'react-toastify';
import { DATA_URL, CATEGORIES_URL, PRODUCT_URL } from '../../redux/Utils/constants';
import { setData, deleteData, emptyData } from '../../redux/Slices/localSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSquareCheck } from "react-icons/fa6";
import { FaTrash} from "react-icons/fa";
import { MdLightMode,MdModeNight } from "react-icons/md";
import { setDate} from '../../redux/Slices/dateSlice';

const AllDataKitchen = () => {

  const sections = ["Dispatch","Kitchen","Filling","Retort"];

  const [products, setproducts] = useState([]);
  const [buyer, setbuyer] = useState("");

  const [mode, setMode] = useState(0);
  const dayArray = ["Day","Night"];

  const section = useLocation();

  const date = useSelector(state=>state.data);

  const currentSection = section.pathname.split("/")[2].split("-")[2];

  const val = 1;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categories, setcategories] = useState([]); 

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

  const initalData = useSelector(state=>state.local);

  const [formData, setformData] = useState({
    section:"",
    batch:"",
    buyer:"",
    buyerName:"",
    productName:"",
    batchQuantity:"",
    batchSize:"",
    yield:"",
    yieldLoss:"",
    workersQuantity:"",
    retortCycle:"",
    pouchPerCycle:"",
    empty:"",
    filled:"",
    pouchPacked:"",
    box:"",
    packSize:"",
    pouchQuantity:"",
    pouchLoss:"",
    leaked:"",
    foreignMatter:"",
  });

  const {userinfo} = useSelector(state=>state.auth);

  const submitHandler = async() =>{

    const toastId = toast.loading("Loading...",{
      position: 'top-center',
    });
    
   try {

    await apiConnector(`${DATA_URL}/Kitchen_${date.date}/${dayArray[+mode]}`,"POST",initalData[val],{Authorization: `Bearer ${userinfo.token}`});

    dispatch(emptyData(val));

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

    formData.section = currentSection;
    formData.buyer = formData.buyerName.split("-")[0];
    formData.buyerName = formData.buyerName.split("-")[1];
    
    dispatch(setData({formData,val}));
    
    setformData((prevData) => ({
      ...prevData,
    buyer:"",
    buyerName:"",
    productName:"",
    batch:"",
    batchQuantity:"",
    batchSize:"",
    yield:"",
    yieldLoss:"",
    retortCycle:"",
    pouchPerCycle:"",
    empty:"",
    filled:"",
    pouchPacked:"",
    box:"",
    packSize:"",
    pouchQuantity:"",
    pouchLoss:"",
    leaked:"",
    foreignMatter:"",
}));

  }

  function deleteRow(index){
    dispatch(deleteData({val,index}));  
  }

  return (
    <div>
      <div className='my-8 rounded-xl w-full h-12 flex justify-around items-center'>

      <select 
      name="section"
      className='text-xl font-semibold bg-transparent bg-[#f59e0b] rounded-xl hover:text-white p-3 hover:bg-black'
      onChange={e=> navigate(`/admin/Create-Data-${e.target.value}`)}>
      <option className='bg-[#f59e0b]'>Select Section</option>
        {
          sections.map((val,index)=>(
            <option key={index} className=' bg-[#f59e0b] text-black font-semibold'>{val}</option>
          ))
        }
      </select>

      <div  onClick={()=>setMode(!mode)}>
    {
      !mode ? (
        <MdLightMode color='black' size={36}/>
      ) : (
        <MdModeNight  size={36}/>
      )
    }
        </div>

      <button className='text-xl font-semibold h-16 w-[9.6rem] text-center bg-[#f59e0b] rounded-xl hover:text-white hover:bg-black'
              onClick={submitHandler}>
            Submit
      </button>

      </div>

      <h2 className='text-center text-2xl font-bold my-8'>DataSheet for : <input type='date' value={date.date} onChange={(e)=>dispatch(setDate(e.target.value))}></input> </h2>
        
         <div className='sm:max-lg:mx-1'>
            <table className='w-[80rem] mx-auto my-12 sm:max-lg:w-fit'>
      <thead>
        <tr>
          <th rowSpan={2} className='border-4 border-black p-2 sm:max-lg:p-0.5'>S no.</th>
          <th rowSpan={2} className='border-4 border-black p-2 sm:max-lg:p-0.5'>Buyer Name</th>
          <th rowSpan={2} className='border-4 border-black p-2 sm:max-lg:p-0.5'>Product Name</th>
          <th rowSpan={2} className='border-4 border-black p-2 sm:max-lg:p-0.5'>No. of Batch</th>
          <th rowSpan={2} className='border-4 border-black p-2 sm:max-lg:p-0.5'>Yield (kg)</th>
          <th rowSpan={2} className='border-4 border-black p-2 sm:max-lg:p-0.5'>No. of Workers</th>
          <th rowSpan={2} className='border-4 border-black p-2 sm:max-lg:p-0.5'>Remarks</th>
          <th rowSpan={2} className='border-4 border-black p-2 sm:max-lg:p-0.5'>Delete</th>
        </tr>
      </thead>

      <tbody>
      {
          initalData[1].map((val,index)=>(
              <tr key={index}>
          <td className='border-4 border-black px-4 p-2'>{index+1}</td>
          <td className='border-4 border-black'>{val.buyerName}</td>
          <td className='border-4 border-black'>{val.productName}</td>
          <td className='border-4 border-black'>{val.batchQuantity}</td>
          <td className='border-4 border-black'>{val.yield}</td>
          <td className='border-4 border-black'>{val.workersQuantity}</td>
          <td className='border-4 border-black px-8 hover:bg-slate-300'><FaSquareCheck color='green'/></td>
          <td className='border-4 border-black px-8 sm:max-lg:px-6 hover:bg-red-500'
              onClick={()=>deleteRow(index)}><FaTrash/></td>
              </tr>
            ))
        }
      
        

      <tr className='text-center'>

          <td className='border-4 border-black'>-</td>
          <td className='border-4 border-black'>
          <select
                 name='buyerName'
                 className='w-24 bg-transparent'
                 value={formData.buyerName}
                 onChange={ e =>{
                   inputHandler(e) 
                   setbuyer(e.target.value.split("-")[1])
                   }}
            >
            <option selected={1} className=' bg-[#f59e0b]'>Select Buyer</option>
            {
                categories.map((val,index)=>(<option className=' bg-[#f59e0b]' value={`${val._id}-${val.name}`} key={index}>{val.name}</option>))
            }
            </select>
          </td>
          <td className='border-4 border-black'>
          <select
                 name='productName'
                 className='w-24 bg-transparent'
                 value={formData.productName}
                 onChange={ e => inputHandler(e) }
            >
            <option selected={true} className=' bg-[#f59e0b]'>Select Product</option>
            {
                products?.filter((product) => product.buyer === buyer).map((val,index)=>(<option className=' bg-[#f59e0b] px-2' value={val.name} key={index}>{val.name}</option>))
            }
            </select>
          </td>
          <td className='border-4 border-black'>
          <input type='number'
                 name='batchQuantity'
                 value={formData.batchQuantity}
                 className='w-40 sm:max-lg:w-16 bg-transparent'
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='number'
                 value={formData.yield}
                 name='yield'
                 className='w-32 sm:max-lg:w-16 bg-transparent'
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='number'
                 name='workersQuantity'
                 value={formData.workersQuantity}
                 className='w-32 sm:max-lg:w-16 bg-transparent'
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black px-8 hover:bg-green-200'
              onClick={rowDataHandler}><FaSquareCheck color='red' className='hover:text-black'/></td>
          <td className='border-4 border-black px-8 sm:max-lg:px-6'>-</td>
        
      </tr>

      </tbody>
    </table>
            </div>

    </div>
  )
}

export default AllDataKitchen