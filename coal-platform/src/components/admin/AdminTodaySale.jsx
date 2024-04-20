import AdminTable from './AdminTable';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import {BASE_URL} from "../../BaseURL.js" ;
import { apiConnector } from '../../services/apiConnector.js';
import { setLoading } from '../../slices/authSlice.js';
import toast from 'react-hot-toast';
import { formateDate } from '../../utils/formateDate.jsx';
import './AdminTable.css';
import TodaySale from "../../pages/Dashboard/SaleComponent/TodaySale.jsx"
import { Link } from 'react-router-dom';
import { formateTime } from '../../utils/formateTime.js';
import Loader from '../../Loading/Loader.jsx';

const AdminTodaySale = () => {
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

  const todayDate = new Date().toISOString().split('T')[0];

    // Filter data for today's date
    const todayData = saleData.filter(item => item.date.startsWith(todayDate));

    
    let paidMoney=0,totalMoney=0;
    todayData?.forEach(obj => {
      if(obj.advanceAmount!==0){
        paidMoney+=obj.advanceAmount;
      }
      if(obj.advanceAmount===0){
        paidMoney+=obj.amount;
      }

      totalMoney+=obj.amount;
    });

  return (
    <div className="flex flex-col " >
    <div >
      <div className="p-1.5 w-full inline-block align-middle">
        <div className="overflow-hidden border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#5D59D9] text-white ">
              <tr >
                <th
                  scope="col"
                  className="px-4
                   py-3 text-[12px] font-bold text-left uppercase "
                >
                  V.Number
                </th>
                <th
                  scope="col"
                  className="px-4
                   py-3 text-[12px] font-bold text-left uppercase "
                >
                  Owner Name
                </th>
                {/* <th
                  scope="col"
                  className="px-4
                   py-3 text-[12px] font-bold text-left uppercase "
                >
                  Load
                </th>
                <th
                  scope="col"
                  className="px-4
                   py-3 text-[12px] font-bold text-left uppercase "
                >
                  V.Load
                </th> */}
                <th
                  scope="col"
                  className="px-4
                   py-3 text-[12px] font-bold text-left uppercase "
                >
                  Net Weight
                </th>
                <th
                  scope="col"
                  className="px-4
                   py-3 text-[12px] font-bold text-left uppercase "
                >
                  Last Updated By
                </th>
                <th
                  scope="col"
                  className="px-4
                   py-3 text-[12px] font-bold text-left uppercase "
                >
                  Last Updated Date
                </th>
                <th
                  scope="col"
                  className="px-4
                   py-3 text-[12px] font-bold text-left uppercase "
                >
                  Last Updated Time
                </th>
                <th
                  scope="col"
                  className="px-4
                   py-3 text-[12px] font-bold text-left uppercase "
                >
                  Payment Mode
                </th>
                <th
                  scope="col"
                  className="px-4
                   py-3 text-[12px] font-bold text-left uppercase "
                >
                  Paid Amount
                </th>
                <th
                  scope="col"
                  className="px-4
                   py-3 text-[12px] font-bold text-left uppercase "
                >
                  Remaining Amount
                </th>
                <th
                  scope="col"
                  className="px-4
                   py-3 text-[12px] font-bold text-left  uppercase "
                >
                  Total Amount
                </th>
              </tr>
            </thead>
            {/* table body */}
            {
                loading && (
                    <div className='w-full' >
                        <Loader/>
                    </div>
                )
            }
            {
                !loading && (
                todayData.map((sale,index)=>(
                    <tbody className="divide-y divide-gray-200" key={index} >
        <tr className='bg-gray-50' >
                <td className="px-4
                 py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                  {sale?.vNumber}
                </td>
                <td className="px-4
                 py-4 text-[12px] text-gray-800 whitespace-nowrap">{sale?.ownerName}</td>
                {/* <td className="px-4
                 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {sale?.load}
                </td>
                <td className="px-4
                 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {sale?.vLoad}
                </td> */}
                <td className="px-4
                 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {sale?.netWeight}
                </td>
                <td className="px-4
                 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {
                  sale?.LastUpdatedBy ? `${sale?.LastUpdatedBy}` : "-"
                }
                </td>
                <td className="px-4
                 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {
                    formateDate(sale?.LastUpdatedAt) === 'Invalid Date' ? "-" : 
                    `${formateDate(sale?.LastUpdatedAt)}`
                }
                </td>
                <td className="px-4
                 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {
                    formateTime(sale?.time)
                }
                </td>
                <td className="px-4
                 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {sale?.paymentMode}
                </td>
                {
                  sale?.paymentMode === 'due' ?
                  (
                    <td className="px-4
                     py-4 text-[12px] text-green-500 font-semibold whitespace-nowrap">
                    {sale?.advanceAmount}
                    </td>
                  ) :
                  (<td className="px-4
                   py-4 text-[12px] text-green-500 font-semibold whitespace-nowrap">
                {
                  sale?.amount
                }
                </td>)
                }
                {
                  sale?.paymentMode === 'due' ? 
                  (<td className="px-4
                   py-4 text-[12px] text-red-500 font-semibold whitespace-nowrap">
                {parseInt(sale?.amount) - parseInt(sale?.advanceAmount)}
                </td>) :
                  (<td className="px-4
                   py-4 text-[12px] text-red-500 font-semibold whitespace-nowrap">
                {0}
                </td>)
                }
                <td className="px-4
                 py-4 text-[12px] text-yellow-500 font-semibold whitespace-nowrap">
                {sale?.amount}
                </td>
                {/* <td className="px-4
                 py-4 text-[12px] font-semibold whitespace-nowrap">
                    <button className=" px-4 py-2 rounded-md  text-white bg-blue-500 hover:bg-blue-600">
                      Edit
                    </button>
                  </td> */}
              </tr>
            </tbody>
                ))
                )
            }
            {
              !loading && (
              <tr className="divide-y divide-gray-200 bg-gray-100 " >
                  <td className="px-4
                   py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                        Total
                  </td> 
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="px-4
                   py-4 text-[12px] font-bold text-green-600 whitespace-nowrap">
                    {paidMoney}
                  </td>
                  <td className="px-4
                   py-4 text-[12px] font-bold text-red-600 whitespace-nowrap">
                    {totalMoney-paidMoney}
                  </td>
                  <td className="px-4
                   py-4 text-[12px] font-bold text-yellow-600 whitespace-nowrap" >
                    {totalMoney}
                  </td>
            </tr>
              )
            }
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminTodaySale