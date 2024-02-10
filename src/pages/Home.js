import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import "./css/Home.css"
import Button from '../components/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import HighlightText from '../components/core/HomePage/HighlightText';
import logo1 from "../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../assets/TimeLineLogo/Logo4.svg"
import timeLineImg from "../assets/Images/TimelineImage.png"
import know_your_progress from "../assets/Images/Know_your_progress.png"
import compare_with_others from "../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../assets/Images/Plan_your_lessons.png"
import Instructor from "../assets/Images/Instructor.png"
import ExploreMore from '../components/core/HomePage/ExploreMore';

const timeline=[
    {
        logo:logo1,
        heading:"leadership",
        Description:"Fully committed to the success of company"
    },
    {
        logo:logo2,
        heading:"Responsibility",
        Description:"Students will always be our top priority"
    },
    {
        logo:logo3,
        heading:"Flexibility",
        Description:"The ability to switch is an important skills"
    },
    {
        logo:logo4,
        heading:"Solve the problem",
        Description:"Code your way to a solution"
    },
    
]

function Home() {
    
  return (
    <>
        {/* section one */}
        <div className=' text-white mx-auto flex flex-col w-11/12 items-center relative
         '>
                <div id='shadow' className='group mt-20 px-8 py-[10px] rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-110'>
                <Link to={'/signup'}>
                    <div className='gap-2.5 flex items-center justify-around'>
                        <p>Become an Instructor</p>
                        <FaArrowRight className='group-hover:translate-x-2'/>
                    </div>
                    </Link>
                </div>
           

            <div className='text-white'>
                <p className='mt-10 text-4xl font-bold text-center'>
                Empower Your Future with <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'>Coding Skills</span>
                </p>
            </div>
            <div className='mt-6 text-center w-[90%] text-lg font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>
            <div className='mt-8 flex gap-7'>
                <Button active={true} linkto={"/signup"}>
                    Learn More
                </Button>
                <Button active={false} linkto={"/login"} >
                    Book a Demo
                </Button>
            </div>

            <div className='  mx-3 my-12 w-[80%] shadow-[10px_-5px_50px] shadow-blue-200'>
                <video muted loop autoPlay className="shadow-[20px_20px_rgba(255,255,255)]">
                    <source src={Banner} type='video/mp4'/>
                </video>
            </div>

            {/* code section 1 */}
            <div>
                <CodeBlocks position={"lg:flex-row" } heading={<div className='text-4xl font-semibold'>Unlock your <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'>coding potential</span> with our online courses</div>} subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"}
                btn1={{
                    btnText:"Try it Yourself",
                    linkto:"/signup",
                    active:true
                }}  btn2={{
                    btnText:"learn more",
                    linkto:"/login",
                    active:false
                }}
                codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><a href="/">Header</a>\n/h1>\nnav><a href="one/">One</a><a href="two/">Two</a>\n<a href="three/">Three</a>\n/nav>`}
                codecolour={"text-yellow-25"}
                
                backgroundGradient={"bg-yellow-5"}/>
            </div>

            {/* code section 2 */}

            <div>
                <CodeBlocks position={"lg:flex-row-reverse" } heading={<div className='text-4xl font-semibold'>Start <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'>coding in seconds</span></div>} subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                btn1={{
                    btnText:"try it yourself",
                    linkto:"/signup",
                    active:true
                }}  btn2={{
                    btnText:"learn more",
                    linkto:"/login",
                    active:false
                }}
                codeblock={`import React from 'react'\nimport Button from './Button'\nimport { FaArrowRight } from 'react-icons/fa'\nimport { TypeAnimation } from 'react-type-animation'
                \nfunction Home() {\nreturn (\n<div> Home </div>\n)\n}\nexport default Home`}
                codecolour={"text-white"}
                backgroundGradient={"bg-blue-300"}/>
            </div>

            <ExploreMore/>
        </div>

        {/* section 2 */}
        <div className=' bg-pure-greys-5 text-richblack-700'>
            <div className=" homepage_bg h-[310px]">
                <div className='w-11/12 mx-auto'>
                    <div className='h-[250px]'>

                    </div>
                    <div className=' flex items-center gap-20 justify-center'>
                        <Button active={true} linkto={"/signup"}>
                            <div className='flex gap-4 items-center'>
                                Explore Full Catelog
                                <FaArrowRight/>
                            </div>
                        </Button>
                       
                        <Button active={false} linkto={"/login"}>
                            Lern More
                        </Button>
                    </div>
                </div>
            </div>
            <div className=' w-11/12 mx-auto flex flex-col items-center gap-7 justify-between mt-28 mb-20'>
                <div className=' flex gap-5 justify-between'>
                    <p className='w-[45%] text-4xl font-bold'>
                    Get the skills you need for a<HighlightText text={"job that is in demand."}/>
                    </p>
                    <div className='w-[40%]'>
                        <p className=' mb-10'>
                        The modern LearnHub is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </p>
                        <div className='w-[30%]'>
                        <Button active={true} linkto={"/signup"}>Learn More</Button>
                        </div>
                    </div>
                </div>

                {/* time line section */}
                <div className=' mt-20'>
                    <div className=' flex gap-20 items-start justify-between'>
                        <div className=' flex flex-col w-[40%] gap-3'>
                            {
                                timeline.map((ele,idx)=>{
                                    return (
                                    <div className='flex flex-col' key={idx}>
                                        <div className='flex gap-6 '>
                                            <div className=' w-[60px] h-[60px] bg-white flex items-center justify-center rounded-full'>
                                                <img src={ele.logo}/>
                                                
                                            </div>
                                            <div className=' '>
                                                <p className=' font-bold text-xl mb-3'>
                                                    {ele.heading}
                                                </p>
                                                <p className=' text-base'>
                                                    {ele.Description}
                                                </p>
                                            </div>
                                        </div>
                                        {idx!=3?<div className="hidden lg:block  h-14 border-dotted border-r border-richblack-100 w-[28px] mt-2">
                                        </div>:""}
                                    </div>)
                                })
                            }
                        </div>
                        <div className=' w-[60%] relative shadow-[10px_-5px_50px] shadow-blue-200'>
                            <img src={timeLineImg} className=' shadow-[20px_20px_rgba(255,255,255)]'/>

                            <div className=' py-5 absolute bg-caribbeangreen-700 flex text-white uppercase left-[50%] translate-x-[-50%] translate-y-[-50%] px-10'>
                                <div className=' flex gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                                    <p className=' text-3xl font-bold'>10</p>
                                    <p className=' text-caribbeangreen-300 text-sm'>Years of Experience</p>
                                    <p></p>
                                </div>
                                <div className=' flex gap-5 items-center px-7'>
                                    <p className=' text-3xl font-bold'>
                                        250
                                    </p>
                                    <p className='text-caribbeangreen-300 text-sm'>
                                        Type of Courses
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* learning language section */}
                <div className=' flex flex-col gap-5 mt-20 items-center'>
                    <div className=' text-4xl font-semibold text-center'>
                    Your swiss knife for<HighlightText text={"learning any language"}/>
                    </div>
                    <div className='w-[80%] text-center text-richblack-600 mx-auto text-base mt-1 font-semibold'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                    </div>

                    <div className=' flex items-center justify-center mt-5 relative'>
                        <img src={know_your_progress} alt="KnowyourProgressImage"className=' object-contain relative left-[154px]'/>
                        <img src={compare_with_others}alt="CompareWithOthersImage" className=' object-contain relative left-[30px]'/>
                        <img src={plan_your_lessons} alt='PlanYourLessonsImage' className=' object-contain relative right-[128px]'/>
                    </div>
                    <div className=' w-40 '>
                        <Button active={true} linkto={"/signup"}>Learn More</Button>
                    </div>
                </div>
            </div>
        </div>

        {/* section 3  */}
        <div className=' text-white mx-auto flex flex-col w-11/12 items-center mt-16'>
            <div  className=' flex gap-24 items-center '>
                <div className=' w-[50%]'>
                    <img  className="shadow-[-20px_-20px_rgba(255,255,255)]" src={Instructor}/>
                </div>
                <div className='w-[50%] flex flex-col items-start gap-10'>
                    <p className=' text-4xl font-semibold w-[50%]'>
                        Become an<HighlightText text={"Instructor"}/>
                    </p>
                    <p className='font-medium text-richblack-300 w-[80%]'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>
                    <Button active={true} linkto={"/signup"}>
                    <div className='flex gap-4 items-center'>
                        <p>Start Teaching Today</p>
                        <FaArrowRight/>
                    </div>
                </Button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home