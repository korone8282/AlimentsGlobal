import React from 'react'
import { CATEGORIES_URL  } from '../../redux/Utils/constants';
import { apiConnector } from '../../redux/Utils/apiConnector';
import { useForm } from "react-hook-form";
import { useState , useEffect} from 'react';
import {toast} from 'react-toastify';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';

const Buyer = () => {

  const {userinfo} = useSelector(state=>state.auth);

  const { register, 
    handleSubmit,
    reset, 
    formState: {isSubmitSuccessful} 
  }  = useForm();
  
  const [openBox, setopenBox] = useState(0);
  const [categories, setcategories] = useState([]); 
  const [currentCategory, setcurrentCategory] = useState();
  const [loading, setLoading] = useState(1);

  useEffect(() => {

    async function getCategories(){
      try {

    const res = await apiConnector(`${CATEGORIES_URL}/categories`,"GET");
    setcategories(res.data.data);

    setLoading(0);
      } catch (error) {
        console.log(error);
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
  try {
    
    await apiConnector(`${CATEGORIES_URL}/${currentCategory._id}`,"DELETE",null,{Authorization: `Bearer ${userinfo.token}`});

    toast("deleted successfully");
    setcurrentCategory("");
    setopenBox(0);

  } catch (error) {
    console.log(error);
  }
}

async function handleCreate(data){
  try {

    await apiConnector(`${CATEGORIES_URL}`,"POST",data,{Authorization: `Bearer ${userinfo.token}`});

    toast("created successfully");
    setcurrentCategory("");
    setopenBox(0);
    
  } catch (error) {
    console.log(error)
  }
}

const handleUpdate = async(data) =>{
  try {

    await apiConnector(`${CATEGORIES_URL}/${currentCategory._id}`,"POST",data,{Authorization: `Bearer ${userinfo.token}`});

    toast("updated successfully");
    setcurrentCategory("");
    setopenBox(0);

  } catch (error) {
    console.log(error);
  }
}

  return (
    <div className="justify-center flex flex-col md:flex-row">
    <div className="md:w-3/4 p-3">

    <div className="h-12 font-bold text-3xl my-4 text-center">Manage Buyers</div>
     <input className="py-3 px-4 border border-black rounded-lg w-full text-black"
           type='name' 
            {...register("name")}
     />
      <br />
      <button 
      onClick={handleSubmit(data=>handleCreate(data))}
      className='my-6 h-10 text-[#f59e0b] bg-black border-[#f59e0b] border-2 w-48 rounded-md hover:scale-105 text-xl font-semibold'>Add</button>
      <hr className='mt-2'/>
 
    {
      loading ? (
        <Loader/>
      ) : (
        <div className="flex flex-wrap">
        {categories?.map((category) => (
          <div key={category._id}>
            <button
              className="py-2 px-4 rounded-lg m-3 text-[#f59e0b] bg-black border-[#f59e0b] border-2 font-semibold hover:scale-105"
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
              <div className="flex justify-center my-12">
      <div className="space-y-3">
        <input
          type="name"
          {...register("updatedName")}
          className="py-3 px-4 border-2 border-black rounded-lg w-full"
          placeholder= {`${currentCategory.name}`}
        />

        <div className="flex justify-between gap-4">
          <button className=" py-2 px-4 rounded-lg text-[#f59e0b] bg-black border-[#f59e0b] border-2 font-semibold hover:scale-105"
          onClick={()=>setopenBox(0)}> 
            Cancel
          </button>
          
          <button
          type='submit'
          onClick={handleSubmit(data=>handleUpdate(data))}
              className=" py-2 px-4 rounded-lg text-[#f59e0b] bg-black border-[#f59e0b] border-2 font-semibold hover:scale-105"
            >
              Update
            </button>

            <button
              onClick={handleDelete}
              className=" py-2 px-4 rounded-lg text-[#f59e0b] bg-black border-[#f59e0b] border-2 font-semibold hover:scale-105"
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

export default Buyer