import React, { useState } from 'react'
import userImg from "../../assests/user1.png";
import Rbm from "./Rbm.jsx";
import Sale from "./Sale.jsx";
import PlantExpense from "./PlantExpense.jsx";
import { logout } from '../../services/authAPI.js';
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user } = useSelector((state) => state.profile)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formtype, setFormType] = useState('sale');

    const handleSale = (e) =>{
        e.preventDefault();
        setFormType('sale');
    }

    const handleRBM = (e) =>{
        e.preventDefault();
        setFormType('rbm');
    }

    const handlePlant = (e) =>{
        e.preventDefault();
        setFormType('plantExpense');
    }

  return (
    <div className='w-[100%] h-[100%] pt-4 font-poppins flex flex-col gap-[50px] ' >
        {/* header Part */}
       <div className='flex lg:items-center flex-col lg:justify-between bg-[white] rounded-lg lg:flex-row ' >
                {/* member name */}
                <div className='flex items-center gap-2 mt-5 lg:mt-0 ' >
                    <img src={userImg} loading='lazy' alt='User Image'  width="80px" />
                    <p className='font-semibold text-lg lg:text-xl text-[black] ' >{user.fullName}</p>
                </div>

                {/* Header */}
                <div className='w-[50%] px-6 py-5 flex flex-col lg:flex-row justify-between text-lg lg:text-2xl font-bold text-[#929292] ' >
                    <p className={`px-2 py-2 cursor-pointer ${formtype === 'rbm' ? "text-[#5D59D9] border-[1px] border-[#5D59D9] rounded-md" : "" }  
                    transition-all duration-150 `} onClick={handleRBM} >R.BM</p>
                    <p className={`px-2 py-2 cursor-pointer ${formtype === 'sale' ? "text-[#5D59D9] border-[1px] border-[#5D59D9] rounded-md " : "" }
                     transition-all duration-150 `} onClick={handleSale} >Sale</p>
                    <p className={`px-2 py-2 cursor-pointer ${formtype === 'plantExpense' ? "text-[#5D59D9] border-[1px] border-[#5D59D9] rounded-md" : "" }
                     transition-all duration-150`} onClick={handlePlant} >Plant Expenses</p>
                </div>

                {/* logout */}
                <div
            onClick={() => {
              dispatch(logout(navigate))
            }}
            className="ml-5 mb-5 lg:mr-4 lg:ml-0 lg:mb-0 flex items-center 
            cursor-pointer gap-x-1 py-[10px] px-[10px] text-lg text-red-500 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
       </div>

       {/* content part */}
       { formtype === 'rbm' && (<Rbm/>)}
       { formtype === 'sale' && (<Sale/>)}
       { formtype === 'plantExpense' && (<PlantExpense/>)}
    </div>
  )
}

export default Home