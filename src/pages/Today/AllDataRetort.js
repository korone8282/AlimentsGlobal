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

const AllDataRetort = () => {

  const sections = ["Dispatch","Kitchen","Filling","Retort"];

  const [mode, setMode] = useState(0);
  const dayArray = ["Day","Night"];

  const section = useLocation();

  const currentSection = section.pathname.split("/")[2].split("-")[2];

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

    getCategories();
  }, []);

  const val = 3;

  const initalData = useSelector(state=>state.local);
  
  const date = new Date();

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
  materialLoss:"",
  pouchLoss:"",
  leaked:"",
  bloated:"",
  foreignMatter:"",
  other:""
  });
  
  const {userinfo} = useSelector(state=>state.auth);

  const submitHandler = async() =>{

    const toastId = toast.loading("Loading...",{
      position: 'top-center',
    });

   try {

    await apiConnector(`${DATA_URL}/Retort/${dayArray[+mode]}`,"POST",initalData[val],{Authorization: `Bearer ${userinfo.token}`});

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

    formData.section = currentSection
    formData.buyer = formData.buyerName.split("-")[0];
    formData.buyerName = formData.buyerName.split("-")[1];
    
    dispatch(setData({formData,val}));
    
    setformData((prevData) => ({
      ...prevData,
    batch:"",
    productName:"",
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
    materialLoss:"",
    pouchLoss:"",
    leaked:"",
    bloated:"",
    foreignMatter:"",
    other:""
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
      className='text-xl font-semibold bg-transparent rounded-xl p-3 bg-[#f59e0b] hover:text-white hover:bg-black'
      onChange={e=> navigate(`/user/Create-Data-${e.target.value}`)}>
      <option className='bg-[#f59e0b]'>Select Section</option>
        {
          sections.map((val,index)=>(
            <option key={index} className=' bg-[#f59e0b] font-semibold'>{val}</option>
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
          <th rowSpan={2} className='border-4 border-black p-2'>Buyer Name</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Product Name</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Batch No.</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Pouch Size (kg)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Retort Cycle</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Pouch/cycle</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. of Workers</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Remarks</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Delete</th>
        </tr>
      </thead>

      <tbody>
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

      </tbody>
    </table>
                    </div>

    </div>
  )
}

export default AllDataRetort