import React, { useEffect, useState } from 'react'
import {BASE_URL} from "../../BaseURL.js" ;
import { apiConnector } from '../../services/apiConnector.js';
import { setLoading } from '../../slices/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../Loading/Loader.jsx";
import toast from 'react-hot-toast';
import { formateDate } from '../../utils/formateDate.jsx';
import './RbmTable.css';
import { formateTime } from '../../utils/formateTime.js';

const RbmTable = () => {
    const [saleData, setSaleData] = useState([]);
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
   
    const getAllSales = async()=>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("get",`${BASE_URL}/rbm/get-rbm`);

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
    
    const [timeRange, setTimeRange] = useState('');

  const filterData = (timeRange) => {
    const today = new Date();
    let startDate = new Date();

    switch (timeRange) {
      case 'last3days':
        startDate.setDate(today.getDate() - 3);
        break;
      case '1week':
        startDate.setDate(today.getDate() - 7);
        break;
      case '2weeks':
        startDate.setDate(today.getDate() - 14);
        break;
      case '1month':
        startDate.setMonth(today.getMonth() - 1);
        break;
      case '3months':
          startDate.setMonth(today.getMonth() - 3);
          break;
      case '6months':
        startDate.setMonth(today.getMonth() - 6);
        break;
      case '1year':
          startDate.setMonth(today.getMonth() - 12);
          break;
      default:
        startDate = null;
    }

    if (startDate) {
      return saleData.filter(item => 
        ( item.LastUpdatedAt ? new Date(item.LastUpdatedAt ) : new Date(item.date) ) >= startDate &&
         ( item.LastUpdatedAt ? new Date(item.LastUpdatedAt ) : new Date(item.date) ) <= today);
    } else {
      return saleData;
    }
  };

  const filteredData = filterData(timeRange);

  let paidMoney=0,totalMoney=0;
  filteredData.forEach(obj => {
      if(obj.advanceAmount!=0){
        paidMoney+=obj.advanceAmount;
      }
      if(obj.advanceAmount==0){
        paidMoney+=obj.amount;
      }

      totalMoney+=obj.amount;
    });

  return (
    <div className="flex flex-col gap-5 " >
     <div className=' pr-3 w-full align-middle flex justify-end ' >
        <select
        id="timeRange"
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
        className=' px-2 py-1 md:px-4 md:py-2 text-sm  rounded-md md:text-md shadow-2xl border-slate-400 border-[1px] outline-none cursor-pointer '
        >
            <option value="" >Apply Filter</option>
          <option value="last3days">Last 3 Days</option>
          <option value="1week">1 Week</option>
          <option value="2weeks">2 Weeks</option>
          <option value="1month">1 Month</option>
          <option value="3months">3 Months</option>
          <option value="6months">6 Months</option>
          <option value="1year">1 Year</option>
          </select>
     </div>
    <div>
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
                <th
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
                </th>
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
                {/* <th
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
                </th> */}
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
                  filteredData.map((sale,index)=>(
                    <tbody className="divide-y divide-gray-200" key={index} >
        <tr className='bg-gray-50' >
                <td className="px-4
                 py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                  {sale?.vNumber}
                </td>
                <td className="px-4
                 py-4 text-[12px] text-gray-800 whitespace-nowrap">{sale?.ownerName}</td>
                <td className="px-4
                 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {sale?.load}
                </td>
                <td className="px-4
                 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {sale?.vLoad}
                </td>
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
                {/* <td className="px-4
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
                } */}
                {/* {
                  sale?.paymentMode === 'due' ? 
                  (<td className="px-4
                   py-4 text-[12px] text-red-500 font-semibold whitespace-nowrap">
                {parseInt(sale?.amount) - parseInt(sale?.advanceAmount)}
                </td>) :
                  (<td className="px-4
                   py-4 text-[12px] text-red-500 font-semibold whitespace-nowrap">
                {0}
                </td>)
                } */}
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
                <td></td>
                  {/* <td className="px-4
                   py-4 text-[12px] font-bold text-green-600 whitespace-nowrap">
                    {paidMoney}
                  </td>
                  <td className="px-4
                   py-4 text-[12px] font-bold text-red-600 whitespace-nowrap">
                    {totalMoney-paidMoney}
                  </td> */}
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

export default RbmTable