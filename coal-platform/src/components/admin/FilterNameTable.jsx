import React, { useEffect, useState } from 'react'
import {BASE_URL} from "../../BaseURL.js" ;
import { apiConnector } from '../../services/apiConnector.js';
import { setLoading } from '../../slices/authSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../Loading/Loader.jsx";
import toast from 'react-hot-toast';
import { formateDate } from '../../utils/formateDate.jsx';
import './AdminTable.css';
import { formateTime } from '../../utils/formateTime.js';

const FilterNameTable = () => {
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

  const [uniqueVNumbers, setUniqueVNumbers] = useState([]);
  const [uniqueOwnerNames, setUniqueOwnerNames] = useState([]);
  const [newfilteredData, setNewFilteredData] = useState(saleData);
  const [selectedVNumber, setSelectedVNumber] = useState('');
  const [selectedOwnerName, setSelectedOwnerName] = useState('');

  useEffect(() => {
    setUniqueVNumbers(getUniqueVNumbers(saleData));
    setUniqueOwnerNames(getUniqueOwnerNames(saleData));
  }, [saleData]);

  useEffect(() => {
    newfilterData();
  }, [selectedVNumber, selectedOwnerName, saleData]);

  const getUniqueVNumbers = (data) => {
    const vNumberArray = [];
    data?.forEach(item => {
      if (!vNumberArray.includes(item.vNumber)) {
        vNumberArray.push(item.vNumber);
      }
    });
    return vNumberArray;
  };

  const getUniqueOwnerNames = (data) => {
    const ownerNameArray = [];
    data?.forEach(item => {
      if (!ownerNameArray.includes(item.ownerName)) {
        ownerNameArray.push(item.ownerName);
      }
    });
    return ownerNameArray;
  };

  const newfilterData = () => {
    let filtered = saleData;
    if (selectedVNumber) {
      filtered = filtered.filter(item => item.vNumber === selectedVNumber);
    }
    if (selectedOwnerName) {
      filtered = filtered.filter(item => item.ownerName === selectedOwnerName);
    }
    setNewFilteredData(filtered);
  };

  
  let paidMoney=0,totalMoney=0;
  newfilteredData.forEach(obj => {
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
         <div className='flex gap-10 ' >
       <label  >
         Filter by vNumber:
         <select value={selectedVNumber} 
         className=' ml-3 px-2 py-1 md:px-4 md:py-2 text-sm  rounded-md md:text-md shadow-2xl border-slate-400 border-[1px] outline-none cursor-pointer '
         onChange={(e) => setSelectedVNumber(e.target.value)}>
           <option value=''>All</option>
           {uniqueVNumbers.map((vNumber, index) => (
             <option key={index} value={vNumber}>
               {vNumber}
             </option>
           ))}
         </select>
       </label>
       <label >
         Filter by ownerName:
         <select value={selectedOwnerName} 
         className=' ml-3 px-2 py-1 md:px-4 md:py-2 text-sm  rounded-md md:text-md shadow-2xl border-slate-400 border-[1px] outline-none cursor-pointer '
         onChange={(e) => setSelectedOwnerName(e.target.value)}>
           <option value=''>All</option>
           {uniqueOwnerNames.map((ownerName, index) => (
             <option key={index} value={ownerName}>
               {ownerName}
             </option>
           ))}
         </select>
       </label>
     </div>
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
                 newfilteredData?.map((sale,index)=>(
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

export default FilterNameTable