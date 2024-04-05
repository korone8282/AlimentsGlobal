import React from 'react'
import { useEffect,useState,useRef } from "react";
import { apiConnector } from '../../redux/Utils/apiConnector';
import { toast } from 'react-toastify';
import { GENOTP_URL,OTPLOG_URL } from '../../redux/Utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setcredentials } from '../../redux/Slices/authSlice';

const OtpLogin = () => {

    const [showOtp, setshowOtp] = useState(0);
    const [formData, setformData] = useState({
      email:"",
      otp: new Array(4).fill(""),
    });

    const inputRef = useRef([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        inputRef.current[0]?.focus();
    }, [showOtp]);

    function  indexHandler(index,e){

        formData.otp[index]=e.target.value;
        
        const finalOtp = formData.otp.join("");

        if(finalOtp.length===4){
         loginHandler();
          return;
        }
        
        if(index<3 && formData.otp[index]!==""){
          inputRef.current[index+1].focus();
        }
      }
    
    function keyHandler(index){
        inputRef.current[index].focus();
    }

    const submitHandle = async() =>{
        try {
          await apiConnector(GENOTP_URL,"POST",formData);
          toast("Otp sent to email");
          setshowOtp(1);
        } catch (error) {
          console.log("error sending otp",error);
        }
    }

    const loginHandler = async() =>{
      try {
        const res = await apiConnector(OTPLOG_URL,"POST",formData),
              userinfo = res.data.existUser;
        
        dispatch(setcredentials(userinfo));
        toast("logged in");
        navigate("/");
      } catch (error) {
        toast.error(error.message);
      }
    }

    function editHandle(e,index){
      if(e.key==="Backspace" && formData.otp[index]==="" && index>0){
        inputRef.current[index-1].focus();
      }
    }

  return (
    <div className='flex flex-col justify-center h-[100vh] items-center text-3xl gap-8 text-black'>
   
{showOtp?( 
<div className='flex flex-col gap-4'>
<div>
Enter OTP sent to 
</div>
        <div className='flex gap-4 text-black'>
        {
            formData.otp.map((key,index)=>(
                <input type='text'
                       name='otp'
                       ref={input=>(inputRef.current[index]=input)}
                       key={index}
                       maxLength='1'
                       className='h-12 w-12 text-center'
                       placeholder='-'
                       onChange={(e)=>indexHandler(index,e)}
                       onClick={()=>keyHandler(index)} 
                       onKeyDown={(e)=>editHandle(e,index)}
                       />
            ))
        
        } 
        </div>
        <div onClick={()=>setshowOtp(0)}>
            Edit Details?
        </div>
</div> ) : (
        <div>
         <div className='mb-8'>Enter Email</div>
        <div className='flex flex-col justify-center items-center text-3xl gap-8'>
           <input type='text'
           id='field'
           name="email"
           autoComplete='on'
           className='h-8 text-black border-2 border-gray-300 rounded-sm'
           placeholder='Enter Details'
           onChange={(e)=>setformData({...formData, email: e.target.value})}
           />

          <button onClick={submitHandle}>
            Get OTP
          </button>
    </div>

        </div>
          )}
</div>
  )
}
export default OtpLogin