import React from 'react'
import { CATEGORIES_URL  } from '../../redux/Utils/constants';
import { apiConnector } from '../../redux/Utils/apiConnector';
import { useForm } from "react-hook-form";
import {toast} from 'react-toastify';
import { useState , useEffect} from 'react';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';

const BuyerList = () => {

  const { register, 
    handleSubmit,
    reset, 
    formState: {isSubmitSuccessful} 
  }  = useForm();

  const {userinfo} = useSelector(state=>state.auth);
  
  const [openBox, setopenBox] = useState(0);
  const [categories, setcategories] = useState([]); 
  const [currentCategory, setcurrentCategory] = useState();
  const [loading, setLoading] = useState(1);

  useEffect(() => {

    async function getCategories(){
      try {
        const toastId = toast.loading("Loading...",{
          position: 'top-center',
        });

    const res = await apiConnector(`${CATEGORIES_URL}/categories`,"GET");
    setcategories(res.data.data);

    toast.dismiss(toastId);
    
    setLoading(0);
      } catch (error) {
        
      }
      }

    getCategories();

    if(isSubmitSuccessful){
      reset({
        name:"",
        updatedName:""
      })
    }
  }, [isSubmitSuccessful,reset,categories]);



async function handleDelete(){
  await apiConnector(`${CATEGORIES_URL}/${currentCategory._id}`,"DELETE")
  .then(toast("deleted successfully"),setcurrentCategory(""),setopenBox(0))
  .catch((e)=>toast(e.message));
}

async function handleCreate(data){
  await apiConnector(`${CATEGORIES_URL}`,"POST",data)
  .then(toast("created successfully"),setcurrentCategory(""),setopenBox(0))
  .catch((e)=>toast(e.message));
}

const handleUpdate = async(data) =>{
await apiConnector(`${CATEGORIES_URL}/${currentCategory._id}`,"POST",data)
.then(toast("updated successfully"),setcurrentCategory(""),setopenBox(0))
.catch((e)=>toast(e.message));
}

  return (
    <div className="justify-center flex flex-col md:flex-row ">
    <div className="md:w-3/4 p-3">

    <div className="h-12 font-bold text-3xl my-4 text-center">Manage Buyers</div>
     <input className="py-3 px-4 border border-black rounded-lg w-full text-black"
           type='name' 
            {...register("name")}
     />
      <br />
      <button 
      onClick={handleSubmit(data=>handleCreate(data))}
      className='my-6 h-10 bg-gradient-to-r from-[#1e1b4b] to-[#2e1065] w-48 rounded-md hover:scale-105 text-xl font-semibold'>Add</button>
      <hr className='mt-2'/>
 
    {
      loading ? (
        <Loader/>
      ) : (
        <div className="flex flex-wrap">
        {categories?.map((category) => (
          <div key={category._id}>
            <button
              className="py-2 px-4 rounded-lg m-3 bg-gradient-to-r from-[#1e1b4b] to-[#2e1065] hover:scale-105"
              onClick={() => {
                  setopenBox(true);
                  setcurrentCategory(category);
              }}
            >
              {category.name}
            </button>
          </div>
        ))}
      </div>
      )
    }
     
          
          {
            openBox ? (
              <div className="flex justify-center">
      <div className="space-y-3">
        <input
          type="name"
          {...register("updatedName")}
          className="py-3 px-4 border-2 border-black rounded-lg w-full text-black"
          placeholder= {`${currentCategory.name}`}
        />

        <div className="flex justify-between gap-4">
          <button className=" py-2 px-4 rounded-lg bg-gradient-to-r from-[#1e1b4b] to-[#2e1065] hover:scale-105"
          onClick={()=>setopenBox(0)}> 
            Cancel
          </button>
          
          <button
          type='submit'
          onClick={handleSubmit(data=>handleUpdate(data))}
              className=" py-2 px-4 rounded-lg bg-gradient-to-r from-[#1e1b4b] to-[#2e1065] hover:scale-105"
            >
              Update
            </button>

            <button
              onClick={handleDelete}
              className=" py-2 px-4 rounded-lg bg-gradient-to-r from-[#1e1b4b] to-[#2e1065] hover:scale-105"
            >
              Delete
            </button>

        </div>
      </div>
    </div>
            ) : (
              <div className='font-semibold text-lg'>Select To Update Or Delete</div>
            )
          }
    </div>
  </div>
  )
}

export default BuyerList