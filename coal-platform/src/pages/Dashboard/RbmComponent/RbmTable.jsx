import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../../BaseURL';
import { apiConnector } from '../../../services/apiConnector';
import { setLoading } from '../../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../../Loading/Loader.jsx";
import toast from 'react-hot-toast';
import { formateDate } from '../../../utils/formateDate.jsx';
import { formateTime } from '../../../utils/formateTime.js';
import "./RbmTable.css";
import { Link } from 'react-router-dom';

const RbmTable = () => {
    const [RbmData, setRbmData] = useState([]);
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
   
    const getAllRbms = async()=>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("get",`${BASE_URL}/rbm/get-rbm`);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            setRbmData(response.data.data);

        } catch (error) {
            console.log("Can't fetch Data due to",error);
            toast.error("Rbm data can't be fetched");
        }
        dispatch(setLoading(false));
    }

    useEffect(()=>{
        getAllRbms();
    },[])

    let paidMoney=0,totalMoney=0;
    RbmData.forEach(obj => {
      if(obj.advanceAmount!==0){
        paidMoney+=obj.advanceAmount;
      }
      if(obj.advanceAmount===0){
        paidMoney+=obj.amount;
      }

      totalMoney+=obj.amount;
    });

  return (
          <div className="flex flex-col" >
            <div >
              <div className="p-1.5 w-full inline-block align-middle">
                <div className="overflow-hidden border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#5D59D9] text-white ">
                      <tr >
                        <th
                          scope="col"
                          className="px-6
                           py-3 text-[14px] font-bold text-left uppercase "
                        >
                          V.Number
                        </th>
                        <th
                          scope="col"
                          className="px-6
                           py-3 text-[14px] font-bold text-left uppercase "
                        >
                          Owner Name
                        </th>
                        <th
                          scope="col"
                          className="px-6
                           py-3 text-[14px] font-bold text-left uppercase "
                        >
                          Load
                        </th>
                        <th
                          scope="col"
                          className="px-6
                           py-3 text-[14px] font-bold text-left uppercase "
                        >
                          V.Load
                        </th>
                        <th
                          scope="col"
                          className="px-6
                           py-3 text-[14px] font-bold text-left uppercase "
                        >
                          Net Weight
                        </th>
                        <th
                          scope="col"
                          className="px-6
                           py-3 text-[14px] font-bold text-left uppercase "
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6
                           py-3 text-[14px] font-bold text-left uppercase "
                        >
                          Time
                        </th>
                        <th
                          scope="col"
                          className="px-6
                           py-3 text-[14px] font-bold text-left uppercase "
                        >
                          Material Type
                        </th>
                        {/* <th
                          scope="col"
                          className="px-6
                           py-3 text-[14px] font-bold text-left uppercase "
                        >
                          Payment Mode
                        </th>
                        <th
                          scope="col"
                          className="px-6
                           py-3 text-[14px] font-bold text-left uppercase "
                        >
                          Paid Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6
                           py-3 text-[14px] font-bold text-left uppercase "
                        >
                          Remaining Amount
                        </th> */}
                        <th
                          scope="col"
                          className="px-6
                           py-3 text-[14px] font-bold text-left  uppercase "
                        >
                          Total Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6
                           py-3 text-[14px] font-bold text-left  uppercase "
                        >
                          
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
                        RbmData.map((Rbm,index)=>(
                            <tbody className="divide-y divide-gray-200" key={index} >
                <tr className='bg-gray-50' >
                        <td className="px-6
                         py-4 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                          {Rbm?.vNumber}
                        </td>
                        <td className="px-6
                         py-4 text-[14px] text-gray-800 whitespace-nowrap">{Rbm?.ownerName}</td>
                        <td className="px-6
                         py-4 text-[14px] text-gray-800 whitespace-nowrap">
                        {Rbm?.load}
                        </td>
                        <td className="px-6
                         py-4 text-[14px] text-gray-800 whitespace-nowrap">
                        {Rbm?.vLoad}
                        </td>
                        <td className="px-6
                         py-4 text-[14px] text-gray-800 whitespace-nowrap">
                        {Rbm?.netWeight}
                        </td>
                        <td className="px-6
                         py-4 text-[14px] text-gray-800 whitespace-nowrap">
                        {formateDate(Rbm?.date)}
                        </td>
                        <td className="px-6
                         py-4 text-[14px] text-gray-800 whitespace-nowrap">
                        {formateTime(Rbm?.time)}
                        </td>
                        <td className="px-6
                         py-4 text-[14px] text-gray-800 whitespace-nowrap">
                        {Rbm?.material}
                        </td>
                        {/* {
                          Rbm?.paymentMode === 'due' ?
                          (
                            <td className="px-6
                             py-4 text-[14px] text-green-500 font-semibold whitespace-nowrap">
                            {Rbm?.advanceAmount}
                            </td>
                          ) :
                          (<td className="px-6
                           py-4 text-[14px] text-green-500 font-semibold whitespace-nowrap">
                        {
                          Rbm?.amount
                        }
                        </td>)
                        } */}
                        {/* {
                          Rbm?.paymentMode === 'due' ? 
                          (<td className="px-6
                           py-4 text-[14px] text-red-500 font-semibold whitespace-nowrap">
                        {parseInt(Rbm?.amount) - parseInt(Rbm?.advanceAmount)}
                        </td>) :
                          (<td className="px-6
                           py-4 text-[14px] text-red-500 font-semibold whitespace-nowrap">
                        {0}
                        </td>)
                        } */}
                        <td className="px-6
                         py-4 text-[14px] text-yellow-500 font-semibold whitespace-nowrap">
                        {Rbm?.amount}
                        </td>
                        <td className="px-6
                         py-4 text-[14px] font-semibold whitespace-nowrap">
                            <Link to={`/update-rbm/${Rbm?._id}`}
                            >
                                <button className=" px-6 py-2 rounded-md  text-white bg-blue-500 hover:bg-blue-600">
                                  Update
                                </button>
                            </Link>
                          </td>
                          <td></td>
                      </tr>
                    </tbody>
                        ))
                        )
                    }
                    {
                      !loading && (
                      <tr className="divide-y divide-gray-200 bg-gray-100 " >
                          <td className="px-6
                           py-4 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                                Total
                          </td> 
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          {/* <td className="px-6
                           py-4 text-[14px] font-bold text-green-600 whitespace-nowrap">
                            {paidMoney}
                          </td>
                          <td className="px-6
                           py-4 text-[14px] font-bold text-red-600 whitespace-nowrap">
                            {totalMoney-paidMoney}
                          </td> */}
                          <td className="px-6
                           py-4 text-[14px] font-bold text-yellow-600 whitespace-nowrap" >
                            {totalMoney}
                          </td>
                          <td></td>
                    </tr>
                      )
                    }
                  </table>
                </div>
              </div>
            </div>
          </div>
  )
};

export default RbmTable