import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
function EnrolledCourses() {
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
    <div>
    <div>EnrolledCourses</div>
    { ! enrolledCourses?(<div className=' flex h-full items-center justify-center'><span>Loading......</span></div>): ! enrolledCourses.length?(<p className=' text-white'>You have not enrolled in any course</p>):(
        <div>
            <div>
                <p>Course Name</p>
                <p>Duration</p>
                <p>Progress</p>
            </div>
            {enrolledCourses.map((course,idx)=>{
                <div>
                    <div>
                        <img src={course.thumbnail}/>
                        <div>
                            <p>{course.courseName}</p>
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