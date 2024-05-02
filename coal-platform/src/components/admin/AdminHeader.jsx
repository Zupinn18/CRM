import React from 'react'
import { useSelector } from 'react-redux';

const AdminHeader = () => {
    const { user } = useSelector((state) => state.profile);

  return (
    <div className='w-full flex py-5 px-3 md:px-6 bg-[#5D59D9] fixed border-b-[2px] border-b-black top-0 justify-between items-center font-poppins ' >
        <p className=' text-white font-bold uppercase font-inter text-md lg:text-2xl ' >CRM Portal</p>
        <div className='flex flex-col gap-1 text-white ' >
            <p className='text-white font-semibold text-md lg:text-2xl' >{user?.fullName}</p>
            <p>{`${user?.email} [${user?.accountType}]`}</p>
            
        </div>
    </div>
  )
}

export default AdminHeader