import React, {useState, useEffect} from 'react'
import Loader from '../../components/Loader';
import { apiConnector } from '../../redux/Utils/apiConnector';
import { useSelector } from 'react-redux';
import { PRODUCT_URL,CATEGORIES_URL  } from '../../redux/Utils/constants';
import { DATA_URL } from '../../redux/Utils/constants';
import { MdArrowDropDownCircle } from "react-icons/md";
import {toast} from 'react-toastify';

const Pouch = () => {


    const [sectionData, setSectionData] = useState([]);
    const [loading, setLoading] = useState(1);
    const [openBox2, setopenBox2] = useState(0);
    const [products, setproducts] = useState([]);
    const [error, setError] = useState(0);
    const [id, setId] = useState("");
    const [val, setVal] = useState(1);
    const [month, setmonth] = useState(1);
    const [categories, setcategories] = useState([]);
    const [info, setInfo] = useState({
        buyer:"",
        pouches:"",
        month:"",
        product:""
    });

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

    const {userinfo} = useSelector(state => state.auth);

    async function handleUpdate(){
      try {
    
        await apiConnector(`${PRODUCT_URL}/updatePouch/${id}`,"PUT",info,{Authorization: `Bearer ${userinfo.token}`});
        setopenBox2(!openBox2);
        toast("Successfully Updated");
      } catch (error) {
        toast(error.response.data.message)
      }
    
    }
      
   
    useEffect(() => {

      async function getCategories(){
          try {
    
        const res = await apiConnector(`${CATEGORIES_URL}/categories`,"GET");
        setcategories(res.data.data);

          } catch (e) {
            console.log(e)
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
        
        async function getData(){
        try {
        setError(0);
        setLoading(1);
        
        const res = await apiConnector(`${DATA_URL}/List/${month}`,"GET",null,{Authorization: `Bearer ${userinfo.token}`});

         setSectionData(res.data.data.map(e=>e.dataList.filter( buyer => buyer.buyerName === info.buyer)));

         setTimeout(()=>setLoading(0),800);
        

        } catch (e) {
          setError(1);
          console.log(e);
        }
      }
        
        getData();
        getProducts();
        getCategories();

      }, [info.buyer,month,userinfo.token]);

    const inputHandler = async(e) =>{
        setInfo((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value
        }));
      }

  return (
    <div>
    <div className='flex justify-center my-8 text-2xl font-bold gap-24 sm:max-lg:gap-10 sm:max-lg:mx-4'>
        <div>
        <select
                 name='buyer'
                 className='hover:border-black hover:border-2 text-xl font-bold h-16 w-[9.6rem] text-center rounded-xl bg-[#f59e0b]'
                 onChange={ e => inputHandler(e) }
            >
            <option className=' bg-[#f59e0b] '>Select</option>
            {
                categories.map((val,index)=>(<option className=' bg-[#f59e0b]' value={val.name} key={index}>{val.name}</option>))
            }
            </select>
        </div>
        <div className='flex items-center relative justify-center font-bold text-2xl h-fit rounded-lg gap-1'
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
              name ="month"
              onClick={()=>{
                setmonth(index+1);
                setInfo((prevData) => ({
          ...prevData,
          month: index+1
        })); 
               }}>
                {val.month}
              </div>
            ))
          }
            </div>) : (<div></div>)
          }
      </div>
    </div>

     {
       error ? (<div className='text-center font-bold text-7xl mt-64 text-[#f59e0b]'>No Data Entry Found</div>
       ) : (
         <div>
    {
     loading ? ( <Loader/>
     ) : (
       <div>
       <table className='w-[80rem] mx-auto text-center text-black my-12 sm:max-lg:w-fit sm:max-lg:mx-3'>
       <thead>
         <tr>
           <th rowSpan={2} className='border-4 border-black p-1'>S no.</th>
           <th rowSpan={2} className='border-4 border-black p-8'>Product Name</th>
           <th rowSpan={2} className='border-4 border-black p-2'>Previous Balance</th>
           <th rowSpan={2} className='border-4 border-black p-4'>Pouches (IN)</th>
           <th rowSpan={2} className='border-4 border-black p-4'>Balance</th>
           <th rowSpan={2} className='border-4 border-black p-4'>No. Of Pouch Filled</th>
           <th rowSpan={2} className='border-4 border-black p-1'>Total Balance</th>
         </tr>
       </thead>


             {
              products.filter(product=> product.buyer === info.buyer).map((element,index)=>(
                <tbody key={index}
                       onClick={()=>{
                        setopenBox2(!openBox2)
                        setId(element._id)
                        setInfo((prevData) => ({
          ...prevData,
          product:element.name
        }))}}>
            <tr className='hover:bg-slate-400'>
                  <td className='border-4 border-black font-bold p-3'>{index+1}</td>
                  <td className='border-4 border-black font-bold'> {element.name} </td>
                  <td className='border-4 border-black font-bold'>{element.pouches.filter( item => item.month < month).reduce( (accumulator, obj) => accumulator + obj.remain,0)}</td>
                  <td className='border-4 border-black font-bold'>{element.pouches[month-1].stock}</td>
                  <td className='border-4 border-black font-bold'>{element.pouches.filter( item => item.month < month).reduce( (accumulator, obj) => accumulator + obj.remain,0) + element.pouches[month-1].stock}</td>
                  <td className='border-4 border-black font-bold'>{ sectionData.reduce((acc,obj)=> acc+obj.filter(item=>item.productName === element.name).reduce( (accumulator, obj) => accumulator + obj.pouchQuantity,0),0)}</td>
                  <td className='border-4 border-black font-bold'>{element.pouches.filter( item => item.month <= month).reduce( (accumulator, obj) => accumulator + obj.remain,0)}</td>
            </tr>
                
                  </tbody>
     ))}

                     </table>
     </div>)
    }
    
    {
            openBox2 ? (
      <div className="space-y-3 fixed top-[18rem] left-[33rem] bg-slate-300 p-5 [ bg-gradient-to-b from-white/35 to-white/5 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] w-[30rem] rounded-lg sm:max-lg:left-[13.5rem] sm:max-lg:top-[2.5rem]">

<div className='flex justify-between gap-3'>
<label htmlFor="confirPassword" className='font-bold text-xl'>
    Pouches: 
  </label>
  <input type='number'
         id="confirmPassword" 
         name = "pouches"
         onChange={ e => inputHandler(e) }
         className='bg-transparent border-2 border-[#f59e0b] p-1 placeholder-black'
               />
</div>

        <div className="flex justify-center gap-24">
          <button className=" py-2 px-4 rounded-lg text-[#f59e0b] bg-black border-[#f59e0b] border-2 font-semibold hover:scale-105"
          onClick={()=>setopenBox2(!openBox2)}> 
            Cancel
          </button>
          
          <button
          type='submit'
          onClick={handleUpdate}
              className=" py-2 px-4 rounded-lg text-[#f59e0b] bg-black border-[#f59e0b] border-2 font-semibold hover:scale-105"
            >
              Update
            </button>
        </div>
      </div>

            ) : (
              null
            )
}
    </div>
          )
     }
   </div>
  )
}

export default Pouch
