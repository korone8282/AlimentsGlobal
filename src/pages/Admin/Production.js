import React, {useState, useEffect} from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector';
import Loader from '../../components/Loader';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';
import { GOAL_URL } from '../../redux/Utils/constants'; 
import { CATEGORIES_URL  } from '../../redux/Utils/constants';
import { PRODUCT_URL } from '../../redux/Utils/constants';

const Production = () => {

    const {userinfo} = useSelector(state=>state.auth);

    const [products, setproducts] = useState([]);
    const [categories, setcategories] = useState([]);
    const [loading, setLoading] = useState(1);

    const [info, setInfo] = useState({
        buyerName:"",
        fname:"",
        batchNum:"",
        pouchSize:"",
        pouchGoal:"",
        pouchPacked:"",
        day:"",
        date:"",
    });

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

        async function getProducts(){
          try {
    
        const res = await apiConnector(`${PRODUCT_URL}/products`,"GET");
        setproducts(res.data.data);
    
        setLoading(0);
          } catch (error) {
            console.log(error);
          }
          }
      
      getProducts();
      getCategories();

    }, []);
    
      const inputHandler = async(e) =>{
        setInfo((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value
        }));
      }

  async function handleCreate(){

    const toastId = toast.loading("Loading...",{
        position: 'top-center',
      });

    try {
        

      await apiConnector(`${GOAL_URL}`,"POST",info,{Authorization: `Bearer ${userinfo.token}`});
        
      setInfo({
        buyerName:"",
        fname:"",
        batchNum:"",
        pouchSize:"",
        pouchGoal:"",
        pouchPacked:"",
        day:"",
        date:"",
      });

      toast.dismiss(toastId);
      toast("created successfully");
      
    } catch (error) {
      toast.dismiss(toastId);
      toast("Fill Date and other Details");
    }
  }
console.log(info)
  return (
    <div>
      
    <h2 className='text-center text-3xl font-bold my-5  '>Plan for : <input type='date' name='date' value={info.date} onChange={e => inputHandler(e)}></input> </h2>
    
    {
      loading ? (<Loader/> 
      ) : (
        <div className="flex justify-center my-5 mx-auto h-[44rem] sm:max-lg:h-fit sm:max-lg:w-[50rem] bg-black text-[#f59e0b] w-[70rem] rounded-lg">
              <section className='flex flex-col h-full w-full my-9 font-semibold text-3xl gap-12 mx-9 sm:max-lg:text-xl'>

        <div className='flex justify-between sm:max-lg:items-center gap-12'>

        <div className='flex gap-12 sm:max-lg:gap-4'>
      <label htmlFor="name">
              Buyer Name :
        </label>
        <select
                 name='buyerName'
                 className='hover:border-black hover:border-2 text-xl text-black font-bold h-16 text-center rounded-xl bg-[#f59e0b]'
                 value={info.buyerName}
                 onChange={ e => inputHandler(e) }
            >
            <option className=' bg-[#f59e0b] text-black '>Select</option>
            {
                categories.map((val,index)=>(<option className=' bg-[#f59e0b] text-black font-semibold' value={val.name} key={index}>{val.name}</option>))
            }
            </select>
      </div>
  
      <div className='flex gap-12 sm:max-lg:gap-4'>
      <label htmlFor="name">
              Product Name :
        </label>
        <select
                 name='fname'
                 className='hover:border-black hover:border-2 text-xl text-black font-bold h-16 text-center rounded-xl bg-[#f59e0b]'
                 value={info.fname}
                 onChange={ e => inputHandler(e) }
            >
            <option className=' bg-[#f59e0b] text-black'>Select Product</option>
            {
                products?.filter((product) => product.buyer === info.buyerName).map((val,index)=>(<option className=' bg-[#f59e0b] text-black font-semibold' value={val.name} key={index}>{val.name}</option>))
            }
            </select>
      </div>

        </div>
      
       
      <div className='flex justify-between'>
      <label htmlFor="email">
              Batch Number :
        </label>
        <input type='text' 
               id="email" 
               value={info.batchNum}
               name="batchNum" 
               onChange={ e => inputHandler(e) }
               className='bg-transparent border-2 border-[#f59e0b] p-1'
               />
      </div>
       

          <div className='flex justify-between'>
          <label htmlFor="pass" >
              Pouch Size :
          </label>
          <input type='number'
                 id="pass" 
                 value={info.pouchSize}
                 name='pouchSize'
                 onChange={ e => inputHandler(e) }
                 className='bg-transparent border-2 border-[#f59e0b] p-1'
                       />
          </div>
          
          <div className='flex justify-between'>
          <label htmlFor="confirPassword" >
             PouchGoal :
          </label>
          <input type='number'
                 id="confirmPassword" 
                 name = "pouchGoal" 
                 value={info.pouchGoal}
                 onChange={ e => inputHandler(e) }
                 className='bg-transparent border-2 border-[#f59e0b] p-1'
                       />
          </div>
          
        <div className='flex justify-between'>
        <label htmlFor="confirPassword">
             Pouch Packed : 
          </label>
          <input type='number'
                 id="confirmPassword" 
                 name = "pouchPacked"
                 value={info.pouchPacked} 
                 onChange={ e => inputHandler(e) }
                 className='bg-transparent border-2 border-[#f59e0b] p-1'
                       />
        </div>

        <div className='flex justify-between'>

        <div>
            DayTime:
        </div>

        <div className='flex gap-24 mr-8'>
        <div className='flex gap-6 mr-9'>  
        <label htmlFor="today">
             Day 
          </label>
          <input type='radio'
                 id="today" 
                 name = "day"
                 value="Day" 
                 onChange={ e => inputHandler(e) }
                 className='bg-transparent border-2 border-[#f59e0b] p-1'
                       />
        </div>
        <div className='flex gap-6'>  
        <label htmlFor="today">
             Night 
          </label>
          <input type='radio'
                 id="today" 
                 name = "day"
                 value="Night" 
                 onChange={ e => inputHandler(e) }
                 className='bg-transparent border-2 border-[#f59e0b] p-1'
                       />
        </div>
        </div>
        

        
      
        </div>

          <button 
           onClick={handleCreate}
                   className=' text-[#f59e0b] bg-black border-[#f59e0b] h-14 my-2 border-2 w-48 mx-auto rounded-md hover:scale-105 text-xl font-semibold'
                   >
             Submit
          </button>
       
        </section>
              </div>
      )
    }

      

    </div>
  )
}

export default Production
