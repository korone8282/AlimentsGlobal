import React, {useState, useEffect} from 'react'
import Loader from '../../components/Loader';
import { MdArrowDropDownCircle } from "react-icons/md";
import { apiConnector } from '../../redux/Utils/apiConnector';
import { useSelector } from 'react-redux';
import { DATA_URL } from '../../redux/Utils/constants';

const Monthly = () => {

  const {userinfo} = useSelector(state => state.auth);

  const pSize = [0.125,0.13,0.175,0.2,0.225,0.25,0.3,0.35,0.375,0.45,0.5,0.6,1];

  const [data, setData] = useState([]);
  const [month, setmonth] = useState(1);
  const [loading, setLoading] = useState(1);
  const [error, setError] = useState(0);
  
  const [val, setVal] = useState(1);

  const months = [{month:"January"},
                  {month:"February"},
                  {month:"March"},
                  {month:"April"},
                  {month:"May"},
                  {month:"June"},
                  {month:"July"},
                  {month:"August"},
                  {month:"September"},
                  {month:"October"},
                  {month:"November"},
                  {month:"December"}
                 ];
              
                 useEffect(() => {
                  
                  async function getData(){
                    try {
                    setLoading(1);
                      setError(0);
                      const res = await apiConnector(`${DATA_URL}/List/${month}`,"GET",null,{Authorization: `Bearer ${userinfo.token}`});
                      
                      setData(res.data.data);          
                      
                    setLoading(0);
                
                    } catch (e) {
                      setError(1);
                      console.log(e);
                    }
                  }

                  getData();
                 }, [month,userinfo.token]);

  let sum = 0;

  function myFunction(item) {
    let size = item;
    sum += item*data.reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.packSize === size).reduce( (accumulator, obj) => accumulator + obj.pouchQuantity,0),0)
  }

  return (
    <div>

      <div className='flex items-center relative justify-center font-bold text-2xl h-fit rounded-lg gap-1 my-8'
      onClick={()=>setVal( !val  )}>   
         Month 
          <MdArrowDropDownCircle className='mt-1'/>
      <div className='mx-20'>
      {months[month-1].month}
      </div>
          {
          val  ? ( <div className='absolute bg-black border-2 rounded-xl border-[#f59e0b] text-[#f59e0b] sm:max-lg:right-[11.5rem] sm:max-lg:-top-3 top-10 w-72 h-72 flex gap-3 flex-wrap justify-center items-center'>
              {
            months.map((val,index)=>(
              <div key={index}
              className='text-sm font-bold h-12 w-[4.8rem] bg-black border-2 rounded-lg border-[#f59e0b] text-[#f59e0b] hover:scale-105 text-center cursor-auto pt-2.5 hover:bg-[#f59e0b] hover:text-black'
              onClick={()=>{
                setmonth(index+1); 
               }}>
                {val.month}
              </div>
            ))
          }
            </div>) : (<div></div>)
          }
      </div>

      {
        error ? (<div className='sm:max-lg:mt-4 text-3xl font-bold text-center my-96'> No Data Entry Found For {months[month-1].month}</div>
        ) : (
         <div>
         {
  loading ? (<div><Loader/></div>) : (  
    <table className='w-[80rem] mx-auto my-12 sm:max-lg:w-fit sm:max-lg:mx-2'>
      <thead>
        <tr>
        <th rowSpan={2} className='border-4 border-black p-2'>Pouch Size (Kg)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Batches</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Retort Cycles</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Yield (Kg)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Yield Loss (Kg)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Pouch Filled</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Total (kg)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Pouch Packed</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Pouch Wasted (Filling)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Pouch Wasted (Dispatch)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Box</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. of Worker</th>
        </tr>
      </thead>

      <tbody className='text-center'>

      {
        pSize.map((ele,index)=>(
         
          <tr key={index}>
          <td className='border-4 border-black font-bold py-4 text-center'> {ele} </td>

          <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.packSize === ele).reduce( (accumulator, obj) => accumulator + obj.batchQuantity,0),0)
  }</td>
          <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.packSize === ele).reduce( (accumulator, obj) => accumulator + obj.retortCycle,0),0)
  }</td>
  
         <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.packSize === ele).reduce( (accumulator, obj) => accumulator + obj.yield*obj.batchQuantity,0),0).toFixed(2)
  }</td>

  <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.packSize === ele).reduce( (accumulator, obj) => accumulator + obj.yieldLoss,0),0)
  }</td>

  <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.packSize === ele).reduce( (accumulator, obj) => accumulator + obj.pouchQuantity,0),0)
  }</td>

  <td className='border-4 border-black font-bold '> {
    ((ele)*data.reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.packSize === ele).reduce( (accumulator, obj) => accumulator + obj.pouchQuantity,0),0)).toFixed(2)
  }</td>

          <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.packSize === ele).reduce( (accumulator, obj) => accumulator + obj.pouchPacked,0),0)
  }</td>

  <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.packSize === ele).reduce( (accumulator, obj) => accumulator + obj.filled,0),0) +
    data.reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.packSize === ele).reduce( (accumulator, obj) => accumulator + obj.empty,0),0) 
  }</td>

  <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.packSize === ele).reduce( (accumulator, obj) => accumulator + obj.leaked,0),0) +
    data.reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.packSize === ele).reduce( (accumulator, obj) => accumulator + obj.foreignMatter,0),0)
  }</td>
          <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.filter(item=>item.packSize === ele).reduce( (accumulator, obj) => accumulator + obj.box,0),0)
  }</td>

{ !index ? (<td  rowSpan={pSize.length+1} className='border-4 text-center border-black font-bold'> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj,index) => accumulator + (index===0?obj.workersQuantity:0),0),0)
  }</td>) : (<td></td>)
  }
       </tr> 
     
        ))
      }
      
      <tr>
          <td className='border-4 border-black font-bold '> 
   Total
  </td>

          <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.batchQuantity,0),0)
  }</td>
          <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.retortCycle,0),0)
  }</td>
  
         <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.yield*obj.batchQuantity,0),0).toFixed(2)
  }</td>

  <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.yieldLoss,0),0)
  }</td>

  <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.pouchQuantity,0),0)
  }</td>

  <td className='border-4 border-black font-bold '> 
{
  pSize.forEach(myFunction)
}
{sum.toFixed(2)}
  </td>

          <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.pouchPacked,0),0)
  }</td>

  <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.filled,0),0) +
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.empty,0),0) 
  }</td>

  <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.leaked,0),0) +
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.foreignMatter,0),0)
  }</td>
          <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.box,0),0)
  }</td>
        
      </tr> 
      </tbody>
      </table>)
}
         </div> 
        )
      }


    
    </div>
  )
}

export default Monthly
