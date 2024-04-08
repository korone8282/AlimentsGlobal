import React, { useState,useEffect }  from 'react'
import { useSelector } from 'react-redux'; 
import { toast } from 'react-toastify'
import { apiConnector } from '../../redux/Utils/apiConnector'
import {  useNavigate, useParams } from 'react-router-dom'
import { PROFILE_URL,UPLOAD_URL} from '../../redux/Utils/constants';

const UpdateProfile = () => {

  const {userinfo} = useSelector(state => state.auth);

  const [user, setUser] = useState({});

  const {id} = useParams();

  useEffect(() => {

    const profileFetcher = async() => {
       try{
         const res = await apiConnector(`${PROFILE_URL}/${id}`,"GET",null,{Authorization: `Bearer ${userinfo.token}`});
         setUser(res.data.data);
         console.log(res);
     
       } catch (e) {
         console.log(e);
       }
     }

     profileFetcher();
   }, [id,userinfo.token]);

  const [imageUrl, setimageUrl] = useState("");

  const navigate = useNavigate();

  const [data, setData] = useState({
    fname:"",
    dob:"",
    gender:"",
    image:"",
    about:"",
});

const uploadFileHandler = async(e) =>{
  
  const file = new FormData();
  file.append('image',e.target.files[0]);

  try {

      const res = await apiConnector(UPLOAD_URL,"POST",file);
      toast("image successfully uploaded");
      data.image=res.data.image.substring(9);
      setimageUrl(res.data.image.substring(9));

  } catch (error) {
      toast.error(error);
  }

}

async function handleSubmit(){

  const file = new FormData();

  file.append('fname',data.fname);
  file.append('dob',data.dob);
  file.append('gender',data.gender);
  file.append('image',data.image);
  file.append('about',data.about);

  try{
    await apiConnector(`${PROFILE_URL}/${id}`,"PUT",file,null,{Authorization: `Bearer ${userinfo.token}`});
    toast("User successfully updated");
    navigate("/");

  } catch (e) {
    console.log(e);
  }
      }

  const inputHandler = async(e) =>{
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <div className='flex justify-center items-center h-[90vh]'>

    <div className='w-[40rem] border-2 h-[40rem]'>
    <div className=' flex flex-col p-12 gap-10'>

   <div className='flex w-full justify-between text-2xl font-bold gap-12 items-center'>
              <img
                src={imageUrl ? imageUrl : user.image}
                alt="product"
                className="rounded-full h-24 w-24"
              />
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
            {imageUrl ? "" : "Upload Image"} 
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={e=>{
                    uploadFileHandler(e);
                }}
                className={!data.image ? "hidden" : "text-white"}
              />
            </label>
    </div>

    <div className='flex w-full justify-between text-2xl font-bold'>
    <label>Name: </label>
        <input  type='text'
                className='bg-transparent border-2 p-1'
                name='fname'
                onChange={(e)=>inputHandler(e)}
                />
    </div>

    <div className='flex w-full justify-between text-2xl font-bold'>
    <label>Gender: </label>
        <select type='text'
                className='bg-transparent border-2 p-3 text-xl font-semibold rounded-md border-[#2e1065] hover:bg-gradient-to-r from-[#1e1b4b] to-[#2e1065]'
                name='gender'
                onChange={(e)=>inputHandler(e)}
                >
                <option className='bg-[#2e1065]' value={"Male"}>Select</option>
                <option className='bg-[#2e1065]' value={"Male"}>Male  </option>
                <option className='bg-[#2e1065]' value={"Female"}>Female  </option>
                <option className='bg-[#2e1065]' value={"Others"}>Others  </option>
        </select> 
    </div>

    <div className='flex w-full justify-between text-2xl font-bold'>
    <label>About: </label>
        <input  type='text'
                className='bg-transparent border-2 p-1'
                name='about'
                onChange={(e)=>inputHandler(e)}
                />
    </div>

    <div className='flex w-full justify-between text-2xl font-bold'>
    <label>DOB: </label>
        <input  type='date'
                className='bg-transparent border-2 p-1'
                name='dob'
                onChange={(e)=>inputHandler(e)}
                />
    </div>

        <button  onClick={handleSubmit}
                className=' hover:scale-95 bg-gradient-to-r from-[#1e1b4b] to-[#2e1065] w-1/2 h-12 rounded-md mx-auto text-xl font-bold'>Update Profile</button>
      </div>
    </div>

    </div>
  )
}

export default UpdateProfile
