import React, { useEffect, useState  } from 'react'
import { RiEditBoxLine } from "react-icons/ri"
import IconBtn from '../../components/IconBtn'
import { apiConnector } from '../../redux/Utils/apiConnector'
import {  useNavigate, useParams } from 'react-router-dom'
import { PROFILE_URL} from '../../redux/Utils/constants';
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader';

const Profile = () => {

    const [user, setUser] = useState({});
    
    const {userinfo} = useSelector(state => state.auth);
    
    const [loading, setLoading] = useState(1);

    const {id} = useParams();

    useEffect(() => {

     const profileFetcher = async() => {
        try{

          const res = await apiConnector(`${PROFILE_URL}/${id}`,"GET",null,{Authorization: `Bearer ${userinfo.token}`});
          setUser(res.data.data);
          setLoading(0);

        } catch (e) {
          console.log(e);
        }
      }

      profileFetcher();
    }, [id,userinfo.token]);

    const navigate = useNavigate()
  
    return (
<div>
{
        loading ? ( <Loader/>
        ) : (
          <div className='w-[50rem] flex flex-col mx-auto h-auto'>
          <h1 className="my-8  text-3xl font-medium ">
            My Profile
          </h1>
          <div className="flex items-center justify-between  rounded-md text-[#f59e0b] bg-black border-[#f59e0b] border-2 p-8 px-12">
            <div className="flex items-center justify-between w-full">
            <div className='flex items-center gap-4'>
            <img
                src={user?.image}
                alt="Profile"
                className="aspect-square w-[78px] border-2 border-black rounded-full object-cover" />
              <div className="space-y-1">
                <p className="text-lg font-semibold">
                  {user?.fname}
                </p>
                <p className="text-sm">{user?.email}</p>
              </div>
            </div>
         
              <IconBtn
            text="Edit"
            onclick={() => {
              navigate(`/admin/updateProfile/${userinfo._id}`)
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
            </div>
          </div>
          <div className="my-4 flex flex-col gap-y-6 rounded-md text-[#f59e0b] border-[#f59e0b] bg-black border-2 p-8 px-12">
            <div className="flex w-full items-center justify-between">
              <p className="text-lg font-semibold">About</p>
              <IconBtn
              text="Edit"
              onclick={() => {
                navigate(`/admin/updateProfile/${userinfo._id}`)
              }}
            >
              <RiEditBoxLine />
            </IconBtn>
            </div>
            <p
              className="text-sm font-medium "
            >
              {user?.about ?? "Write Something About Yourself"}
            </p>
          </div>
          <div className="my-4 flex flex-col gap-y-6 rounded-md border-[#f59e0b] border-2 bg-black text-[#f59e0b] p-8 px-12">
            <div className="flex w-full items-center justify-between">
              <p className="text-lg font-semibold">
                Personal Details
              </p>
              <IconBtn
            text="Edit"
            onclick={() => {
              navigate(`/admin/updateProfile/${userinfo._id}`)
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
            </div>
            <div className="flex">
            <div className="flex flex-col w-full flex-wrap gap-4 h-[15vh]">
                <div>
                  <p className="mb-2 text-sm">First Name</p>
                  <p className="text-sm font-medium">
                    {user?.fname}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm">Email</p>
                  <p className="text-sm font-medium">
                    {user?.email}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm">Gender</p>
                  <p className="text-sm font-medium">
                    {user?.gender ?? "Add Gender"}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm">Date Of Birth</p>
                  <p className="text-sm font-medium">
                    {user.dob?.substring(0,10) ?? "Add DOB"}
                  </p>
                </div>
            </div>
            </div>
          </div>
        </div>
        )
      }
</div>
  
     
    )
  }
  

export default Profile
