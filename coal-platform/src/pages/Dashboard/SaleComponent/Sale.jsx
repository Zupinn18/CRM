import React, { useState } from 'react'
import CreateSale from './CreateSale';
import UpdateSale from './UpdateSale';

const Sale = () => {
  const [saleAction, setSaleAction] = useState('create');

  const handleCreateSale = () =>{
    setSaleAction('create');
  }
  const handleUpdateSale = () =>{
    setSaleAction('update');
  }

  return (
  <div className=' h-[100%] font-poppins pb-[50px] ' >
        <h2 className='font-bold text-4xl text-[#5D59D9] font-poppins '
            >Sale</h2>
        <div className='w-full h-[1px] bg-[#BFBFBF] mt-3 mb-5 ' ></div>

        <div className='mb-10 gap-5 flex font-poppins justify-center ' >
            <button className={` ${saleAction === 'create' ? "bg-[rgb(93,89,217)] text-white hover:bg-[#3e3aa3] " : 
            "bg-[#BFBFBF] text-black hover:bg-[#ada9a9] " } text-md font-semibold px-2 py-3 rounded-md
                  transition-all duration-300`} onClick={handleCreateSale}  >Create Sale</button>
            <button className={` ${saleAction === 'update' ? "bg-[rgb(93,89,217)] text-white hover:bg-[#3e3aa3] " : 
            "bg-[#BFBFBF] text-black hover:bg-[#ada9a9] " } text-md font-semibold px-2 py-3 rounded-md
                  transition-all duration-300`} onClick={handleUpdateSale} >Update Sale</button>
        </div>
      
        {/* content or fields */}
        {
          saleAction === 'create' && (
            <CreateSale/>
          )
        }
        {
          saleAction === 'update' && (
            <UpdateSale/>
          )
        }


    </div>
  )
}

export default Sale