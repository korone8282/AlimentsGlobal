import React from 'react'
import { useState , useEffect} from 'react';
import Loader from '../../components/Loader';
import { apiConnector } from '../../redux/Utils/apiConnector';
import {toast} from 'react-toastify';
import { useSelector ,useDispatch } from 'react-redux';
import { GOAL_URL } from '../../redux/Utils/constants';
import CircularSlider from '@fseehawer/react-circular-slider'; 
import { setGoalDate } from '../../redux/Slices/goalSlice';

const ProductionGoal = () => {

  const {userinfo} = useSelector(state=>state.auth);

  const [openBox, setopenBox] = useState(0);
  const [loading, setLoading] = useState(0);
  const [goals, setGoals] = useState();
  const [currentGoal, setcurrentGoal] = useState();
  const [error, setError] = useState(0);

  const date = useSelector(state=>state.goal);

  const dispatch = useDispatch();

const [info, setInfo] = useState({
  fname:"",
  batchNum:"",
  pouchSize:"",
  pouchGoal:"",
  pouchPacked:"",
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

    getGoals();

  }, [info.date,userinfo.token]);



  const handleUpdate = async() =>{

    const toastId = toast.loading("Loading...",{
      position: 'top-center',
    });

    try {
  
      await apiConnector(`${GOAL_URL}/${currentGoal._id}`,"POST",info,{Authorization: `Bearer ${userinfo.token}`});

      setInfo({
        fname:"",
        batchNum:"",
        pouchSize:"",
        pouchGoal:"",
        pouchPacked:"",
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
        fname:"",
        batchNum:"",
        pouchSize:"",
        pouchGoal:"",
        pouchPacked:"",
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
        <div className="flex flex-wrap gap-12 mx-4 my-6">
        {
          goals?.map((val,index)=>(
            <div key={index} 
                 className='flex gap-12 border-2 text-[#f59e0b] bg-black rounded-lg p-4'
                 onClick={()=>{
                  setopenBox(!openBox);
                  setcurrentGoal(val)}}>

            <div className='flex flex-col text-2xl justify-evenly font-bold'>
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

                <div className='text-3xl font-bold'> {val.pouchPacked} / {val.pouchGoal} </div>
              </div>
             
            </div>
          ))
        }
      </div>
      )
    }
     
          {
            openBox ? (
      <div className="fixed top-[10%] z-10 flex my-5 left-[25%] h-[38rem] backdrop-blur-xl
    [ bg-gradient-to-b from-white/65 to-white/45 ]
    [ border-[3px] border-solid border-white border-opacity-30 ]
    [ shadow-black/70 shadow-2xl ] text-black w-[50rem] rounded-lg">
              <section className='flex flex-col h-full w-full my-9 font-semibold text-3xl gap-12 mx-9'>
  
      <div className='flex justify-between'>
      <label htmlFor="name">
              Name :
        </label>
        <input type='text' 
               id="fname" 
               value={info.fname}
               name="fname"
               placeholder={currentGoal.fname}
               onChange={ e => inputHandler(e) }
               className='bg-transparent border-2 border-black p-1 placeholder-black'
               />
      </div>
       
      <div className='flex justify-between'>
      <label htmlFor="email">
              Batch Number :
        </label>
        <input type='text' 
               id="email" 
               value={info.batchNum}
               name="batchNum" 
               placeholder={currentGoal.batchNum}
               onChange={ e => inputHandler(e) }
               className='bg-transparent border-2 border-black p-1 placeholder-black'
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
                 placeholder={currentGoal.pouchSize}
                 onChange={ e => inputHandler(e) }
                 className='bg-transparent border-2 border-black p-1 placeholder-black'
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
                 className='bg-transparent border-2 border-black p-1 placeholder-black'
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
                 className='bg-transparent border-2 border-black p-1 placeholder-black'
                       />
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
