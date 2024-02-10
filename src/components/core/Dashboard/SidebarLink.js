import React from 'react'
import * as Icons from "react-icons/vsc"
import { NavLink, matchPath } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
function SidebarLink({link, iconName}) {
    const location=useLocation();
    const Icon=Icons[iconName];
    const dispatch=useDispatch();
    const matchRoute=(route)=>{
        return matchPath({path:route},location.pathname);
    }
  return (
    <NavLink to={link.path} className={`${matchRoute(link.path)? " bg-yellow-500" :"bg-opacity-0"} px-8 py-2 text-sm relative`}  >
        <span className={` absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path)? "bg-opacity-100": "bg-opacity-0"}`}>

        </span>
        <div className=' flex items-center gap-x-2 font-medium text-richblack-300'>
            <Icon className=" text-lg"/>
            <span>
                {link.name}
            </span>
        </div>

    </NavLink>
  )
}

export default SidebarLink
