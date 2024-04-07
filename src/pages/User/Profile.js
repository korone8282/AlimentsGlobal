import React from 'react'
import { useSelector } from "react-redux"
import { RiEditBoxLine } from "react-icons/ri"
import IconBtn from '../../components/IconBtn'
import { useNavigate } from "react-router-dom"

const Profile = () => {

    const { userinfo } = useSelector((state) => state.auth);

    const navigate = useNavigate()
  
    return (
      <div className='w-[50rem] flex flex-col mx-auto h-auto'>
        <h1 className="my-8  text-3xl font-medium">
          My Profile
        </h1>
        <div className="flex items-center justify-between  rounded-md border-[1px]  p-8 px-12">
          <div className="flex items-center justify-between w-full">
          <div className='flex items-center gap-4'>
          <img
              src={userinfo?.image}
              alt="Profile"
              className="aspect-square w-[78px] rounded-full object-cover" />
            <div className="space-y-1">
              <p className="text-lg font-semibold">
                {userinfo?.fname}
              </p>
              <p className="text-sm">{userinfo?.email}</p>
            </div>
          </div>
       
            <IconBtn
          text="Edit"
          onclick={() => {
            navigate(`/user/updateProfile/${userinfo._id}`)
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
          </div>
        </div>
        <div className="my-4 flex flex-col gap-y-6 rounded-md border-[1px] p-8 px-12">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold">About</p>
            <IconBtn
            text="Edit"
            onclick={() => {
              navigate(`/user/updateProfile/${userinfo._id}`)
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
          </div>
          <p
            className="text-sm font-medium "
          >
            {userinfo?.about ?? "Write Something About Yourself"}
          </p>
        </div>
        <div className="my-4 flex flex-col gap-y-6 rounded-md border-[1px] p-8 px-12">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold">
              Personal Details
            </p>
            <IconBtn
          text="Edit"
          onclick={() => {
            navigate(`/user/updateProfile/${userinfo._id}`)
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
                  {userinfo?.fname}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm">Email</p>
                <p className="text-sm font-medium">
                  {userinfo?.email}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm">Gender</p>
                <p className="text-sm font-medium">
                  {userinfo?.gender ?? "Add Gender"}
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm">Date Of Birth</p>
                <p className="text-sm font-medium">
                  {userinfo?.dob ?? "Add DOB"}
                </p>
              </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
  

export default Profile
