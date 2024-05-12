import React, {useState, useEffect} from 'react'
import Loader from '../../components/Loader';
import { MdArrowDropDownCircle } from "react-icons/md";
import { apiConnector } from '../../redux/Utils/apiConnector';
import { useSelector } from 'react-redux';
import { DATA_URL } from '../../redux/Utils/constants';

const Monthly = () => {

  const {userinfo} = useSelector(state => state.auth);

  const [data, setData] = useState([]);
  const [month, setmonth] = useState(1);
  const [loading, setLoading] = useState(0);
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
              
                      const res = await apiConnector(`${DATA_URL}/List/${month}`,"GET",null,{Authorization: `Bearer ${userinfo.token}`});
                
                      setData(res.data.data);          
                
                    setLoading(0);
                
                    } catch (e) {
                      setError(1);
                      console.log(e);
                    }
                  }

                  getData();
                 }, [month]);
 
  return (
    <div>



      <div className='flex items-center relative justify-center font-bold text-2xl h-fit rounded-lg gap-1 my-8'
      onClick={()=>setVal( !val  )}>   
         Month
          <MdArrowDropDownCircle className='mt-1'/>
          {
          val  ? ( <div className='absolute bg-gradient-to-br from-30% from-black to-red-700 border-black border-4 rounded-xl text-[#f59e0b] sm:max-lg:top-6 top-10 w-72 h-72 flex gap-3 flex-wrap justify-center items-center'>
              {
            months.map((val,index)=>(
              <div key={index}
              className='text-sm font-bold h-12 w-[4.8rem] bg-gradient-to-br from-30% from-black to-red-700 border-4 rounded-lg hover:scale-105 text-center cursor-auto pt-2 hover:bg-red-400'
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


      <table className='w-[80rem] mx-auto my-12 sm:max-lg:w-fit'>
      <thead>
        <tr>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Batches</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Retort Cycles</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Yield (Kg)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Yield Loss (Kg)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Pouch Packed</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Pouch Wasted</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. Of Box</th>
          <th rowSpan={2} className='border-4 border-black p-2'>No. of Worker</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Cost / Pouch</th>
        </tr>
      </thead>

      <tbody>
      <tr>
    
          <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.batchQuantity,0),0)
  }</td>
          <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.retortCycle,0),0)
  }</td>
  
         <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.yield,0),0)
  }</td>

  <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.yieldLoss,0),0)
  }</td>
          <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.pouchPacked,0),0)
  }</td>

  <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.filled,0),0) +
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.empty,0),0) +
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.leaked,0),0) +
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.foreignMatter,0),0)
  }</td>
          <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.box,0),0)
  }</td>
          <td className='border-4 border-black font-bold '> {
    data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.workersQuantity,0),0)
  }</td>

  <td className='border-4 border-black font-bold '> {
    (data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.workersQuantity,0),0) * 500 /  data.reduce((acc,obj)=> acc+obj.dataList.reduce( (accumulator, obj) => accumulator + obj.pouchPacked,0),0)).toFixed(3)
  }</td>
      </tr> 
      </tbody>
      </table>
    </div>
  )
}

export default Monthly
