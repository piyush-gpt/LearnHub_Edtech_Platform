import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import learnhub from "../../assets/Logo/learnhublogo.png"
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { FiShoppingCart } from "react-icons/fi";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { FaChevronDown } from "react-icons/fa6";
import { IoReorderThree } from "react-icons/io5";
import Sidebar from '../core/Dashboard/Sidebar'

function Navbar() {
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=> state.profile);
    const {totalItems}=useSelector((state)=> state.cart);
    const [subLinks,setSubLinks]=useState([]);
    const[responsive,isResponsive]=useState(false);
    const[catalog,isCatalog]=useState(false);
    const location=useLocation();
    
    useEffect(()=>{
        isResponsive(false)
    },[location.pathname])
    
    function setCatalog(){
        isCatalog(!catalog)
    }
    function setResponsive(){
        isResponsive(!responsive)
        if(!responsive){
            isCatalog(false)
        }
    }
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
    <div className=' flex  h-14 items-center lg:justify-center border-b-[1px] border-richblack-700 lg:flex-row justify-between'>
        <div className=' flex w-11/12 items-center justify-between lg:flex hidden'>
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
                                            <div className=' z-50 translate-x-[-50%] translate-y-[50%] invisible absolute left-[50%] top-[50%] flex flex-col  rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0  transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]
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
                                        <span className='absolute bottom-1 right-3 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100'>
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
        <div className=' lg:hidden text-[50px] text-blue-50 ' onClick={setResponsive}> <IoReorderThree />
        </div>
        <Link className=' w-[20%] lg:hidden' to="/"><img src={learnhub}/></Link>

 { <div className={` absolute top-14 left-0 transition-all duration-[1s] text-white z-50 bg-richblack-900 w-[200px] p-3 rounded-sm lg:hidden ${responsive? " translate-x-0": " -translate-x-full"}`}>
 <div className=' flex-col items-center '>
            <div className=' text-sm '>
                <ul className='flex flex-col gap-3 text-richblack-25 items-center  '>
                    {
                        NavbarLinks?.map((ele,idx)=>{
                            return(
                                <li key={idx}>
                                    {
                                        ele.title==="Catalog"?(
                                        <div className='flex flex-col  gap-3 items-center relative '>
                                            <div className=' flex items-center' onClick={setCatalog}>
                                            <p className=' text-richblack-100'>{ele.title}</p>
                                            <FaChevronDown/>
                                            </div>
                                            <div className={`${catalog?"flex flex-col text-white b items-center": "hidden" } bg-richblack-500 `}>
                                                {
                                                    subLinks?.length? (
                                                        subLinks?.map((ele,idx)=>(
                                                         <Link key={idx} to={`/catalog/${ele.name.toLowerCase().split(" ").join("-")}`}
                                                         className='rounded-lg  p-2 '>
                                                           <p className=" break-words max-w-[180px]"> {ele.name} </p>
                                                         </Link>   
                                                        ))
                                                    ):(<div className=' text-sm'>lkvnhweuifheiubvwvbwlvhwe</div>)
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
                <div className='flex flex-col gap-3 items-center mt-5'>
                    
                    {token==null && <div className=' flex items-center justify-center  w-full gap-5 mt-5'>
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
                    </div>}
                    {
                        token!=null && <ProfileDropDown/>
                    }
                </div>
            </div>
            {user && 
            <div className=' mt-5'><Sidebar small={true}/>
            </div>}
        </div>
 </div>}

    </div>
  )
}

export default Navbar