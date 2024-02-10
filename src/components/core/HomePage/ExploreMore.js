import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import { HiMiniUsers } from "react-icons/hi2";
import { TbBinaryTree2 } from "react-icons/tb";

const tablename=[
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]
function ExploreMore() {
    const [currentTab,setCurrentTab]= useState(tablename[0]);
    const[courses,setCourses]= useState(HomePageExplore[0].courses);
    const[currCard,setCurrCard]=useState(HomePageExplore[0].courses[0].heading);
    function setMyCard(ele){
        setCurrentTab(ele);
        const result=HomePageExplore.filter((currCourse)=> currCourse.tag===ele);
        setCourses(result[0].courses);
        setCurrCard(result[0].courses[0].heading);
    }
    function changeHeading(ele){
        setCurrCard(ele.heading);
    }
  return (
    <div className=' flex flex-col gap-5 items-center mt-16 '>
        <div className=' text-4xl font-semibold text-center'>
            Unlock the<HighlightText text={"Power of Code"}/>
        </div>
        <div className="text-center text-richblack-300 text-lg font-semibold">
             Learn to Build Anything You Can Imagine
        </div>
        <div className='text-[16px] flex items-center rounded-full bg-richblack-800 px-1 py-1 mb-44'>
            {
                tablename.map((ele,idx)=>{
                    return (
                        <div key={idx} className={`${ele===currentTab?"bg-richblack-900 text-richblack-5 font-medium":"text-richblack-200 "} rounded-full
                         cursor-pointer translation-all duration-200 hover:text-richblack-5 px-10 py-2 text-[16px]`} onClick={()=>setMyCard(ele)}>
                            {ele}
                        </div>
                    )
                })
            }
        </div>
        <div className=' flex gap-10 items-center absolute lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] w-[100%] justify-center '>
            {
                courses.map((ele,idx)=>{
                    return(
                        <div onClick={()=>changeHeading(ele)} key={idx} className={`${currCard===ele.heading?" bg-white shadow-[12px_12px] shadow-yellow-50":" bg-richblack-800"} cursor-pointer text-richblack-200  w-[30%] h-[250px] 
                        flex flex-col justify-between p-2`}>
                            <div className=' border-b-[2px] border-richblack-400 border-dashed h-[75%] p-4'>
                                <p className={`${currCard===ele.heading?"text-richblack-900":"text-richblack-25"} text-[20px] font-semibold mb-3`}>
                                    {ele.heading}
                                </p>
                                <p>
                                    {ele.description}
                                </p>
                            </div>
                            <div className={`flex items-center justify-between h-fit p-5
                            ${currCard===ele.heading? "text-blue-300":"text-richblack-200"} `}>
                                <div className=' flex items-center gap-2'>
                                    <HiMiniUsers/>
                                    <p>{ele.level}</p>
                                </div >
                                <div className=' flex items-center gap-2'>
                                    <TbBinaryTree2/>
                                    <p>
                                        {ele.lessionNumber} Lessons
                                    </p>
                                </div>
                             </div>   
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ExploreMore