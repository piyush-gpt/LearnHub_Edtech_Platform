import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import learnhub from "../../assets/Logo/learnhublogo.png"
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { FiShoppingCart } from "react-icons/fi";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { FaChevronDown } from "react-icons/fa6";

function Navbar() {
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=> state.profile);
    const {totalItems}=useSelector((state)=> state.cart);
    const [subLinks,setSubLinks]=useState([]);
    useEffect(()=>{
         const getAllCategories= async () =>{
            try{
                const result=await apiConnector("GET",categories.CATEGORIES_API);
                setSubLinks(result.data.allCategories);

            }
            catch(e){
                console.log("could not fetch category list");

            }
        }
        getAllCategories();
    },[])

   return (
    <div className=' flex h-14 items-center justify-center border-b-[1px] border-richblack-700'>
        <div className=' flex w-11/12 items-center justify-between'>
            <Link className=' w-[13%]' to="/"><img src={learnhub}/></Link>
            <div>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks?.map((ele,idx)=>{
                            return(
                                <li key={idx}>
                                    {
                                        ele.title==="Catalog"?(
                                        <div className=' flex items-center gap-3 cursor-pointer group relative'>
                                            <p className=' text-richblack-100'>{ele.title}</p>
                                            <FaChevronDown/>
                                            <div className=' z-10 translate-x-[-50%] translate-y-[50%] invisible absolute left-[50%] top-[50%] flex flex-col  rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0  transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]
                                            group-hover:translate-y-[1.65em]'>
                                                <div className=' absolute left-[57.5%] top-[-9px] h-6 w-6 rotate-45 bg-richblack-5 rounded'>
                                                </div>
                                                {
                                                    subLinks?.length? (
                                                        subLinks?.map((ele,idx)=>(
                                                         <Link key={idx} to={`/catalog/${ele.name.toLowerCase().split(" ").join("-")}`}
                                                         className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'>
                                                           <p> {ele.name} </p>
                                                         </Link>   
                                                        ))
                                                    ):(<div></div>)
                                                }   
                                            </div> 
                                        </div>):(
                                            <NavLink to={ele?.path}
                                            className={({ isActive }) => (isActive ? ' text-yellow-25' : ' text-richblack-100')}><p>{ele.title}</p></NavLink>
                                        )
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div>
                <div className=' flex gap-x-4 items-center'>
                    {
                        user && user?.accountType!== "Instructor" && (
                            <Link to="/dashboard/cart" className=' relative text-richblack-25'>
                                <FiShoppingCart/>
                                {
                                    totalItems>0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token==null && (
                            <Link to="/login">
                                <button className=' border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token==null && (
                            <Link to="/signup">
                               <button className=' border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Sign up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token!=null && <ProfileDropDown/>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar