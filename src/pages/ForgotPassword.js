import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { setSignupData } from '../reducers/Slices/authSlice';
import { getPasswordResetToken } from '../services/operations/authAPI';
import toast,{Toaster}  from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
function ForgotPassword(){
    const navigate=useNavigate();
    const dispatch = useDispatch()
    const {loading}=useSelector((state)=> state.auth);
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      confirmPassword: "",
    })
  
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
    const { email, password, confirmPassword } = formData
  
    // Handle input fields, when some value changes
    const handleOnChange = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
      }))
    }
  
    // Handle Form Submission
    const handleOnSubmit = (e) => {
      e.preventDefault()
  
      if (password !== confirmPassword) {
        toast.error("Passwords Do Not Match")
        return
      }
      const signupData = {
        ...formData
      }
      dispatch(setSignupData(signupData))
      dispatch(getPasswordResetToken(formData.email,navigate));
    }  
  return (
    <div className='h-screen'>
        {loading?(<div className=' h-screen flex items-center justify-center text-richblack-300'><p>loading.......</p></div>):(
            <div className=' flex flex-col items-center gap-6 justify-center h-screen'>
            <p className=' text-white text-4xl font-semibold'>Reset your password</p>
            <p className=' text-richblack-25'>We will be sending an OTP to your mail </p>
      <form onSubmit={handleOnSubmit} className="flex w-[30%] flex-col gap-y-4 items-center justify-center">
        
        <label className=" w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className=" rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 w-full"
          />
        </label>
        <div className="flex flex-col gap-x-4 w-full items-center">
          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create new Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className=" w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm New Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 w-[50%]"
        >
          Send OTP
        </button>
      </form>
      </div>
        )}
    </div>
  )
   
}

export default ForgotPassword