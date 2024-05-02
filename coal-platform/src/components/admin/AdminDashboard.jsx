import AdminTable from './AdminTable';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import {BASE_URL} from "../../BaseURL.js" ;
import { apiConnector } from '../../services/apiConnector.js';
import { setLoading } from '../../slices/authSlice.js';
import toast from 'react-hot-toast';
import { formateDate } from '../../utils/formateDate.jsx';
import './AdminTable.css';
import { Link, useNavigate } from 'react-router-dom';
import AdminTodaySale from './AdminTodaySale.jsx';
import { logout } from '../../services/authAPI.js';
import { VscSignOut } from "react-icons/vsc"
import AdminHeader from './AdminHeader.jsx';
import AdminDash from './sidePanel/AdminDash.jsx';
import { RxHamburgerMenu } from "react-icons/rx";
import { ImCross } from "react-icons/im";

const AdminDashboard = () => {

  const date = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weeks = ["Sunday","Monday","Tuesday","Thursday","Friday","Saturday"];
  const d = new Date();
  let month = months[d.getMonth()];
  let day = weeks[d.getDay()-1];
  let dat = d.getDate();

  const [saleData, setSaleData] = useState([]);
  const {loading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
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
  
  // Function to calculate unique vehicle numbers
  let vNumbers = [];
  function countUniqueVehicleNumbers(data) {
    const uniqueVehicleNumbers = {};
    
    // Iterate through the data
    data.forEach(item => {
       const vehicleNumber = item.vNumber;
       uniqueVehicleNumbers[vehicleNumber] = true; // Using an object to store unique vehicle numbers
    });
  
    // Count the unique vehicle numbers
    const uniqueCount = Object.keys(uniqueVehicleNumbers).length;
    vNumbers = Object.keys(uniqueVehicleNumbers);
    
    return uniqueCount;
  }
  
  // Calculate the unique number of vehicle numbers
  const uniqueVehicleCount = countUniqueVehicleNumbers(saleData);

  const [menu, setMenu] = useState('dashboard');
  const [toggle, setToggle] = useState(false);

  const changeClick = (menuType) =>{
    setMenu(menuType);
  }

  useEffect(() => {
    const handleResize = () => {
      setToggle(window.innerWidth >= 768);
    };

    // Set initial toggle value based on window width
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='w-full h-[100%] flex flex-col items-center font-poppins pb-[100px] gap-5 relative ' >
      <AdminHeader/>
      <div className='w-full flex gap-5 ' >
        {/* Side  Panel */}
      <div className={`${toggle === true ? "left-0 fixed " : "left-[-60%] absolute"} w-[200px] top-[100px] md:w-[22%] h-full
       bg-[#3430a0] md:fixed
       px-3 py-4 border-r-[2px] border-r-black font-poppins text-gray-50 transition-all duration-300 `} >
        <p className=' text-[20px] md:text-[24px] mb-4 text-center ' >MENU</p>
        <div className='ml-4 flex flex-col text-sm gap-2 md:text-lg ' >
          <p className={`${menu === 'dashboard' ? " bg-slate-400" : "transition-all duration-200 hover:bg-slate-200 hover:text-black "} cursor-pointer px-3 py-2 rounded-md
          `} onClick={()=> changeClick('dashboard')} >Dashboard</p>
          <Link to="/register" >
          <p className='cursor-pointer px-3 py-2 rounded-md transition-all duration-200 hover:bg-slate-200 hover:text-black' >Add New Member</p>
          </Link>
          <p className={`${menu === 'todayData' ? " bg-slate-400" : "transition-all duration-200 hover:bg-slate-200 hover:text-black"} cursor-pointer px-3 py-2 rounded-md`}  onClick={()=> changeClick('todayData')} >Today's Data</p>
          <p className={`${menu === 'allData' ? " bg-slate-400" : "transition-all duration-200 hover:bg-slate-200 hover:text-black"} cursor-pointer px-3 py-2 rounded-md`}  onClick={()=> changeClick('allData')} >All Data</p>
           {/* logout */}
           <div
                          onClick={() => {
                            dispatch(logout(navigate))
                          }}
                          className=" flex items-center
                          cursor-pointer gap-x-1 px-3 py-2 text-sm md:text-lg text-red-500 hover:bg-richblack-700 hover:text-richblack-25
                          transition-all duration-200 hover:bg-red-500 hover:text-white rounded-md
                          "
                        >
                          <VscSignOut className="text-lg" />
                          Logout
            </div>
        </div>
      </div>
      {
        toggle && (<ImCross className={`${toggle === true ? "left-[43%]" : "left-[2%]"} w-[30px] h-[30px] rounded-md px-1 py-1
        bg-red-500 text-white
       block fixed md:hidden top-[16%] text-md cursor-pointer transition-all duration-300`} onClick={()=>setToggle(!toggle)} />)
      }
      {
        !toggle &&  (<RxHamburgerMenu className={`${toggle === true ? "left-[43%]" : "left-[2%]"} w-[30px] h-[30px] rounded-md px-1 py-1
        bg-blue-500 text-white
       block fixed md:hidden top-[16%] text-md cursor-pointer transition-all duration-300`} onClick={()=>setToggle(!toggle)} />)
      }

      <div className=' w-full md:w-[75%] h-[100%] md:ml-[24%] flex flex-col md:items-center mt-[80px] ' >

          <div className='w-[98%] mx-auto mt-[65px] md:mt-[40px]' >
              <div className='flex flex-col sm:flex-row justify-between ' >
                <h2 className='font-semibold text-center text-lg md:text-2xl text-[#5D59D9] font-poppins '
                  >{
                    menu === 'dashboard' && 'Dashboard'
                  }
                  {
                    menu === 'todayData' && "Today's Data"
                  }
                  {
                    menu === 'allData' && 'All Data'
                  }
                  </h2>
                <div className='flex items-center flex-col sm:items-end' >
                  <p>{day}</p>
                  <p className='font-semibold' >{dat} {month} {d.getFullYear()},<span className='text-[#5D59D9]' >{date.toLocaleString().split(',').at("-1")}</span></p>
                </div>
              </div>
                <div className='w-full h-[1px] bg-[#BFBFBF] mt-3 mb-5' ></div>
                <div className='w-full h-[100vh] ' >
                {
                  menu === 'dashboard' && (<AdminDash saleData={saleData} uniqueVehicleCount={uniqueVehicleCount} vNumbers={vNumbers} />)
                }
                {
                  menu === 'todayData' && (<AdminTodaySale/>)
                }
                {
                  menu === 'allData' && (<AdminTable/>)
                }
                </div>
                {/* <div className='w-full flex justify-end ' > 
                </div>
                  <h2 className='font-bold text-2xl text-[#5D59D9] font-poppins mt-[50px] '
                  >Today's Data</h2>
                  <div className='w-full h-[1px] bg-[#BFBFBF] mt-3 mb-5 ' ></div>
                  <AdminTodaySale/>

                  <h2 className='font-bold text-2xl text-[#5D59D9] font-poppins mt-[50px] '
                  >All Data</h2>
                  <div className='w-full h-[1px] bg-[#BFBFBF] mt-3 mb-5 ' ></div>
                  <AdminTable/> */}
          </div>
      </div>
      </div>
    </div>
  )
}

export default AdminDashboard