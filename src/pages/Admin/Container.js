import React, {useState, useEffect} from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector';
import {  EXPORT_URL } from '../../redux/Utils/constants';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader'
import { toast } from 'react-toastify';

const Container = () => {

  const {userinfo} = useSelector(state => state.auth);

  const exportId = useLocation().pathname.split("/")[3];
  const navigate = useNavigate();

  const [loading, setLoading] = useState(1);
  const [error, setError] = useState(0);
  const [arr, setArr] = useState([]);
  const [array, setArray] = useState([]);

  useEffect(() => {
        
    async function getData(){
        try {
        setError(0);
        setLoading(1);
        
        const res = await apiConnector(`${EXPORT_URL}/${exportId}`,"GET",null,{Authorization: `Bearer ${userinfo.token}`});
        setArr(res.data.data);

        setLoading(0);
        

        } catch (e) {
          setError(1);
          console.log(e);
        }
      }

      getData();
}, [userinfo.token,exportId]);

async function getInfo(){
  try {
  setError(0);
  setLoading(1);
  
  const res = await apiConnector(`${EXPORT_URL}/read`,"PUT",info,{Authorization: `Bearer ${userinfo.token}`});
  setArray(res.data.data);

  setLoading(0);

  } catch (e) {
    setError(1);
    console.log(e);
  }
}

  const [info, setInfo] = useState({
    start:"",
    end:"",
});

async function deleteExport(){
  try {
  setError(0);
  setLoading(1);
  
  await apiConnector(`${EXPORT_URL}/${exportId}`,"DELETE",null,{Authorization: `Bearer ${userinfo.token}`});
  toast("Deleted Successfully")
  navigate("/admin/Container-List");

  } catch (e) {
    setError(1);
    console.log(e);
  }
}

const inputHandler = async(e) =>{
        setInfo((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value
        }));
      }


  return (
    <div>
      
      <div className='flex justify-center my-8 text-2xl font-bold gap-24 sm:max-lg:gap-10 sm:max-lg:mx-4'>

      <div className='text-xl select-none font-semibold h-16 w-[9.6rem] text-center hover:bg-red-900 rounded-xl -mt-2 sm:max-lg:mt-0.5 pt-4 bg-[#f59e0b]' 
             onClick={deleteExport}
             >Delete</div> 

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
             onClick={getInfo}
             >Submit</div>
    </div>

    <div>
      {
        error ? ( <div className='text-center font-bold text-7xl mt-64 text-[#f59e0b]'>No Data Entry Found</div>
        ):(
          <div>
            {
              loading ? ( <Loader/>
               ):(
                <table className='w-fit mx-auto text-center text-black my-12 sm:max-lg:w-fit sm:max-lg:mx-3'>
       <thead>
         <tr className='bg-[#f59e0b]'>
           <th rowSpan={2} className='border-4 border-black p-1'>S no.</th>
           <th rowSpan={2} className='border-4 border-black p-4'>Buyer Name</th>
           <th rowSpan={2} className='border-4 border-black p-4'>Product Name</th>
           <th rowSpan={2} className='border-4 border-black p-4'>Pack Size (Kg)</th>
           <th rowSpan={2} className='border-4 border-black p-4'>Pouch Goal</th>
           <th rowSpan={2} className='border-4 border-black p-4'>Production (kg)</th>
           <th rowSpan={2} className='border-4 border-black p-4'>No. Of Pouch Filled</th>
           <th rowSpan={2} className='border-4 border-black p-4'>No. Of Pouch Packed</th>
           <th rowSpan={2} className='border-4 border-black p-1'>Remaining</th>
         </tr>
       </thead>


<tbody>
  {
    arr?.list.map((val,ind)=>(
      <tr key={ind} className={`${val.pouch - (array.filter( product => product.sectionMain === "Filling").reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.productName === val.productName && item.buyerName === val.buyerName && item.packSize === val.packSize).reduce( (accumulator, object) => accumulator + object.pouchQuantity,0),0)) >0 ? "bg-red-400" : "bg-green-300" }`}>
      <td className='border-4 border-black font-bold'> {ind+1} </td>
      <td className='border-4 border-black font-bold p-3'> {val.buyerName} </td>
      <td className='border-4 border-black font-bold p-3'> {val.productName} </td>
      <td className='border-4 border-black font-bold'> {val.packSize} </td>
      <td className='border-4 border-black font-bold'> {val.pouch} </td>
      <td className='border-4 border-black font-bold'> {(array.filter( product => product.sectionMain === "Kitchen").reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.productName === val.productName && item.buyerName === val.buyerName).reduce( (accumulator, object) => accumulator + (object.yield*object.batchQuantity),0),0)).toFixed(2)} </td>
      <td className='border-4 border-black font-bold'> {array.filter( product => product.sectionMain === "Filling").reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.productName === val.productName && item.buyerName === val.buyerName && item.packSize === val.packSize).reduce( (accumulator, object) => accumulator + object.pouchQuantity,0),0)} </td>
      <td className='border-4 border-black font-bold'> {array.filter( product => product.sectionMain === "Dispatch").reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.productName === val.productName && item.buyerName === val.buyerName && item.packSize === val.packSize).reduce( (accumulator, object) => accumulator + object.pouchPacked,0),0)} </td>
      <td className='border-4 border-black font-bold'> { val.pouch - (array.filter( product => product.sectionMain === "Filling").reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.productName === val.productName && item.buyerName === val.buyerName && item.packSize === val.packSize).reduce( (accumulator, object) => accumulator + object.pouchQuantity,0),0))} </td>
     
      </tr>
    ))
  }
</tbody>


                     </table>
              )
            }
          </div>
        )
      }
    </div>

    </div>
  )
}

export default Container
