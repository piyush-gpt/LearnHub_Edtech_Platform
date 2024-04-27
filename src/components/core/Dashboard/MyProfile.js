import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";

function MyProfile() {
  const {user}= useSelector((state)=> state.profile);
  const navigate= useNavigate();
  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">My Profile</h1>
      <div className="flex sm:flex-row flex-col sm:gap-0 gap-3 items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className=' flex sm:flex-row flex-col items-center gap-x-4 '>
          <img src={user?.image} alt={`profile-${user?.firstName}`} className=' aspect-square w-[70px] rounded-full object-cover'/>
          <div className=' space-y-1'>
            <p className='text-lg font-semibold text-richblack-5 sm:text-left text-center'>{user?.firstName + " " + user?.lastName}</p>
            <p className=' text-sm text-richblack-300 sm:text-left text-center'>{user?.email}</p>
          </div>
        </div>
        <Link to="/dashboard/settings" className=" flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900">
          <span>Edit</span>
          <FaEdit/>
          </Link>
      </div>
      <div className=" my-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className=' flex  sm:flex-row flex-col items-center justify-between sm:gap-0 gap-3'>
        <p className=' text-white font-semibold text-lg'>About</p>
        <Link to="/dashboard/settings" className=" flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900">
        <span>Edit</span>
          <FaEdit/>
          </Link>
          </div>
          <p className='text-richblack-300 mt-5 sm:text-left text-center'>{
          user?.additionalDetails?.about?(user?.additionalDetails?.about):("Write something about yourself")}</p>
      </div>
      <div className=" my-10   rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className=' flex items-center justify-between sm:flex-row flex-col sm:gap-0 gap-3'>
        <p className=' text-white font-semibold text-lg'>Personal Details</p>
        <Link to="/dashboard/settings" className=" flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900">
        <span>Edit</span>
          <FaEdit/>
          </Link>
          </div>
          <div className="flex sm:flex-row flex-col sm:flex max-w-[500px] justify-between mt-10">
            <div className=' flex flex-col gap-y-5'>
              <div>
                <p className='mb-2 text-sm text-richblack-600'>First Name</p>
                <p className='text-sm font-medium text-richblack-5'>{user?.firstName}</p>
              </div>
              <div>
                <p className='mb-2 text-sm text-richblack-600'>Email</p>
                <p className='text-sm font-medium text-richblack-5'>{user?.email}</p>
              </div>
              <div>
                <p className='mb-2 text-sm text-richblack-600'>Gender</p>
                <p className='text-sm font-medium text-richblack-5'>{
                user?.gender? (user?.gender):("Add Gender")
                }</p>
              </div>
            </div>
            <div className=' flex flex-col gap-y-5'> 
              <div>
                <p className='mb-2 text-sm text-richblack-600'>Last Name</p>
                <p className='text-sm font-medium text-richblack-5'>{user?.lastName}</p>
              </div>
              <div>
                <p className='mb-2 text-sm text-richblack-600'>Phone Number</p>
                <p className='text-sm font-medium text-richblack-5'>
                {
                user?.additionalDetails?.contactNumber? (user?.additionalDetails?.contactNumber):("Add Contant Number")
                }</p>
              </div>
              <div>
                <p className='mb-2 text-sm text-richblack-600'>Date Of Birth</p>
                <p className='text-sm font-medium text-richblack-5'>{
                user?.additionalDetails?.dob? (user?.additionalDetails?.dob):("Add date of birth")
                }</p>
              </div>
            </div>
          </div>
      </div>

    </div>
  )
}

export default MyProfile