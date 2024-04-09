import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CourseInformation from './CourseInformation/CourseInformation';

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
        <div className=' flex items-center'>
        {steps.map((item)=>(
            <div className=' flex items-center'>
            <div className={`${step===item.id ? " bg-yellow-900 border-yellow-50 text-yellow-50":" bg-richblack-800 border-richblack-700 text-richblack-300"}`}>
                {step>item.id? <FaCheck/> : (item.id)}
            </div>
            {item.id!==3?(<span>------------------</span>):("")}
            
            </div>
        ))}
        </div>
        <div className=' flex items-center gap-5'>
            {steps.map((item) => (
                <>
                    <div>
                        <p>{item.title}</p>
                    </div>
                </>
            ))}
        </div>
        {step==1 && <CourseInformation/>}
    </div>
  )
}

export default RenderSteps