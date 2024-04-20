import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CourseInformation from './CourseInformation/CourseInformation';
import CourseBuilder from './CourseBuilder/CourseBuilder';
import PublishCourse from './PublishCourse/PublishCourse';

function RenderSteps() {
    const {step} = useSelector((state)=> state.course);

    const steps = [
        {
            id:1,
            title: "Course Information",
        },
        {
            id:2,
            title: "Course Builder",
        },
        {
            id:3,
            title: "Publish",
        },
    ]

  return (
    <div>
        <div className=' flex items-center ml-10 text-richblack-5'>
        {steps.map((item)=>(
            <div className=' flex items-center'>
            <div className={`${step===item.id ? " bg-yellow-900 border-yellow-50 text-yellow-50  w-16 h-16 rounded-full flex justify-center items-center border-2 border-solid":" w-16 h-16 rounded-full bg-richblack-800 border-richblack-700 text-richblack-300 flex justify-center items-center"}`}>
                {step>item.id? <FaCheck/> : (item.id)}
            </div>
            {item.id!==3?(<span> - - - - - - - - - - - - - - - - -</span>):("")}
            
            </div>
        ))}
        </div>
        <div className=' flex items-center gap-28 mb-10'>
            {steps.map((item,idx) => (
                <>
                    <div>
                        <p className={`${idx==step-1?(' text-white'):(' text-richblack-800 font-bold')}`}>{item.title}</p>
                    </div>
                </>
            ))}
        </div>
        {step==1 && <CourseInformation/>}
        {step==2 && <CourseBuilder/>}
        {step==3 && <PublishCourse/>}
    </div>
  )
}

export default RenderSteps