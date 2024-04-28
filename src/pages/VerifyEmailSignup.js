import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import OtpInput from 'react-otp-input';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { GiBackwardTime } from "react-icons/gi";

function VerifyEmailSignup() {
    const navigate=useNavigate();
    const [otp, setOtp] = useState('');
    const dispatch= useDispatch();
    const {signupData}=useSelector((state)=>state.auth);
    const {loading}=useSelector((state)=> state.auth);
    function handleSubmit(e){
        e.preventDefault();
        const{password,confirmPassword,email,firstName, lastName, accountType}=signupData;
        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate))
    }
    function handleResend(){
        dispatch(sendOtp(signupData.email,navigate));
    }
  return (
    <div className=' text-richblack-300 flex items-center justify-center h-screen'>
        {
            loading?(<div> Loading</div>):(
                <div className=' flex items-center justify-center flex-col gap-7 lg:w-[50%] w-full'>
                    <h1 className=' text-richblack-25 text-center text-4xl font-semibold'>
                        Verify Email
                    </h1>
                    <p className=' w-[50%]'>
                    A verification code has been sent to you. Enter the code below
                    </p>
                    <form onSubmit={handleSubmit} className=' md:w-1/2 w-full p-10 md:p-0'>
                        <OtpInput
                             value={otp}
                             onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span> </span>}
                             renderInput={(props) => <input {...props} className=' mx-1 p-1'/>}
                             inputStyle={{'width':'30%',
                             "height":"3rem",
                             "background":"#424854",
                             "borderRadius":"10px",
                             "color":"white"}}/>
                        <button type='submit' className=' mt-10 w-full bg-yellow-50 text-black py-2 rounded-md font-medium' >
                        Verify Email
                        </button>
                        
                    </form>
                    <div className=' md:w-[50%] w-full text-white flex items-center md:justify-between justify-around'>
                        <div className=' flex gap-2 items-center justify-center '>
                        <FaLongArrowAltLeft/>
                        <Link to={"/login"}>Back to Login</Link>
                        </div>
                        <div onClick={handleResend} className=' text-blue-200 flex gap-2 items-center justify-center cursor-pointer'>
                            <GiBackwardTime/>
                            <div>
                            Resend it
                            </div>
                        </div >
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmailSignup