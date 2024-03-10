import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';
function EnrolledCourses() {
    const navigate=useNavigate();
    const {token}=useSelector((state)=> state.auth);
    const [enrolledCourses,setEnrolledCourses]=useState(null);
    const getEnrolledCourses= async()=>{
        try{
            const result= await getUserEnrolledCourses(token);
            setEnrolledCourses(result);
        }
        catch(e){
            console.log("Unable to fetch enrolled Courses");
        }
    }
    useEffect(()=>{
        getEnrolledCourses();
    },[]);
  return (
    <div className=' text-white'>
    <div className=' text-3xl text-richblack-50'>EnrolledCourses</div>
    { ! enrolledCourses?(<div className=' flex h-full items-center justify-center'><span>Loading......</span></div>): ! enrolledCourses.length?(<p className=' text-white'>You have not enrolled in any course</p>):(
        <div className='my-8 text-richblack-5'>
            <div className='flex rounded-t-lg bg-richblack-500 '>
                <p className='"w-[45%] px-5 py-3 '>Course Name</p>
                <p className='w-1/4 px-2 py-3'>Duration</p>
                <p className=' flex-1 px-2 py-3'>Progress</p>
            </div>
            {enrolledCourses.map((course,idx,arr)=>{
                return <div key={idx} className={`flex items-center border border-richblack-700 ${
                    idx === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                  }`}>
    
                    <div  className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}>
                        <img src={course.thumbnail}className="h-14 w-14 rounded-lg object-cover"  alt='courseImg' />
                        <div className=' flex flex-col gap-2'>
                            <p  className="font-semibold">{course.courseName}</p>
                            <p>{course.courseDescription}</p>
                        </div>
                    </div>
                    <div>
                        {course?.totalDuration}
                    </div>
                    <div>
                        <p>Progress:{course.progressPercentage || 0}</p>
                        <ProgressBar completed={course.progressPercentage || 0}
                        height='8px'
                        isLabelVisible={false}/>
                    </div>
                </div>
            })}
        </div>
    )}
    </div>
  )
}

export default EnrolledCourses