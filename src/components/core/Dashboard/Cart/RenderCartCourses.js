import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import {FaStar} from "react-icons/fa"
import {RiDeleteBin6Line} from "react-icons/ri"
import { removeFromCart } from '../../../../reducers/Slices/cartSlice';

function RenderCartCourses() {
    const dispatch=useDispatch();
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
                            <div>
                                <span>4.8</span>
                                <ReactStars
                                count={5}
                                value={course?.ratingAndReviews?.length}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<FaStar />}
                                fullIcon={<FaStar />}
                                />
                                <span className="text-richblack-400">
                                {course?.ratingAndReviews?.length} Ratings
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                        <button
                        onClick={() => dispatch(removeFromCart(course._id))}
                        className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                        >
                        <RiDeleteBin6Line />
                        <span>Remove</span>
                        </button>
                        <p className="mb-6 text-3xl font-medium text-yellow-100">
                        ₹ {course?.price}
                        </p>
                    </div>

                </div>
            })
        }
    </div>
  )
}

export default RenderCartCourses