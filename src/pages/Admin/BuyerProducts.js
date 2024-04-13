import React, {useState, useEffect} from 'react'
import Loader from '../../components/Loader';
import { apiConnector } from '../../redux/Utils/apiConnector';
import { useSelector } from 'react-redux';
import { CATEGORIES_URL  } from '../../redux/Utils/constants';
import { DATA_URL } from '../../redux/Utils/constants';

const BuyerProducts = () => {

    const sectionData = [];

    const [loading, setLoading] = useState(0);
    const [error, setError] = useState(0);
    const [data, setData] = useState([]);
    const [categories, setcategories] = useState([]);
    const [info, setInfo] = useState({
        start:"2024-04-01",
        end:"2024-04-07",
        buyer:"",
    });

    const {userinfo} = useSelector(state => state.auth);

      async function getData(){
        try {

          const res = await apiConnector(`${DATA_URL}/List`,"PUT",info,{Authorization: `Bearer ${userinfo.token}`});

          setData(res.data.data);
                
          data.forEach(e=>{
           sectionData.push( e.dataList.filter( buyer => buyer.buyerName === info.buyer) );
          });

        setLoading(0);

        } catch (e) {
          setError(1);
          console.log(e);
        }
      }
   
    useEffect(() => {

        async function getCategories(){
          try {
    
        const res = await apiConnector(`${CATEGORIES_URL}/categories`,"GET");
        setcategories(res.data.data);
    
        setLoading(0);
          } catch (e) {
            console.log(e)
          }
          }
    
        getCategories();

      }, []);

    const inputHandler = async(e) =>{
        setInfo((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value
        }));
      }
   console.log("hi",sectionData);
  return (
    <div>
    
    <div className='flex justify-center my-8 text-2xl font-bold gap-24'>
        <div>
        <select
                 name='buyer'
                 className='w-50 bg-transparent'
                 onChange={ e => inputHandler(e) }
            >
            <option className=' bg-[#f59e0b]'>Select</option>
            {
                categories.map((val,index)=>(<option className=' bg-[#f59e0b]' value={val.name} key={index}>{val.name}</option>))
            }
            </select>
        </div>
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
        <button onClick={getData}>submit</button>
    </div>

     {
       error ? (<div className='text-center font-bold text-7xl mt-64'>No Data Entry Found</div>
       ) : (
         <div>
    {
     loading ? ( <Loader/>
     ) : (
       <div>
       {/* <table className='w-[80rem] mx-auto text-center bg-[#f59e0b] text-black '>
       <thead>
         <tr>
           <th rowSpan={2} className='border-4 border-black p-1'>S no.</th>
           <th rowSpan={2} className='border-4 border-black p-8'>Date</th>
           <th rowSpan={2} className='border-4 border-black p-8'>Product Name</th>
           <th rowSpan={2} className='border-4 border-black p-6'>Batch No.</th>
           <th rowSpan={2} className='border-4 border-black p-4'>Batch Size (kg)</th>
           <th rowSpan={2} className='border-4 border-black p-1'>No. Of Batches</th>
           <th rowSpan={2} className='border-4 border-black p-4'>Avg Yield (kg)</th>
           <th rowSpan={2} className='border-4 border-black p-4'>No. Of Pouch Packed</th>
           <th rowSpan={2} className='border-4 border-black p-4'>No. Of Pouch Rejected(Filling)</th>
           <th rowSpan={2} className='border-4 border-black p-4'>Retort Cycles</th>
           <th rowSpan={2} className='border-4 border-black p-4'>No. Of Unit Rejected</th>
           <th rowSpan={2} className='border-4 border-black p-1'>Leakage/Others</th>
           <th rowSpan={2} className='border-4 border-black p-1'>No. Of Box Packed</th>
           <th rowSpan={2} className='border-4 border-black p-1'>Remarks</th>
         </tr>
       </thead>
 
       { 
           sectionData.length ? (<tbody>
             {
               sectionData[0].dataList.map((val,index)=>(
               <tr key={index}>
           <td className='border-4 border-black font-bold  px-4 p-2'>{index+1}</td>
           <td className='border-4 border-black font-bold '>{val.buyerName}</td>
           <td className='border-4 border-black font-bold '>{val.productName}</td>
           <td className='border-4 border-black font-bold '>{val.batch}</td>
           <td className='border-4 border-black font-bold '>{val.pouchPacked}</td>
           <td className='border-4 border-black font-bold '>{val.leaked}</td>
           <td className='border-4 border-black font-bold '>{val.bloated}</td>
           <td className='border-4 border-black font-bold '>{val.foreignMatter}</td>
           <td className='border-4 border-black font-bold '>{val.other}</td>
           <td className='border-4 border-black font-bold '>{val.workersQuantity}</td>
           <td className='border-4 border-black font-bold '>{val.avgCost}</td>
               </tr>
             ))
             }
           </tbody>) : (<div className='font-bold text-3xl mt-12'>No Data Entry Found</div>)
          
         }
                     </table> */}
     </div>)
    }
    
    </div>
          )
     }
    
   </div>
  )
}

export default BuyerProducts
