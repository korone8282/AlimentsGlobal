import React, {useState, useEffect} from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector';
import { toast } from 'react-toastify';
import { DATA_URL, CATEGORIES_URL } from '../../redux/Utils/constants';
import { setData, deleteData, emptyData } from '../../redux/Slices/localSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSquareCheck } from "react-icons/fa6";
import { FaTrash} from "react-icons/fa";

const AllDataDispatch = () => {

  const sections = ["Dispatch","Kitchen","Filling","Retort"];

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

  const val = 0;

  const initalData = useSelector(state=>state.local);
  
  const date = new Date();

  const [formData, setformData] = useState({
  section:"",
  buyer:"",
  buyerName:"",
  productName:"",
  batchQuantity:"",
  batchSize:"",
  yield:"",
  yieldLoss:"",
  workersQuantity:"",
  avgCost:"",
  retortCycle:"",
  pouchPerCycle:"",
  empty:"",
  filled:"",
  pouchPacked:"",
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
   try {

    const toastId = toast.loading("Loading...",{
      position: 'top-center',
    });

    await apiConnector(`${DATA_URL}/Dispatch`,"POST",initalData[val],{Authorization: `Bearer ${userinfo.token}`});

    dispatch(emptyData(val));

    toast.dismiss(toastId);
    toast("Successfully Submited");
    
    navigate("/");
   } catch (error) {
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

  function calc(){
    const cost = (Number(formData.workersQuantity) * 500 ) 
    / ( Number(formData.pouchPacked) - ( Number(formData.leaked )+ Number(formData.bloated) + Number(formData.foreignMatter) + Number(formData.other) ) ) ;
    return cost.toFixed(3);
  }
  const rowDataHandler = () =>{

    formData.section = currentSection;
    formData.avgCost = calc();
    formData.buyer = formData.buyerName.split("-")[0];
    formData.buyerName = formData.buyerName.split("-")[1];
    
    dispatch(setData({formData,val}));
    
    setformData({
      section:"",
      buyer:"",
      buyerName:"",
      productName:"",
      batchQuantity:"",
      batchSize:"",
      yield:"",
      yieldLoss:"",
      workersQuantity:"",
      avgCost:"",
      retortCycle:"",
      pouchPerCycle:"",
      empty:"",
      filled:"",
      pouchPacked:"",
      pouchQuantity:"",
      materialLoss:"",
      pouchLoss:"",
      leaked:"",
      bloated:"",
      foreignMatter:"",
      other:""
  });
  }

  function deleteRow(index){
    dispatch(deleteData({val,index}));  
  }

  return (
    <div>
      <div className='my-8 rounded-xl w-full h-12 flex justify-around items-center'>

      <select 
      name="section"
      className='text-xl font-semibold bg-transparent border-4 rounded-md p-3 border-[#2e1065] hover:bg-gradient-to-r from-[#1e1b4b] to-[#2e1065]'
      onChange={e=> navigate(`/user/Create-Data-${e.target.value}`)}>
      <option className='bg-[#2e1065] '>Select Section</option>
        {
          sections.map((val,index)=>(
            <option key={index} className=' bg-[#2e1065]'>{val}</option>
          ))
        }
      </select>

      <button className='text-xl font-semibold h-16 w-[9.6rem] text-center border-4 rounded-md border-[#2e1065] hover:bg-gradient-to-r from-[#1e1b4b] to-[#2e1065]'
              onClick={submitHandler}>
            Submit
      </button>

      </div>

         <h2 className='text-center text-2xl font-bold my-8'>DataSheet for : {date.toLocaleDateString()}</h2>

            <div>
                    <table className='w-[80rem] mx-auto'>
      <thead>
        <tr>
          <th rowSpan={2} className='border-4 border-black p-2'>S no.</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Buyer Name</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Product Name</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Pouch Packed</th>
          <th colSpan={4} className='border-4 border-black p-2'>No. Of Pouch Rejected</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. of Workers</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Cost/Pouch</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Remarks</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Delete</th>
        </tr>
        <tr>
          <th className='border-4 border-black p-1'>Leaked</th>
          <th className='border-4 border-black p-1'>Bloated</th>
          <th className='border-4 border-black p-1'>X-Ray</th>
          <th className='border-4 border-black p-1'>Others</th>
        </tr>
      </thead>

      <tbody>
      {
          initalData[0].map((val,index)=>(
              <tr key={index}>
          <td className='border-4 border-black px-4 p-2'>{index+1}</td>
          <td className='border-4 border-black'>{val.buyerName}</td>
          <td className='border-4 border-black'>{val.productName}</td>
          <td className='border-4 border-black'>{val.pouchPacked}</td>
          <td className='border-4 border-black'>{val.leaked}</td>
          <td className='border-4 border-black'>{val.bloated}</td>
          <td className='border-4 border-black'>{val.foreignMatter}</td>
          <td className='border-4 border-black'>{val.other}</td>
          <td className='border-4 border-black'>{val.workersQuantity}</td>
          <td className='border-4 border-black'>{val.avgCost}</td>
          <td className='border-4 border-black px-8 hover:bg-slate-300'><FaSquareCheck color='green'/></td>
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
                 className='w-24 bg-transparent'
                 onChange={ e => inputHandler(e) }
            >
            <option className=' bg-[#2e1065]'>Select Buyer</option>
            {
                categories.map((val,index)=>(<option className=' bg-[#2e1065]' value={`${val._id}-${val.name}`} key={index}>{val.name}</option>))
            }
            </select>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 name='productName'
                 value={formData.productName}
                 className='w-32 bg-transparent'
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 name='pouchPacked'
                 value={formData.pouchPacked}
                 className='w-40 bg-transparent'
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 value={formData.leaked}
                 name='leaked'
                 className='w-24 bg-transparent'
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 value={formData.bloated}
                 name='bloated'
                 className='w-24 bg-transparent'
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 value={formData.foreignMatter}
                 name='foreignMatter'
                 className='w-24 bg-transparent'
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 name='other'
                 value={formData.other}
                 className='w-24 bg-transparent'
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black'>
          <input type='text'
                 name='workersQuantity'
                 value={formData.workersQuantity}
                 className='w-32 bg-transparent'
                 onChange={ e => inputHandler(e) }
            ></input>
          </td>
          <td className='border-4 border-black'></td>
          <td className='border-4 border-black px-8 hover:bg-green-200'
              onClick={rowDataHandler}><FaSquareCheck color='red' className='hover:text-black'/></td>
          <td className='border-4 border-black px-8'>-</td>
        
      </tr>

      </tbody>
                    </table>

            </div>
    </div>
  )
}

export default AllDataDispatch