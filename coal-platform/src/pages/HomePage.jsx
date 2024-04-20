import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginImg from "../assests/log.png";
import logo from "../assests/mainLogo.png";

import { RxHamburgerMenu } from "react-icons/rx";

const HomePage = () => {
    const [toggle, setToggle] = useState(false);

    const handleToggle = () =>{
        setToggle(!toggle);
    }

  return (
   <div className='w-full h-[100vh] flex flex-col gap-4  ' >
    <div className=' hidden w-[97%] mx-auto md:flex justify-between gap-[100px] font-poppins pt-3 ' >
        <div className='flex gap-5 ' >
            <Link to="/personal" ><p className=' border-b-[2px] border-b-[#5D59D9] ' >Personal</p></Link>
            <Link to="/business" ><p className=' transition-all duration-300 hover:border-b-[2px] hover:border-b-[#5D59D9] '>Business</p></Link>
            <Link to="/commercial" ><p className=' transition-all duration-300 hover:border-b-[2px] hover:border-b-[#5D59D9] '>Commercial</p></Link>
        </div>
        <div className='flex gap-5 ' >
            <Link to="/schedule-meeting" ><p className=' transition-all duration-300 hover:border-b-[2px] hover:border-b-[#5D59D9] '>Schedule a meeting</p></Link>
            <Link to="/customer-service" ><p className=' transition-all duration-300 hover:border-b-[2px] hover:border-b-[#5D59D9] '>Customer Service</p></Link>
        </div>
    </div>

    <div className=' mt-5 md:mt-0 md:w-[97%] mx-auto flex items-center gap-3 ' >
        <p className=' font-inter font-[800] text-2xl uppercase ' >Crusher - CRM</p>
        <img src={logo} className='w-[40px]' />
    </div>

    <div className=' md:bg-[#5D59D9] md:text-white md:font-semibold md:border-b-[2px] md:border-b-black  ' >
       <div className=' relative md:w-[97%] md:mx-auto py-5 font-poppins flex justify-between ' >
            <div  className={` ${toggle === true ? "flex w-full flex-col px-5 py-6  items-center gap-8 bg-[#5D59D9] text-white font-semibold border-b-[2px] border-b-black" : "hidden"} text-sm flex-col md:text-[16px] md:flex md:flex-row gap-8 items-center`} >
                <Link to="/" ><p className='border-b-[2px] border-b-white rounded-sm ' >Home</p></Link>
                <Link to="/" ><p className='transition-all duration-200 hover:border-b-[2px] hover:border-b-white rounded-sm ' >About Us</p></Link>
                <Link to="/" ><p className='transition-all duration-200 hover:border-b-[2px] hover:border-b-white rounded-sm ' >Services</p></Link>
                <Link to="/" ><p className='transition-all duration-200 hover:border-b-[2px] hover:border-b-white rounded-sm ' >Contact Us</p></Link>
            </div>
            <div className=' absolute right-2 top-[-25px] block md:hidden ' >
                <RxHamburgerMenu onClick={handleToggle} className=' bg-red-500 text-white px-2 py-2 rounded-lg w-[40px] h-[40px] cursor-pointer font-bold ' />
            </div>
            <div className=' hidden md:block ' >
            <Link to="/login" >
                <button 
                        className='w-full bg-white font-semibold text-black px-6 py-2 rounded-md
                        hover:bg-green-500 hover:text-white transition-all duration-300 ' 
                >Login</button>
            </Link>
            </div>
       </div>
    </div>
    <div className='w-full h-[450px]  md:mt-[-16px] ' >
        <div className=' w-[98%] md:w-[97%] mx-auto flex gap-[200px] font-poppins items-center justify-center ' >
            <div className='hidden lg:block w-[30%]' >
            <img src={LoginImg} className='w-[400px]' />
            </div>
            <div className='w-full lg:w-[25%] flex flex-col gap-2 px-10 py-8 bg-white rounded-lg ' >
                <p className='font-semibold text-xl ' >Welcome to CRM,</p>
                <p className='text-sm text-[#5D59D9] font-poppins '
        >Start your Journey with us</p>
                <Link to="/login" >
                <button 
                        className='w-full mt-4 bg-[#5D59D9] font-semibold text-white px-6 py-2 rounded-md
                        hover:bg-[#3632ad] hover:text-white transition-all duration-300 ' 
                >Sign In</button>
            </Link>
            </div>
        </div>
    </div>

   </div>
  )
}

export default HomePage