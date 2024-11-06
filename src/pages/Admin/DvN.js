import React, {useState} from 'react'
import Loader from '../../components/Loader';
import { apiConnector } from '../../redux/Utils/apiConnector';
import { useSelector } from 'react-redux';
import { DATA_URL } from '../../redux/Utils/constants';
import { Link } from 'react-router-dom';

const DvN = () => {

    const [loading, setLoading] = useState(0);
    const [error, setError] = useState(0);
    const [data, setData] = useState();

    const [info, setInfo] = useState({
        start:"",
        end:"",
    });

    const {userinfo} = useSelector(state => state.auth);

    const inputHandler = async(e) =>{
        setInfo((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value
        }));
      }

    async function getData(){
        try {
        setError(0);
        setLoading(1);
        
        const res = await apiConnector(`${DATA_URL}/DvN`,"PUT",info,{Authorization: `Bearer ${userinfo.token}`});

        setData(res.data.data);

        setLoading(0);
        

        } catch (e) {
          setError(1);
          console.log(e);
        }
      }

  return (
    <div>
      
      <div className='flex justify-center my-8 text-2xl font-bold gap-24 sm:max-lg:gap-10 sm:max-lg:mx-4'>

      <Link to='/admin/Daily-List' className='text-xl select-none font-semibold h-16 w-[9.6rem] text-center hover:bg-black hover:text-white rounded-xl -mt-2 sm:max-lg:mt-0.5 pt-4 bg-[#f59e0b]' 
             >Wastage</Link>
    
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
             onClick={getData}
             >Submit</div>
    </div>

      {
        error ? (<div className='sm:max-lg:mt-4 text-3xl font-bold text-center my-96'> No Data Entry Found For</div>
        ) : (
         <div>
         {
  loading ? (<div><Loader/></div>) : (  
    <table className='w-[80rem] mx-auto my-12 sm:max-lg:w-fit sm:max-lg:mx-2'>
      <thead>
        <tr>
          <th rowSpan={2} className='border-4 border-black p-2'>Day Time</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Batches</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Yield (Kg)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Pouch Filled</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Pouch Packed</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Pouch Wasted</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Wastage (Kg)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Box</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. of Worker</th>
        </tr>
      </thead>

  {
    data ? (
      <tbody className='text-center'>
         
         <tr>
         <td className='border-4 border-black font-bold py-4 text-center'> Day </td>

         <td className='border-4 border-black font-bold '> {
   data.filter(item=>item.dayTime === "Day").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.batchQuantity,0),0)
 }</td>

 
        <td className='border-4 border-black font-bold '> {
   data.filter(item=>item.dayTime === "Day").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.yield*obj.batchQuantity,0),0).toFixed(2)
 }</td>

 <td className='border-4 border-black font-bold '> {
   data.filter(item=>item.dayTime === "Day").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.pouchQuantity,0),0)
 }</td>

 <td className='border-4 border-black font-bold '> {
   data.filter(item=>item.dayTime === "Day").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.pouchPacked,0),0)
 }</td>

 <td className='border-4 border-black font-bold '> {
   data.filter(item=>item.dayTime === "Day").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.empty,0),0) +
   data.filter(item=>item.dayTime === "Day").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.leaked,0),0) +
   data.filter(item=>item.dayTime === "Day").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.foreignMatter,0),0)
 }</td>

 <td className='border-4 border-black font-bold '>{
  (data.filter(item=>item.dayTime === "Day").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.filled,0),0) ).toFixed(2)
 } </td>
         <td className='border-4 border-black font-bold '> {
   data.filter(item=>item.dayTime === "Day").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.box,0),0)
 }</td>
 <td className='border-4 border-black font-bold '> {
   data.filter(item=>item.dayTime === "Day").reduce((acc,obj)=>  acc+obj.dataList.reduce( (accumulator, obj,index) => accumulator + (index===0?obj.workersQuantity:0),0),0)
 }</td>
         </tr>

         <tr>
         <td className='border-4 border-black font-bold py-4 text-center'> Night </td>

         <td className='border-4 border-black font-bold '> {
   data.filter(item=>item.dayTime === "Night").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.batchQuantity,0),0)
 }</td>
 
        <td className='border-4 border-black font-bold '> {
   data.filter(item=>item.dayTime === "Night").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.yield*obj.batchQuantity,0),0).toFixed(2)
 }</td>

 <td className='border-4 border-black font-bold '> {
   data.filter(item=>item.dayTime === "Night").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.pouchQuantity,0),0)
 }</td>

 <td className='border-4 border-black font-bold '> {
   data.filter(item=>item.dayTime === "Night").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.pouchPacked,0),0)
 }</td>

 <td className='border-4 border-black font-bold '> {
   data.filter(item=>item.dayTime === "Night").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.empty,0),0) +
   data.filter(item=>item.dayTime === "Night").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.leaked,0),0) +
   data.filter(item=>item.dayTime === "Night").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.foreignMatter,0),0)
 }</td>

 <td className='border-4 border-black font-bold '>{
  (data.filter(item=>item.dayTime === "Night").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.filled,0),0) ).toFixed(2)
 } </td>
         <td className='border-4 border-black font-bold '> {
   data.filter(item=>item.dayTime === "Night").reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.box,0),0)
 }</td>
 <td className='border-4 border-black font-bold '> {
   data.filter(item=>item.dayTime === "Night").reduce((acc,obj)=>  acc+obj.dataList.reduce( (accumulator, obj,index) => accumulator + (index===0?obj.workersQuantity:0),0),0)
 }</td>
         </tr>

     </tbody>
    ) : (
      <tbody className='font-bold text-3xl '><tr><td colSpan={10}>No Data Entry Found</td></tr></tbody>
    )
  }
     
</table>
  )}       
    </div>
  )
      }
      </div>
  )}


export default DvN
