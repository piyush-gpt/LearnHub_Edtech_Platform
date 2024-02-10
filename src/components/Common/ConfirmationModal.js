import React from 'react'
import IconBtn from './IconBtn'

function ConfirmationModal({modalData}) {
  return (
    <div className='  max-w-[350px] w-11/12 rounded-lg border border-richblack-400 bg-richblack-800 p-6'>
    <div>
        <p className="text-2xl font-semibold text-richblack-5">
            {modalData.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
            {modalData.text2}
        </p>
        <div className=' flex gap-x-4'>
            <IconBtn onclick={modalData?.btn1Handler} text={modalData?.btn1Text} customClasses={"flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined"}/>
            <button onClick={modalData?.btn2Handler} className='class="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"'> {modalData?.btn2Text}</button>
        </div>
    </div>
    </div>
  )
}

export default ConfirmationModal