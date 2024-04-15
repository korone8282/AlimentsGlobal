import React, { useState}  from 'react'
import { useSelector } from 'react-redux'; 
import { toast } from 'react-toastify'
import { apiConnector } from '../../redux/Utils/apiConnector'
import {  useNavigate, useParams } from 'react-router-dom'
import { PROFILE_URL,UPLOAD_URL} from '../../redux/Utils/constants';

const UpdateProfile = () => {

  const {userinfo} = useSelector(state => state.auth);

  const {id} = useParams();

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

  const toastId = toast.loading("Loading...",{
    position: 'top-center',
  });

  try{
    await apiConnector(`${PROFILE_URL}/${id}`,"PUT",file,{Authorization: `Bearer ${userinfo.token}`});
    
    toast.dismiss(toastId);
    toast("User successfully updated");
    navigate("/");

  } catch (e) {
    toast.dismiss(toastId);
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

    <div className='w-[40rem] border-2 h-[40rem] text-[#f59e0b] bg-black rounded-3xl'>
    <div className=' flex flex-col p-12 gap-10'>

   <div className='flex w-full justify-between text-2xl font-bold gap-12 items-center'>
              <img
                src={imageUrl ? imageUrl : "image here"}
                alt="Profile"
                className="rounded-full h-24 w-24 object-cover"
              />
            <label className="border border-[#f59e0b] max-w-96 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={e=>{
                    uploadFileHandler(e);
                }}
              />
            </label>
    </div>

    <div className='flex w-full justify-between text-2xl font-bold'>
    <label>Name: </label>
        <input  type='text'
                className='bg-transparent border-2 border-[#f59e0b] p-1'
                name='fname'
                onChange={(e)=>inputHandler(e)}
                />
    </div>

    <div className='flex w-full justify-between text-2xl font-bold'>
    <label>Gender: </label>
        <select type='text'
                className=' border-2 border-black p-3 bg-[#f59e0b] text-black text-xl font-semibold rounded-md'
                name='gender'
                onChange={(e)=>inputHandler(e)}
                >
                <option className='bg-[#f59e0b] font-semibold' value={"Male"}>Select</option>
                <option className='bg-[#f59e0b] font-semibold' value={"Male"}>Male  </option>
                <option className='bg-[#f59e0b] font-semibold' value={"Female"}>Female  </option>
                <option className='bg-[#f59e0b] font-semibold' value={"Others"}>Others  </option>
        </select> 
    </div>

    <div className='flex w-full justify-between text-2xl font-bold'>
    <label>About: </label>
        <input  type='text'
                className='bg-transparent border-2 border-[#f59e0b] p-1'
                name='about'
                onChange={(e)=>inputHandler(e)}
                />
    </div>

    <div className='flex w-full justify-between text-2xl font-bold'>
    <label>DOB: </label>
        <input  type='date'
                className='bg-transparent border-2 border-[#f59e0b] p-1'
                name='dob'
                onChange={(e)=>inputHandler(e)}
                />
    </div>

        <button  onClick={handleSubmit}
                className=' hover:scale-95 bg-[#f59e0b] text-black w-1/2 h-12 rounded-md mx-auto text-xl font-bold'>Update Profile</button>
      </div>
    </div>

    </div>
  )
}

export default UpdateProfile
