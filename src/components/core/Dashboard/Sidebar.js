import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../Common/ConfirmationModal'

function Sidebar({small}) {
  const [confirmationModal,setConfirmationModal]=useState(null);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {user,loding:profileLoading}=useSelector((state)=> state.profile);
  const {loding:authLoading}=useSelector((state)=> state.auth);
  if(authLoading || profileLoading){
    return(
        <div className=" mt-30">
            loading.....
        </div>
    )
}
  return (
    <div>
    <div className=' flex flex-col lg:min-w-[222px]  border-r-[1px] border-r-richblack-900 lg:h-[calc(100vh-3.5rem)] bg-richblack-800 lg:py-10 text-white'>
      <div className=' flex flex-col gap-1 '>
        {
          sidebarLinks.map((link)=>{
            if(link.type && user?.accountType!== link.type){         
              return null;
            }
            return(
              <SidebarLink key={link.id} link={link} iconName={link.icon}/>
            )
          })
        }
      </div>
      <div className=' mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600 '></div>
      <div className=' flex flex-col'>
        <SidebarLink link={{name:"Settings", path:"dashboard/settings"}} iconName={"VscSettingsGear"}/>

        <button onClick={()=> !small?setConfirmationModal({
          text1:"Are You Sure ?",
          text2:"You will be logged out of your account",
          btn1Text:"Logout",
          btn2Text:"Cancel",
          btn1Handler:()=> dispatch(logout(navigate)),
          btn2Handler:()=> setConfirmationModal(null)
        }):dispatch(logout(navigate))} className=' font-medium text-sm text-richblack-300 w-full justify-center px-8 py-2'>
          <div className=' flex items-center gap-x-2 text-richblack-300'>
            <VscSignOut/>
            <span>
              Logout
            </span>
            </div>
        </button>
      </div>
      {confirmationModal && <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <ConfirmationModal modalData={confirmationModal}/>
        </div>}
    </div>
    </div>
  )
}

export default Sidebar