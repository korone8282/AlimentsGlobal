import React, {useState, useEffect} from 'react'
import Loader from '../../components/Loader';
import { apiConnector } from '../../redux/Utils/apiConnector';
import { useSelector } from 'react-redux';
import { DATA_URL } from '../../redux/Utils/constants';

const KvF = () => {


  const arr = [];
  let array = [];
  
  const today = new Date();
  var now = today.toISOString().substring(0,10);

  const [loading, setLoading] = useState(0);
  const [error, setError] = useState(0);
  const [data, setData] = useState();
  const [date, setdate] = useState({datey:now});

  const {userinfo} = useSelector(state => state.auth);
  

  useEffect(() => {
    async function getData(){
      try {
      setError(0);
      setLoading(1);
      
      const res = await apiConnector(`${DATA_URL}/KvF`,"PUT",date,{Authorization: `Bearer ${userinfo.token}`});
  
      setData(res.data.data);
        
      setLoading(0);
      
      } catch (e) {
        setError(1);
        console.log(e);
      }
    }

    getData();
  }, [date,userinfo.token]);

  const inputHandler = async(e) =>{
    setdate((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  }
 
  data?.filter(obj=> obj.sectionMain === "Kitchen")?.forEach(ele=>{
    ele.dataList.forEach(e=>{
      let obj = {
        "day":ele.dayTime,
        "product":e.productName,
        "batch":e.batchQuantity,
        "yield":e.yield
      }

      arr.push(obj);

    })
  })

  data?.filter(obj=> obj.sectionMain === "Filling")?.forEach(ele=>{
    ele.dataList.forEach(e=>{
      let obj = {
        "day":ele.dayTime,
        "product":e.productName,
        "count":e.pouchQuantity,
        "size":e.packSize,
        "filled":e.filled
      }


      array.push(obj);

    })
  })

  array = array.filter((value, index, self) =>
    index !== self.findIndex((obj) => (
      obj.product === value.product && obj.day === value.day
    ))
  )

  function yo(val,ele){

    if (arr.length){
      let item = arr.find( obj => obj.day === val.dayTime && obj.product === ele.productName )
      if(item){
      return (item.yield*item.batch)?.toFixed(2)
      } else {
        return 0;
      }
    } else {
      return 0;
    }
    
  } 

  function size(val,ele){

    if ( array.find( obj => obj.day === val.dayTime && obj.product === ele.productName )){
      let item = array.find( obj => obj.day === val.dayTime && obj.product === ele.productName )
      return `${ele.packSize}, ${item.size}`
    } else {
      return ele.packSize
    }
  } 

  function count(val,ele){

    if ( array.find( obj => obj.day === val.dayTime && obj.product === ele.productName )){
      let item = array.find( obj => obj.day === val.dayTime && obj.product === ele.productName )
      return `${ele.pouchQuantity}, ${item.count}`
    } else {
      return ele.pouchQuantity
    }
  } 

  function quant(val,ele){

    if ( array.find( obj => obj.day === val.dayTime && obj.product === ele.productName )){
      let item = array.find( obj => obj.day === val.dayTime && obj.product === ele.productName )
      return ((ele.pouchQuantity*(ele.packSize+0.008))+(item.count*(item.size+0.008)))?.toFixed(2);
    } else {
      return ((ele.packSize+0.008)*ele.pouchQuantity)?.toFixed(2)
    }
  } 

  function waste(val,ele){

    if ( array.find( obj => obj.day === val.dayTime && obj.product === ele.productName )){
      let item = array.find( obj => obj.day === val.dayTime && obj.product === ele.productName )
      return (ele.filled+item.filled ? (ele.filled+item.filled).toFixed(2) : 0);
    } else {
      return (ele.filled ? ele.filled.toFixed(2) : 0)
    }
  } 

  return (
    <div>
      <div className='flex justify-center my-8 text-2xl font-bold gap-24 sm:max-lg:gap-10 sm:max-lg:mx-4'>
        <div>
           <label>Date: </label>
            <input type='date'
            name='datey'
            onChange={ e=> inputHandler(e)}
            />
        </div>
      </div>

      <div> {
      error ? (<div className='sm:max-lg:mt-4 text-3xl font-bold text-center my-96'> No Data Entry Found For {date.datey}</div>
        ) : (
         <div>
         {
  loading ? (<div><Loader/></div>) : (  
    <table className='w-[80rem] mx-auto my-12 sm:max-lg:w-fit sm:max-lg:mx-2'>
      <thead>
        <tr>
        <th rowSpan={2} className='border-4 border-black p-2'>S No.</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Item Name</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Day Time</th>
          <th rowSpan={2} className='border-4 border-black p-4'>Pack Size</th>
          <th rowSpan={2} className='border-4 border-black p-5'>No. Of Pouch Filled</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Production (Filling)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Production (Kitchen)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Difference (Kg)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Wastage (Kg)</th>
          <th rowSpan={2} className='border-4 border-black p-2'>Variance (Kg)</th>
        </tr>
      </thead>

      <tbody className='text-center'>
         {
          data?.filter(obj=> obj.sectionMain === "Filling" ).map( (val) =>(
            val.dataList.filter((value, index, self) =>
    index === self.findIndex((obj) => ( obj.productName === value.productName && obj.day === val.day ))).map((ele,index)=>(
                    <tr key={index}>
          <td className='border-4 border-black font-bold  px-4 p-2'>⦿</td>
          <td className='border-4 border-black font-bold'>{ele.productName}</td>
          <td className='border-4 border-black font-bold'>{val.dayTime}</td>
          <td className='border-4 border-black font-bold'>{size(val,ele) }</td>
          <td className='border-4 border-black font-bold'>{count(val,ele)}</td>
          <td className='border-4 border-black font-bold'>{quant(val,ele)}</td>
          <td className='border-4 border-black font-bold'>{yo(val,ele)}</td>
          <td className='border-4 border-black font-bold'>{ (yo(val,ele) - quant(val,ele))?.toFixed(2) }</td>
          <td className='border-4 border-black font-bold'>{waste(val,ele)}</td>
          <td className='border-4 border-black font-bold'>{(Math.abs(yo(val,ele) - quant(val,ele))-waste(val,ele))?.toFixed(2)}</td>
              </tr>
                  ))

          ))
         }
      </tbody>
     
  
     
</table>
  )}       
    </div>
  )

       } </div>
    </div>
  )
}

export default KvF
