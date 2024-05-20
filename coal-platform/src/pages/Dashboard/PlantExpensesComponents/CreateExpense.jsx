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
        munshiSalary:"",
        plantDumper:"",
        electricity:"",
        rent:"",
        diesel:"",
        plantExpense:"",
        plantJCB:"",
        plantHM:"",
        plantTractor:"",
        formen:"",
        royalty:"",
      });

      const today = Date.now();
      const curr = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today)
      const dateString = curr;
      const datePart = dateString.split(',')[0];
      formData.date = datePart;

      const handleInputChange = (e) =>{
        setFormData({ ...formData,
          [e.target.name]: e.target.value
        });
      }
    
      const handleSubmit = (e) =>{
        e.preventDefault();
        
        if(!formData.date || !formData.electricity || !formData.diesel || !formData.rent || !formData.munshiSalary || !formData.plantDumper){
          toast.error("All fields are required ");
          return;
        }

        dispatch(uploadExpense(
          formData.date,
          formData.munshiSalary,
          formData.plantDumper,
          formData.electricity,
          formData.rent,
          formData.diesel,
          formData.plantExpense,
          formData.plantJCB,
          formData.plantHM,
          formData.plantTractor,
          formData.formen,
          formData.royalty,
          navigate,
        ));

          formData.date="";
          formData.munshiSalary="";
          formData.plantDumper="";
          formData.electricity="";
          formData.rent="";
          formData.diesel="";
          formData.plantExpense="";
          formData.plantJCB="";
          formData.plantHM="";
          formData.plantTractor="";
          formData.formen="";
          formData.royalty="";
          window.location.reload();
      }

  return (
    <div>
            <form>
                <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[50px] ' >
                <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='plantExpense' className=' text-[18px] font-semibold font-poppins ' >Plant Expenses</label>
                            <input
                                type='number'
                                id='plantExpense'
                                name='plantExpense'
                                value={formData.plantExpense}
                                onChange={handleInputChange}
                                placeholder='Enter Plant Expenses'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='munshiSalary' className=' text-[18px] font-semibold font-poppins ' >Munshi Salary</label>
                            <input
                                type='number'
                                id='munshiSalary'
                                name='munshiSalary'
                                value={formData.munshiSalary}
                                onChange={handleInputChange}
                                placeholder='Enter Munshi Salary'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='plantDumper' className=' text-[18px] font-semibold font-poppins ' >Plant Dumper</label>
                            <input
                                type='number'
                                id='plantDumper'
                                name='plantDumper'
                                value={formData.plantDumper}
                                onChange={handleInputChange}
                                placeholder='Enter Plant Dumper'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='plantJCB' className=' text-[18px] font-semibold font-poppins ' >Plant JCB</label>
                            <input
                                type='number'
                                id='plantJCB'
                                name='plantJCB'
                                value={formData.plantJCB}
                                onChange={handleInputChange}
                                placeholder='Enter Plant JCB'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='plantHM' className=' text-[18px] font-semibold font-poppins ' >Plant HM</label>
                            <input
                                type='number'
                                id='plantHM'
                                name='plantHM'
                                value={formData.plantHM}
                                onChange={handleInputChange}
                                placeholder='Enter Plant HM'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='plantTractor' className=' text-[18px] font-semibold font-poppins ' >Plant Tractor</label>
                            <input
                                type='number'
                                id='plantTractor'
                                name='plantTractor'
                                value={formData.plantTractor}
                                onChange={handleInputChange}
                                placeholder='Enter Plant Tractor'
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
                            <label id='diesel' className=' text-[18px] font-semibold font-poppins ' >Diesel</label>
                            <input
                                type='number'
                                id='diesel'
                                name='diesel'
                                value={formData.diesel}
                                onChange={handleInputChange}
                                placeholder='Enter diesel Expense'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='formen' className=' text-[18px] font-semibold font-poppins ' >Formen Expense</label>
                            <input
                                type='number'
                                id='formen'
                                name='formen'
                                value={formData.formen}
                                onChange={handleInputChange}
                                placeholder='Enter Formen Expense'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='formen' className=' text-[18px] font-semibold font-poppins ' >Royalty</label>
                            <input
                                type='number'
                                id='royalty'
                                name='royalty'
                                value={formData.royalty}
                                onChange={handleInputChange}
                                placeholder='Enter Royalty'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='rent' className=' text-[18px] font-semibold font-poppins ' >Rent</label>
                            <input
                                type='number'
                                id='rent'
                                name='rent'
                                value={formData.rent}
                                onChange={handleInputChange}
                                placeholder='Enter Rent'
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