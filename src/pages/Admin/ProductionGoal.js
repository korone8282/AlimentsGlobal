import React from 'react'
import { useState , useEffect} from 'react';
import Loader from '../../components/Loader';
import { apiConnector } from '../../redux/Utils/apiConnector';
import {toast} from 'react-toastify';
import { useSelector ,useDispatch } from 'react-redux';
import { GOAL_URL } from '../../redux/Utils/constants';
import CircularSlider from '@fseehawer/react-circular-slider'; 
import { setGoalDate } from '../../redux/Slices/goalSlice';
import { CATEGORIES_URL  } from '../../redux/Utils/constants';
import { PRODUCT_URL } from '../../redux/Utils/constants';

const ProductionGoal = () => {

  const {userinfo} = useSelector(state=>state.auth);

  const [openBox, setopenBox] = useState(0);
  const [loading, setLoading] = useState(0);
  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [goals, setGoals] = useState();
  const [currentGoal, setcurrentGoal] = useState();
  const [error, setError] = useState(0);
  const [newtime, setnewtime] = useState(new Date().toLocaleString());

  const date = useSelector(state=>state.goal);

  const dispatch = useDispatch();

const [info, setInfo] = useState({
  buyerName:"",
  fname:"",
  batchNum:"",
  pouchSize:"",
  pouchGoal:"",
  pouchPacked:"",
  day:"",
  date:date.date,
});

const inputHandler = async(e) =>{
  setInfo((prevData) => ({
    ...prevData,
    [e.target.name]: e.target.value
  }));
}
  useEffect(() => {

    async function getGoals(){
      try {
    
    setError(0);
    const res = await apiConnector(`${GOAL_URL}/${info.date}`,"GET",null,{Authorization: `Bearer ${userinfo.token}`});
    setGoals(res.data.data);
    setLoading(0);

      } catch (error) {
        setError(1);
        console.log(error);
      }
      }

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
      getGoals();

  }, [info.date,userinfo.token]);



  const handleUpdate = async() =>{

    const toastId = toast.loading("Loading...",{
      position: 'top-center',
    });

    try {
  
      await apiConnector(`${GOAL_URL}/${currentGoal._id}`,"POST",info,{Authorization: `Bearer ${userinfo.token}`});

      setInfo({
        buyerName:"",
        fname:"",
        batchNum:"",
        pouchSize:"",
        pouchGoal:"",
        pouchPacked:"",
        day:"",
        date:date.date,
      });
      
      toast.dismiss(toastId);
      toast("updated successfully");
      setcurrentGoal("");
      setopenBox(0);
      window.location.reload();
  
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error);
    }
  }

  async function handleDelete(){
    
    const toastId = toast.loading("Loading...",{
      position: 'top-center',
    });

    try {
      
      await apiConnector(`${GOAL_URL}/${currentGoal._id}`,"DELETE",null,{Authorization: `Bearer ${userinfo.token}`});

      setInfo({
        buyerName:"",
        fname:"",
        batchNum:"",
        pouchSize:"",
        pouchGoal:"",
        pouchPacked:"",
        day:"",
        date:date.date,
      });
      
      toast.dismiss(toastId);
      toast("deleted successfully");
      setcurrentGoal("");
      setopenBox(0);
      window.location.reload();
  
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error);
    }
  }

  return (
    <div>

<div>
    <div onClick={()=>setnewtime(new Date().toLocaleString())}
         className='mx-10 mt-4 cursor-pointer select-none text-2xl font-bold'>Updated At: <span className='bg-red-300'>{newtime}</span></div>
</div>
<h2 className='text-center text-3xl font-bold my-7 mx-auto'>Plan for : <input type='date' 
                                                                              name='date' 
                                                                              value={info.date} 
                                                                              onChange={e =>{ 
                                                                                inputHandler(e);
                                                                                dispatch(setGoalDate(e.target.value));
                                                                              }}></input> </h2>
    {
      error ? (<div className='text-center font-bold text-7xl my-auto sm:max-lg:mt-4'>No Plans Found</div>
      ) :(
        <div>
    {
      loading ? (
        <Loader/>
      ) : (
        <div className="flex flex-wrap gap-6 sm:max-lg:gap-3 sm:max-lg:justify-between mx-6 sm:max-lg:mx-5 my-6">
        {
          goals?.map((val,index)=>(
            <div key={index} 
                 className='flex gap-12 border-2  text-[#f59e0b] bg-black rounded-lg p-4 sm:max-lg:gap-8'
                 onClick={()=>{
                  setopenBox(!openBox);
                  setcurrentGoal(val)}}>

            <div className='flex flex-col text-2xl justify-evenly font-bold sm:max-lg:text-lg max-w-48 sm:max-lg:max-w-32'>
            <div className='text-white -mb-2'> Buyer Name: </div>
            <div className='mb-2'>{val.buyerName}</div>
            <div className='text-white -mb-2'> Product Name: </div>
            <div className='mb-2'>{val.fname}</div>
            <div className='text-white -mb-2'> Batch No: </div>
            <div className='mb-2'>{val.batchNum}</div>
            <div className='text-white -mb-2'>Pack Size (Kg):</div>
            <div className='mb-2'>{val.pouchSize}</div>
            </div>
             

              <div className='flex flex-col items-center gap-5'>

            <CircularSlider
            label="Completion"
            labelFontSize='1rem'
            valueFontSize='2rem'
            verticalOffset='0.5rem'
            width={200}
            labelColor='#f59e0b'           
            progressColorFrom="red"
            progressColorTo="#f59e0b"
            hideKnob={true}
            progressSize={24}
            value={`${((val.pouchPacked / val.pouchGoal)*100).toFixed(2)}`}
            appendToValue='%'
            trackColor="#eeeeee"
            trackSize={24}
            initialValue={(val.pouchPacked / val.pouchGoal)*100}
            knobDraggable={false}
            dataIndex={(val.pouchPacked / val.pouchGoal)*360}
            />

                <div className='text-3xl sm:max-lg:text-xl font-bold'> {val.pouchPacked} / {val.pouchGoal} </div>

                <div className='text-3xl sm:max-lg:text-xl font-bold'>{val.day}</div>
              </div>
             
            </div>
          ))
        }
      </div>
      )
    }
     
          {
            openBox ? (
      <div className="fixed top-[5%] sm:max-lg:absolute z-10 flex my-5 left-[18%] sm:max-lg:left-6 sm:max-lg:top-20 h-[45rem] backdrop-blur-xl
    [ bg-gradient-to-b from-white/65 to-white/45 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] text-black w-[60rem] sm:max-lg:w-[50rem] rounded-lg">
              <section className='flex flex-col h-full w-full my-9 font-semibold text-3xl sm:max-lg:text-lg  gap-12 mx-9'>
              <div className='flex justify-between gap-16'>

<div className='flex gap-6 items-center'>
<label htmlFor="name">
      Buyer Name :
</label>
<select
         name='buyerName'
         className='hover:border-black hover:border-2 text-xl text-black font-bold h-16 text-center rounded-xl bg-[#f59e0b]'
         value={info.buyerName}
         onChange={ e => inputHandler(e) }
    >
    <option className=' bg-[#f59e0b] text-black '>{currentGoal.buyerName}</option>
    {
        categories.map((val,index)=>(<option className=' bg-[#f59e0b] text-black font-semibold' value={val.name} key={index}>{val.name}</option>))
    }
    </select>
</div>

<div className='flex gap-6 items-center'>
<label htmlFor="name">
      Product Name :
</label>
<select
         name='fname'
         className='hover:border-black hover:border-2 text-xl text-black font-bold h-16 text-center rounded-xl bg-[#f59e0b]'
         value={info.fname}
         onChange={ e => inputHandler(e) }
    >
    <option className=' bg-[#f59e0b] text-black'>{currentGoal.fname}</option>
    {
        products?.filter((product) => product.buyer === info.buyerName).map((val,index)=>(<option className=' bg-[#f59e0b] text-black font-semibold' value={val.name} key={index}>{val.name}</option>))
    }
    </select>
</div>

</div>


<div className='flex justify-between sm:max-lg:items-center'>
<label htmlFor="email">
      Batch Number :
</label>
<input type='text' 
       id="email" 
       value={info.batchNum}
       placeholder={currentGoal.batchNum}
       name="batchNum" 
       onChange={ e => inputHandler(e) }
       className='bg-transparent border-2 border-[#f59e0b] p-1 placeholder-black'
       />
</div>


  <div className='flex justify-between'>
  <label htmlFor="pass" >
      Pouch Size :
  </label>
  <input type='number'
         id="pass" 
         value={info.pouchSize}
         placeholder={currentGoal.pouchSize}
         name='pouchSize'
         onChange={ e => inputHandler(e) }
         className='bg-transparent border-2 border-[#f59e0b] p-1 placeholder-black'
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
         placeholder={currentGoal.pouchGoal}
         onChange={ e => inputHandler(e) }
         className='bg-transparent border-2 border-[#f59e0b] p-1 placeholder-black'
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
         placeholder={currentGoal.pouchPacked}
         className='bg-transparent border-2 border-[#f59e0b] p-1 placeholder-black'
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

        <div className="flex justify-between gap-4 text-3xl py-2">
          <button className="px-5 py-2.5 rounded-lg text-[#f59e0b] bg-black border-[#f59e0b] border-2 font-semibold hover:scale-105"
          onClick={()=>setopenBox(!openBox)}> 
            Cancel
          </button>
          
          <button
          onClick={handleUpdate}
          className="px-5 rounded-lg text-[#f59e0b] bg-black border-[#f59e0b] border-2 font-semibold hover:scale-105"
            >
              Update
            </button>

            <button
            onClick={handleDelete}
            className="px-5 rounded-lg text-[#f59e0b] bg-black border-[#f59e0b] border-2 font-semibold hover:scale-105"
            >
              Delete
            </button>

        </div>
        </section>
              </div>
            ) : (
              <div></div>
            )
          }
    </div>
      )
    }
    
  </div>  
  )
}

export default ProductionGoal
