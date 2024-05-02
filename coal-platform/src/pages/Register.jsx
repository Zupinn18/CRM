import React, { useState } from 'react'
import LoginImg from "../assests/log.png";
import mailImg from "../assests/mail.png";
import PassImg from "../assests/pass.png";
import phoneImg from "../assests/phone.png";
import userImg from "../assests/user.png";
import {Link} from "react-router-dom";
import {toast} from "react-hot-toast";
import {useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { setSignupData } from '../slices/authSlice';
import { register } from '../services/authAPI';


const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        fullName:'',
        email:'',
        password:'',
        confirmPassword:'',
        phoneNumber:'',
    });

    const handleInputChange = (e) =>{
        setFormData({...formData,
            [e.target.name]: e.target.value
    })}

    const [accountType, setAccountType] = useState('User');

    const handleToggleAdmin = (e) => {
      e.preventDefault();
          setAccountType('Admin');
    };
  
    const handleToggleUser = (e) => {
      e.preventDefault();
          setAccountType('User');
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(formData.password !== formData.confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }
       
        dispatch(register(formData.fullName, 
            formData.email, 
            formData.password,
            formData.confirmPassword,
            formData.phoneNumber,
            accountType,
             navigate));
        dispatch(setSignupData(formData));

        //Reset 
        setFormData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber:""
        })
    }


  return (
    <div className='w-full h-full flex justify-between gap-[100px] font-poppins pb-10' >
    {/* image */}
    <div className='hidden lg:flex items-center' >
        <img src={LoginImg} width="600px" className='' loading='lazy' alt='Side Image' />
    </div>
    {/* Content */}
    <div className='w-full lg:w-[60%] h-[100%] mt-[40px] bg-[white] rounded-md flex flex-col px-10 py-10 ' >
        <p className='font-medium text-[36px]' >Welcome to CRM</p>
        <h2 className='font-bold text-4xl text-[#5D59D9] font-poppins '
        >Create an Account</h2>
        <div className='w-full h-[1px] bg-[#BFBFBF] mt-7 mb-10 ' ></div>
        <form className='flex flex-col gap-2' >
        <div className="flex p-1 gap-x-1 my-6 rounded-full max-w-max">
                <button
                        className={`${accountType === "User"
                        ?"bg-black text-white" 
                        : "bg-transparent text-gray-600"}
                        py-2 px-5 rounded-full transition-all duration-200`}
                        onClick={handleToggleUser}
                    >
                        User
                </button>
                <button
                    className={`${accountType === "Admin"
                    ? "bg-black text-white"
                    : "bg-transparent text-gray-400"} 
                    py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={handleToggleAdmin}
                >
                    Admin
                </button>
            </div>
                <div className='flex gap-6 bg-[#ECECEC] px-6 py-4 rounded-md mt-4' >
                    <div className='flex items-center ' >
                        <img src={userImg} width="40px" alt='user Image' loading='lazy' />
                    </div>
                    <div className='w-[100%] flex flex-col gap-1' >
                        <label id='fullName' className=' font-poppins ' >Full Name</label>
                        <input
                            type='text'
                            id='fullName'
                            name='fullName'
                            placeholder='Enter your full name'
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className=' w-[100%] rounded-md bg-transparent font-bold text-[16px] outline-none '
                        />
                    </div>
                </div>
            <div className='flex gap-8 bg-[#ECECEC] px-6 py-4 rounded-md mt-4' >
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

            <div className='flex gap-8 bg-[#ECECEC] px-6 py-4 rounded-md mt-4 ' >
                <div className='flex items-center' >
                    <img src={PassImg} loading='lazy' alt='Password Image' />
                </div>
                <div className='w-[100%] flex flex-col gap-1' >
                    <label id='confirmPassword' className=' font-poppins ' >Confirm Password</label>
                    <input
                        type='password'
                        id='confirmPassword'
                        name='confirmPassword'
                        placeholder='Confirm your password'
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className=' w-[100%] rounded-md bg-transparent font-bold text-[16px] outline-none '
                    />
                </div>
            </div>

            <div className='flex gap-6 bg-[#ECECEC] px-6 py-4 rounded-md mt-4' >
                    <div className='flex items-center' >
                        <img src={phoneImg} width="40px" alt='Phone Image' loading='lazy' />
                    </div>
                    <div className='w-[100%] flex flex-col gap-1' >
                        <label id='phoneNumber' className=' font-poppins ' >Phone Number</label>
                        <input
                            type='number'
                            id='phoneNumber'
                            name='phoneNumber'
                            placeholder='Enter mobile number'
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className=' w-[100%] rounded-md bg-transparent font-bold text-[16px] outline-none '
                        />
                    </div>
                </div>
         
            <button onClick={handleSubmit} 
            className='bg-[#5D59D9] mt-10 font-semibold text-white px-2 py-3 rounded-md
            hover:bg-[#3e3aa3] transition-all duration-300' >Sign Up</button>
        </form>
        <p className='mt-5 text-center text-[16px] text-black ' >Already Have an account ? {" "}
            <Link to="/login">
                <span className="text-[#5D59D9]" >Login</span>
            </Link>
        </p>
    </div>
</div>
  )
}

export default Register