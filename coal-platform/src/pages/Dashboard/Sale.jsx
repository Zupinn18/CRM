import React, { useState } from 'react'

const Sale = () => {
  const [formData, setFormData] = useState({
    date:'',
    ownerName:'',
    vNumber:'',
    load:'',
    vLoad:'',
    netWeight:'',
    material:'',
    paymentMode:'',
    amount:'',
  });

  const handleInputChange = (e) =>{
    setFormData({ ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("sale data is ",formData);
  }

  return (
  <div className=' h-[100%] font-poppins pb-[50px] ' >
        <h2 className='font-bold text-4xl text-[#5D59D9] font-poppins '
            >Sale</h2>
        <div className='w-full h-[1px] bg-[#BFBFBF] mt-7 mb-10 ' ></div>

        {/* content or fields */}
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
                              <option value="cash" >Cash</option>
                              <option value="due" >Due (Udhaar)</option>
                              <option value="online" >Online</option>
                            </select>
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='load' className=' text-[18px] font-semibold font-poppins ' >Load</label>
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
                            <label id='vLoad' className=' text-[18px] font-semibold font-poppins ' >V. Load</label>
                            <input
                                type='number'
                                id='vLoad'
                                name='vLoad'
                                value={formData.vLoad}
                                onChange={handleInputChange}
                                placeholder='Enter V.Load'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='netWeight' className=' text-[18px] font-semibold font-poppins ' >Net Weight</label>
                            <input
                                type='number'
                                id='netWeight'
                                name='netWeight'
                                value={formData.netWeight}
                                onChange={handleInputChange}
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
                              <option value="cash" >Smaller Rocks</option>
                              <option value="due" >Gravel</option>
                              <option value="online" >Dust</option>
                            </select>
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='amount' className=' text-[18px] font-semibold font-poppins ' >Amount</label>
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
        </div>
    </div>
  )
}

export default Sale