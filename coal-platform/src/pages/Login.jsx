import React, { useState } from 'react'
import LoginImg from "../assests/log.png";
import mailImg from "../assests/mail.png";
import PassImg from "../assests/pass.png";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../services/authAPI';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email:'',
        password:'',
    });

    const handleInputChange = (e) =>{
        setFormData({...formData,
            [e.target.name]: e.target.value
    })}

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(login(formData.email, formData.password, navigate))
    }

  return (
    <div className='w-[100%] h-[100%] flex justify-between gap-[100px] font-poppins pb-20' >
        {/* image */}
        <div className='hidden lg:flex items-center' >
            <img src={LoginImg} width="600px" loading='lazy' alt='Side Image' />
        </div>
        {/* Content */}
        <div className='w-full lg:w-[60%] h-[100%] mt-[40px] bg-[white] rounded-md flex flex-col px-10 py-10 ' >
            <p className='font-medium text-[36px]' >Welcome to CRM</p>
            <h2 className='font-bold text-4xl text-[#5D59D9] font-poppins '
            >Login to your Account</h2>
            <div className='w-full h-[1px] bg-[#BFBFBF] mt-7 mb-10 ' ></div>
            <form className='flex flex-col gap-2' >
                <div className='flex gap-8 bg-[#ECECEC] px-6 py-4 rounded-md ' >
                    <div className='flex items-center' >
                        <img src={mailImg} alt='Email Image' loading='lazy' />
                    </div>
                    <div className='w-[100%] flex flex-col gap-1' >
                        <label id='email' className=' font-poppins ' >Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='abc@gmail.com'
                            value={formData.email}
                            onChange={handleInputChange}
                            className=' w-[100%] rounded-md bg-transparent font-bold text-[16px] outline-none '
                        />
                    </div>
                </div>
                <div className='flex gap-8 bg-[#ECECEC] px-6 py-4 rounded-md mt-4 ' >
                    <div className='flex items-center' >
                        <img src={PassImg} loading='lazy' alt='Password Image' />
                    </div>
                    <div className='w-[100%] flex flex-col gap-1' >
                        <label id='password' className=' font-poppins ' >Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Enter your password'
                            value={formData.password}
                            onChange={handleInputChange}
                            className=' w-[100%] rounded-md bg-transparent font-bold text-[16px] outline-none '
                        />
                    </div>
                </div>
             
                <button onClick={handleSubmit} 
                className='bg-[rgb(93,89,217)] mt-10 font-semibold text-white px-2 py-3 rounded-md
                 hover:bg-[#3e3aa3] transition-all duration-300' 
                >Login</button>
            </form>
            <p className='mt-5 text-center text-[16px] text-black ' >Don't Have an account ? {" "}
                {/* <Link to="/register">
                    <span className="text-[#5D59D9]" >Register</span>
                </Link> */}
                <span className="text-[#5D59D9]"  >Contact Admin</span>
            </p>
        </div>
    </div>
  )
}

export default Login