import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {createSale} from '../../../services/saleAPI';
import {toast} from "react-hot-toast"
import SaleTable from "./SaleTable.jsx";

const CreateSale = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        date:'',
        ownerName:"",
        vNumber:"",
        load:"",
        material:"",
        paymentMode:"",
        advanceAmount:"",
        amount:"",
      });

      const [netWeight, setNetWeight] = useState(0);
      const [vLoad, setVLoad] = useState(0);
    
      const handleInputChange = (e) =>{
        setFormData({ ...formData,
          [e.target.name]: e.target.value
        });
      }

      useEffect(()=>{
        const load = parseInt(formData.load);
        const wt = load - vLoad;
        setNetWeight(parseInt(wt));
        console.log("tyep", typeof(netWeight));
      },[vLoad])
    
      const handleSubmit = (e) =>{
        e.preventDefault();

        if(!formData.date || !formData.ownerName || !formData.amount || !formData.vNumber || !formData.load || !vLoad
          || !formData.material || !formData.paymentMode) {
            toast.error("All fields are required");
            return
        }

        if(formData.paymentMode === 'due' && !formData.advanceAmount ){
          toast.error("For due payments, Advance amount in required");
          return
        }
       
        if(formData.advanceAmount){
          dispatch(createSale(
            formData.date, 
            formData.ownerName, 
            formData.vNumber,
            formData.load,
            formData.material,
            formData.paymentMode,
            formData.amount,
            netWeight,
            vLoad,
            formData.advanceAmount,
             navigate));
        }else{
          dispatch(createSale(
            formData.date, 
            formData.ownerName, 
            formData.vNumber,
            formData.load,
            formData.material,
            formData.paymentMode,
            formData.amount,
            netWeight,
            vLoad,
            0,
             navigate));
        }

        //Reset 
        setFormData({
          date:'',
          ownerName:'',
          vNumber:'',
          load:'',
          material:'',
          paymentMode:'',
          amount:'',
          advanceAmount:'',
        });
        setNetWeight("");
        setVLoad("");
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
                            <label id='ownerName' className=' text-[18px] font-semibold font-poppins ' >Owner Name</label>
                            <input
                                type='text'
                                id='ownerName'
                                name='ownerName'
                                value={formData.ownerName}
                                onChange={handleInputChange}
                                placeholder='Enter Owner Name'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='vNumber' className=' text-[18px] font-semibold font-poppins ' >V. Number</label>
                            <input
                                type='number'
                                id='vNumber'
                                name='vNumber'
                                value={formData.vNumber}
                                onChange={handleInputChange}
                                placeholder='Enter V.No'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='paymentMode' className=' text-[18px] font-semibold font-poppins ' >Payment Mode</label>
                            <select
                                id='paymentMode'
                                name='paymentMode'
                                value={formData.paymentMode}
                                onChange={handleInputChange}
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            >
                              <option value="" >Select Payment Mode</option>
                              <option value="cash" >Cash</option>
                              <option value="due" >Due (Udhaar)</option>
                              <option value="online" >Online</option>
                            </select>
                  </div>
                  {
                    formData.paymentMode === 'due' && (
                      <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='advanceAmount' className=' text-[18px] font-semibold font-poppins ' >Advance Amount</label>
                            <input
                                type='number'
                                id='advanceAmount'
                                name='advanceAmount'
                                value={formData.advanceAmount}
                                onChange={handleInputChange}
                                placeholder='Enter deposit amount'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            >
                            </input>
                  </div>
                    )
                  }
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='load' className=' text-[18px] font-semibold font-poppins ' >Load (in tons)</label>
                            <input
                                type='number'
                                id='load'
                                name='load'
                                value={formData.load}
                                onChange={handleInputChange}
                                placeholder='Enter Load'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='vLoad' className=' text-[18px] font-semibold font-poppins ' >V. Load (in tons)</label>
                            <input
                                type='number'
                                id='vLoad'
                                name='vLoad'
                                value={vLoad}
                                onChange={(e)=>setVLoad(e.target.value)}
                                placeholder='Enter V.Load'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='netWeight' className=' text-[18px] font-semibold font-poppins ' >Net Weight (in tons)</label>
                            <input
                                type='number'
                                id='netWeight'
                                name='netWeight'
                                value={netWeight}
                                onChange={(e)=>setNetWeight(e.target.value)}
                                placeholder='Enter Net Weight'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='material' className=' text-[18px] font-semibold font-poppins ' >Material</label>
                            <select
                                id='material'
                                name='material'
                                value={formData.material}
                                onChange={handleInputChange}
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            >
                              <option value="" >Select Material</option>
                               <option value="smallRocks" >Smaller Rocks</option>
                              <option value="gravel" >Gravel</option>
                              <option value="dust" >Dust</option>
                            </select>
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='amount' className=' text-[18px] font-semibold font-poppins ' >Total Amount</label>
                            <input
                                type='number'
                                id='amount'
                                name='amount'
                                value={formData.amount}
                                onChange={handleInputChange}
                                placeholder='Enter Amount'
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
            >All Sales Data</h2>
            <div className='w-full h-[1px] bg-[#BFBFBF] mt-3 mb-5 ' ></div>
            <SaleTable/>
        </div>
  )
}

export default CreateSale