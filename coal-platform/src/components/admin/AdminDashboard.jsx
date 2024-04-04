import AdminTable from './AdminTable';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import {BASE_URL} from "../../BaseURL.js" ;
import { apiConnector } from '../../services/apiConnector.js';
import { setLoading } from '../../slices/authSlice.js';
import toast from 'react-hot-toast';
import { formateDate } from '../../utils/formateDate.jsx';
import './AdminTable.css';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

  const date = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weeks = ["Sunday","Monday","Tuesday","Thursday","Friday","Saturday"];
  const d = new Date();
  let month = months[d.getMonth()];
  let day = weeks[d.getDay()];
  let dat = d.getDate();

  const [saleData, setSaleData] = useState([]);
  const {loading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
 
  const getAllSales = async()=>{
      dispatch(setLoading(true));
      try {
          const response = await apiConnector("get",`${BASE_URL}/sale/get-sale`);

          if(!response.data.success){
              throw new Error(response.data.message);
          }

          setSaleData(response.data.data);

      } catch (error) {
          console.log("Can't fetch Data due to",error);
          toast.error("Sale data can't be fetched");
      }
      dispatch(setLoading(false));
  }

  useEffect(()=>{
      getAllSales();
  },[])

  return (
    <div className='w-full h-[100%] flex flex-col items-center font-poppins pb-[100px] pt-[20px]' >
      <div className=' w-full h-[100vh] flex flex-col md:items-center lg:w-full' >
          <p className='font-medium lg:text-[46px] text-center text-2xl mb-5 ' >Welcome to Admin <span className=' text-2xl font-bold lg:text-[46px] text-[#5D59D9] font-poppins '
                >Dashboard</span> </p>
          <p className=' text-center font-semibold text-md lg:text-2xl ' >CRM Portal</p>
          <Link to="/register" >
                  <button 
                          className='w-full bg-[rgb(93,89,217)] mt-10 font-semibold text-white px-2 py-3 rounded-md
                          hover:bg-[#3e3aa3] transition-all duration-300' 
                  >Create a New Account</button>
          </Link>

          <div className='w-full mt-[40px]' >
              <div className='flex flex-col sm:flex-row justify-between ' >
                <h2 className='font-semibold text-center text-lg md:text-2xl text-[#5D59D9] font-poppins '
                  >Total Vehicles: {saleData.length}</h2>
                <div className='flex items-center flex-col sm:items-end' >
                  <p>{day}</p>
                  <p className='font-semibold' >{dat} {month} {d.getFullYear()},<span className='text-[#5D59D9]' >{date.toLocaleString().split(',').at("-1")}</span></p>
                </div>
              </div>
                <div className='w-full h-[1px] bg-[#BFBFBF] mt-3 mb-5' ></div>
                <AdminTable/>
          </div>
      </div>
    </div>
  )
}

export default AdminDashboard