import React from 'react'
import { Link } from 'react-router-dom'
import LoginImg from "../assests/log.png";

const HomePage = () => {
  return (
   <div className='w-full h-[100vh] ' >
         <div className='w-full h-[90%] flex justify-between gap-[100px] font-poppins pb-10' >
    {/* image */}
    <div className='hidden lg:flex items-center' >
        <img src={LoginImg} width="600px" className='' loading='lazy' alt='Side Image' />
    </div>
    {/* Content */}
    <div className='w-full lg:w-[60%] h-[100%] mt-[40px] bg-[white] rounded-md flex flex-col px-10 py-10 ' >
        <p className='font-medium text-[36px]' >Welcome to CRM</p>
        <h2 className='font-bold text-4xl text-[#5D59D9] font-poppins '
        >Start your Journey with us</h2>
        <div className='w-full h-[1px] bg-[#BFBFBF] mt-7 mb-7 ' ></div>

        <Link to="/register" >
            <button 
                    className='w-full bg-[rgb(93,89,217)] mt-10 font-semibold text-white px-2 py-3 rounded-md
                    hover:bg-[#3e3aa3] transition-all duration-300' 
            >Create a New Account</button>
        </Link>

        <Link to="/login" >
            <button 
                    className='w-full bg-[rgb(93,89,217)] mt-10 font-semibold text-white px-2 py-3 rounded-md
                    hover:bg-[#3e3aa3] transition-all duration-300 mb-10 ' 
            >Continue with Existing Account</button>
        </Link>
      
    </div>
</div>
   </div>
  )
}

export default HomePage