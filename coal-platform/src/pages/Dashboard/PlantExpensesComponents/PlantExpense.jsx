import React from 'react'
import CreateExpense from './CreateExpense'

const PlantExpense = () => {
  return (
    <div className='w-full h-full font-poppins pb-[50px] ' >
        <h2 className='font-bold text-4xl text-[#5D59D9] font-poppins '
            >Plant Expenses</h2>
        <div className='w-full h-[1px] bg-[#BFBFBF] mt-3 mb-10 ' ></div>

        <div className='mb-10 gap-5 flex font-poppins justify-center ' >
            <button className={` ${"create" === 'create' ? "bg-[rgb(93,89,217)] text-white hover:bg-[#3e3aa3] " : 
            "bg-[#BFBFBF] text-black hover:bg-[#ada9a9] " } text-md font-semibold px-2 py-3 rounded-md
                  transition-all duration-300`} >Create Expense</button>
        </div>

        <CreateExpense/>
        
    </div>
  )
}

export default PlantExpense