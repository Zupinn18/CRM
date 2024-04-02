import React, { useState } from 'react'
import { uploadExpense } from "../../../services/expenseAPI.js";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast"
import ExpenseTable from './ExpenseTable.js';

const CreateExpense = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        date:'',
        salary:"",
        tea:"",
        electricity:"",
        internet:"",
        fuel:""
      });

      const handleInputChange = (e) =>{
        setFormData({ ...formData,
          [e.target.name]: e.target.value
        });
      }
    
      const handleSubmit = (e) =>{
        e.preventDefault();
        
        if(!formData.date || !formData.electricity || !formData.fuel || !formData.internet || !formData.salary || !formData.tea){
          toast.error("All fields are required ");
          return;
        }

        dispatch(uploadExpense(
          formData.date,
          formData.salary,
          formData.tea,
          formData.electricity,
          formData.internet,
          formData.fuel,
          navigate,
        ));

          formData.date="";
          formData.salary="";
          formData.tea="";
          formData.electricity="";
          formData.internet="";
          formData.fuel="";
          window.location.reload();
      }

  return (
    <div>
            <form>
                <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[50px] ' >
                <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='date' className=' text-[18px] font-semibold font-poppins ' >Date</label>
                            <input
                                type='date'
                                id='date'
                                name='date'
                                value={formData.date}
                                onChange={handleInputChange}
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='salary' className=' text-[18px] font-semibold font-poppins ' >Salary Expense</label>
                            <input
                                type='number'
                                id='salary'
                                name='salary'
                                value={formData.salary}
                                onChange={handleInputChange}
                                placeholder='Enter Salary Expense'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='tea' className=' text-[18px] font-semibold font-poppins ' >TEA Expense</label>
                            <input
                                type='number'
                                id='tea'
                                name='tea'
                                value={formData.tea}
                                onChange={handleInputChange}
                                placeholder='Enter TEA Expense'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='electricity' className=' text-[18px] font-semibold font-poppins '>
                            Electricity Expense</label>
                            <input
                                type='number'
                                id='electricity'
                                name='electricity'
                                value={formData.electricity}
                                onChange={handleInputChange}
                                placeholder='Enter Electricity Expense'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='internet' className=' text-[18px] font-semibold font-poppins ' >Internet Expense</label>
                            <input
                                type='number'
                                id='internet'
                                name='internet'
                                value={formData.internet}
                                onChange={handleInputChange}
                                placeholder='Enter Internet Expense'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='fuel' className=' text-[18px] font-semibold font-poppins ' >Fuel Expense</label>
                            <input
                                type='number'
                                id='fuel'
                                name='fuel'
                                value={formData.fuel}
                                onChange={handleInputChange}
                                placeholder='Enter Fuel Expense'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                </div>
                <button onClick={handleSubmit} 
                className=' w-full bg-[rgb(93,89,217)] mt-10 text-xl font-semibold text-white px-2 py-3 rounded-md
                 hover:bg-[#3e3aa3] transition-all duration-300' 
                >Submit Data</button>
            </form>

            <h2 className='font-bold text-4xl text-[#5D59D9] font-poppins mt-[50px] '
            >Expense Data</h2>
            <div className='w-full h-[1px] bg-[#BFBFBF] mt-3 mb-5 ' ></div>
            <ExpenseTable/>
    </div>
  )
}

export default CreateExpense