import React from 'react'
import { useSelector } from 'react-redux'

function RenderCartCourses() {
    const {cart}=useSelector((state)=> state.cart);
  return (
    <div>
        {
            cart.map((course,idx)=>{
                <div>
                    <div>
                        <img src={course?.thumbnail} alt='course thumbnail'/>
                        <div>
                            <p>{course?.courseName}</p>
                            <p>{course?.category?.name}</p>
                            <div></div>
                        </div>
                    </div>
                </div>
            })
        }
    </div>
  )
}

export default RenderCartCourses