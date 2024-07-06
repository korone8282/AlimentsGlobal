import React, {useState} from 'react'
import { apiConnector } from '../../redux/Utils/apiConnector';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';
import { GOAL_URL } from '../../redux/Utils/constants'; 

const Production = () => {

    const {userinfo} = useSelector(state=>state.auth);

    const [info, setInfo] = useState({
        fname:"",
        batchNum:"",
        pouchSize:"",
        pouchGoal:"",
        pouchPacked:"",
        date:"",
    });
    
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
        fname:"",
        batchNum:"",
        pouchSize:"",
        pouchGoal:"",
        pouchPacked:"",
        date:"",
      });

      toast.dismiss(toastId);
      toast("created successfully");
      
    } catch (error) {
      toast.dismiss(toastId);
      toast("Fill Date and other Details");
    }
  }

  return (
    <div>
      
    <h2 className='text-center text-3xl font-bold my-5  '>Plan for : <input type='date' name='date' value={info.date} onChange={e => inputHandler(e)}></input> </h2>
    

      <div className="flex justify-center my-5 mx-auto h-[38rem] bg-black text-[#f59e0b] w-[50rem] rounded-lg">
              <section className='flex flex-col h-full w-full my-9 font-semibold text-3xl gap-12 mx-9'>
  
      <div className='flex justify-between'>
      <label htmlFor="name">
              Name :
        </label>
        <input type='text' 
               id="fname" 
               value={info.fname}
               name="fname"
               onChange={ e => inputHandler(e) }
               className='bg-transparent border-2 border-[#f59e0b] p-1'
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
          


          <button 
           onClick={handleCreate}
                   className=' text-[#f59e0b] bg-black border-[#f59e0b] h-14 my-4 border-2 w-48 mx-auto rounded-md hover:scale-105 text-xl font-semibold'
                   >
             Submit
          </button>
       
        </section>
              </div>

    </div>
  )
}

export default Production
