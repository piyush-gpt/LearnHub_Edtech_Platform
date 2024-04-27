import React from 'react'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
function CodeBlocks({position , heading , subheading , btn1, btn2, codeblock, backgroundGradient, codecolour}) {
  return (
    <div className={` lg:flex ${position} my-20 justify-between flex flex-col gap-5 `}>
        <div className=' lg:w-[50%] flex flex-col gap-8'>
            {heading}
            <div className=' text-richblack-300 font-bold text-base lg:w-[85%] '>
                {subheading}
            </div>
            <div className='flex gap-7 mt-7 mb-10 lg:mb-0'>
                <Button active={btn1.active} linkto={btn1.linkto}>
                    <div className='flex gap-4 items-center text-sm md:text-lg'>
                        <p>{btn1.btnText}</p>
                        <FaArrowRight/>
                    </div>
                </Button>
                <Button active={btn2.active} linkto={btn2.linkto} >
                        <p className=' text-sm md:text-lg'>{btn2.btnText}</p>
                </Button>

            </div>
        </div>
        <div className='flex  lg:w-[500px] gap-2 leading-6 text-sm border-solid border-white border-2 bg-blue-900 p-5 relative'>
            <div className={` rounded-full ${backgroundGradient} h-[80%]  w-[80%] absolute blur-[34px] opacity-20 top-[-5%] left-[-5%]`}>
            </div>
            <div className='flex w-[7%] flex-col justify-start text-center font-inter font-bold text-richblack-400 select-none'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`  w-[93%] font-bold ${codecolour} select-none`}>
            <TypeAnimation
                    style={{ whiteSpace: 'pre-line', display: 'block' }}
                    sequence={[codeblock,
                        1000,
                        ''
                    ]}
                    repeat={Infinity}
                    omitDeletionAnimation={true}
                    />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks