import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, redirect, useNavigate} from 'react-router-dom'
import { useEffect,useState} from "react";
import { useForm } from "react-hook-form";
import {toast} from 'react-toastify';
import { setcredentials } from '../../redux/Slices/authSlice';
import { apiConnector } from '../../redux/Utils/apiConnector';
import {LOGIN_API, GOOGLE_API} from '../../redux/Utils/constants';
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'
import { GoogleLogin } from '@react-oauth/google';
import { Input } from "../../components/Input";

const Login = () => {

    const {userinfo} = useSelector(state=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(0);
    const { register, 
            handleSubmit,
            reset, 
            formState: {errors,isSubmitSuccessful} 
          }  = useForm();
          
          useEffect(() => {
            if(isSubmitSuccessful){
              reset({
                email:"",
                password:""
              })
            }
            if(userinfo){
              navigate("/");
            }
          }, [isSubmitSuccessful,userinfo,navigate,reset]);

  
    const loginHandler = async(data,e) =>{
      e.preventDefault();
      const toastId = toast.loading("Loading...",{
        position: 'top-center',
      });
      try {
        const res = await apiConnector(LOGIN_API,"POST",data),
              userinform = res.data.existUser;

        dispatch(setcredentials(userinform));

        toast.dismiss(toastId);
        toast("Logged In");

        navigate("/")
      } catch (error) {
        toast.dismiss(toastId);
        toast.error(error.message);
      }
    }

    const googleLogin = async(token) =>{
      const toastId = toast.loading("Loading...",{
        position: 'top-center',
      });
      
      try {
        const res = await apiConnector(GOOGLE_API,"POST",{token}),
              userinform = res.data.existUser;
        
        dispatch(setcredentials(userinform));

        toast.dismiss(toastId);
        toast("logged in");
      } catch (error) {
        toast.dismiss(toastId);
        toast.error(error.message);
      }
    }

  return (
    <div className='min-h-screen bg-background p-6' >
    <div className='h-fit flex items-center justify-center'>
        <img src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80'
        alt=''
        className='md:h-[40rem] md:w-[35rem] h-0 w-0' />
        <section className='flex flex-col h-[45rem] w-[35rem]'>
        <p className='ml-6 mt-32 text-5xl font-semibold'>Sign In..</p>
        <form onSubmit={handleSubmit((data,e)=>loginHandler(data,e))} className='flex flex-col ml-6 mt-12' autoComplete='on'>
        <label htmlFor="email" className='mb-2 text-xl'>
              Email
        </label>
        <Input type='email' 
               id="email" 
               {...register("email",{required:true})}
                className='h-8 border-2 border-gray-300 rounded-sm'
                autoComplete='on'
               />
        {errors.email && (
            <span>
              Enter email
            </span>
          )}

          <label htmlFor="pass" className='relative mb-2 text-xl mt-2'>
              Password
              <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[41px] z-[10] cursor-pointer bg-transparent"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
          </label>
          <Input type={showPassword ? "text" : "password"}
                 id="pass" 
                 {...register("password",{required:true})}
                 className='h-8 border-2 border-gray-300 rounded-sm'
                       />
          {errors.password && (
            <span>
              Enter password
            </span>
          )}

           <button type='submit'
                   className='text-xl mt-4 h-16 w-[9.6rem] text-center hover:text-black rounded-xl border-[#f59e0b] border-2 hover:bg-primary'
                   >
            Submit
          </button>
        </form>

             <button onClick={()=>navigate("/otpLogin")} className='ml-52 mt-2 h-16 border-[#f59e0b] border-2 hover:bg-primary hover:text-black w-48 rounded-xl  '>
              Login with OTP
            </button>

         <div className='flex justify-between mx-5 text-xl mt-6 sm:max-lg:mt-10'>

         <h2 className='sm:max-lg:hidden'>SignUp with Google : </h2>
                <GoogleLogin
                onSuccess={credentialResponse => { googleLogin(credentialResponse.credential) }}
                onError={() => {console.log('Login Failed')}}
                useOneTap
                />
         </div>
          

           <p className='ml-6 mt-6 text-lg  sm:max-lg:mt-8'>
            Haven't Registered Yet? {" "}
            <Link to={redirect? `/SignUp`:`/SignUp?redirect=${redirect}`}
            className='text-red-500 hover:text-red-800'>
             Register
            </Link>
           </p>
     
        </section>
      </div>
    </div>
  )
}

export default Login