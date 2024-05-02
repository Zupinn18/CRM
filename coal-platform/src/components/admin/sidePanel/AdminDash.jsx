import React from 'react'

const AdminDash = ({saleData, uniqueVehicleCount, vNumbers}) => {

  let paidMoney=0,totalMoney=0;
    saleData.forEach(obj => {
      if(obj.advanceAmount!=0){
        paidMoney+=obj.advanceAmount;
      }
      if(obj.advanceAmount==0){
        paidMoney+=obj.amount;
      }

      totalMoney+=obj.amount;
    });

  return (
    <div className='w-[97%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 font-poppins gap-10 ' >
        <div className='flex flex-col gap-2 cursor-pointer h-[200px]
         bg-white rounded-md border-slate-400 border-[1px] px-7 py-6 ' >
          <p className=' font-bold text-2xl ' >Total Vehicles</p>
          <p className=' font-semibold text-4xl text-green-500  ' >{uniqueVehicleCount}</p>
          <button className=' bg-[#5D59D9] rounded-md px-4 py-2 text-white self-end
           transition-all duration-300 hover:bg-[#4642b9]
          '
          >View</button>   
        </div>
        <div className='flex flex-col gap-2 cursor-pointer h-[200px]
         bg-white rounded-md border-slate-400 border-[1px] px-7 py-6 ' >
          <p className=' font-bold text-2xl ' >Total Sales Amount</p>
          <p className=' font-semibold text-4xl text-yellow-500  ' >₹ {totalMoney}</p>
        </div>
        <div className='flex flex-col gap-2 cursor-pointer h-[200px]
         bg-white rounded-md border-slate-400 border-[1px] px-7 py-6 ' >
          <p className=' font-bold text-2xl ' >Total Expense Amount</p>
          <p className=' font-semibold text-4xl text-red-500  ' >₹ {totalMoney}</p>
        </div>
        <div className='flex flex-col gap-2 cursor-pointer h-[200px]
         bg-white rounded-md border-slate-400 border-[1px] px-7 py-6 ' >
          <p className=' font-bold text-2xl ' >Total Paid Amount</p>
          <p className=' font-semibold text-4xl text-blue-500  ' >₹ {paidMoney}</p>
        </div>
        <div className='flex flex-col gap-2 cursor-pointer h-[200px]
         bg-white rounded-md border-slate-400 border-[1px] px-7 py-6 ' >
          <p className=' font-bold text-2xl ' >Total Due Amount</p>
          <p className=' font-semibold text-4xl text-orange-500  ' >₹ {totalMoney-paidMoney}</p>
        </div>
    </div>
  )
}

export default AdminDash