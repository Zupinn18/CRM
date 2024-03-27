import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../../BaseURL';
import { apiConnector } from '../../../services/apiConnector';
import { setLoading } from '../../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../../../Loading/Loader.jsx";
import toast from 'react-hot-toast';
import { formateDate } from '../../../utils/formateDate.jsx';
import "./ExpenseTable.css";
import {Link} from "react-router-dom";

const ExpenseTable = () => {
    const [ExpenseData, setExpenseData] = useState([]);
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const getAllExpenses = async()=>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("get",`${BASE_URL}/expense/get-expense`);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            setExpenseData(response.data.data);

        } catch (error) {
            console.log("Can't fetch Data due to",error);
            toast.error("Expense data can't be fetched");
        }
        dispatch(setLoading(false));
    }

    useEffect(()=>{
        getAllExpenses();
    },[]);

    let electricityMoney=0,fuelMoney=0,teaMoney=0,internetMoney=0,salaryMoney=0;
    ExpenseData.forEach(obj => {
      electricityMoney+=obj.electricity;
      fuelMoney+=obj.fuel;
      teaMoney+=obj.tea;
      internetMoney+=obj.internet;
      salaryMoney+=obj.salary;
    });

    let totalMoney = electricityMoney + fuelMoney + teaMoney + internetMoney + salaryMoney;

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
                  className="px-6 py-3 text-sm font-bold text-left uppercase "
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm font-bold text-left uppercase "
                >
                  Electricity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm font-bold text-left uppercase "
                >
                  Tea
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm font-bold text-left uppercase "
                >
                  Internet
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm font-bold text-left uppercase "
                >
                  Fuel
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm font-bold text-left uppercase "
                >
                  Salary
                </th>
                {/* <th
                  scope="col"
                  className="px-6 py-3 text-sm font-bold text-left uppercase "
                >
                  Paid Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-sm font-bold text-left uppercase "
                >
                  Remaining Amount
                </th> */}
                <th
                  scope="col"
                  className="px-6 py-3 text-sm font-bold text-left  uppercase "
                >
                  Total Expense
                </th>
                {/* <th
                  scope="col"
                  className="px-6 py-3 text-sm font-bold text-left  uppercase "
                >
                  Action
                </th> */}
                
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
                ExpenseData.map((Expense)=>(
                    <tbody className="divide-y divide-gray-200" key={Expense._id} >
        <tr className='bg-gray-50' >
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {formateDate(Expense?.date)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{`${Expense?.electricity}`}</td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {`${Expense?.tea}`}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {`${Expense?.internet}`}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {`${Expense?.fuel}`}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                {`${Expense?.salary}`}
                </td>
                <td className="px-6 py-4 text-sm text-red-500 font-semibold whitespace-nowrap">
                {Expense?.electricity + Expense?.tea + Expense?.internet + Expense?.fuel + Expense?.salary} ₹
                </td>
                {/* <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap">
                  <Link  to="/admin-dashboard" >
                    <button className=" px-4 py-2 rounded-md  text-white bg-blue-500 hover:bg-blue-600">
                      Edit
                    </button>
                  </Link>
                </td> */}
              </tr>
            </tbody>
            )))
            }
            {
                      !loading && (
                      <tr className="divide-y divide-gray-200 bg-gray-100 " >
                          <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
                                Total
                          </td> 
                          <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap" >
                            {electricityMoney}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
                            {teaMoney}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
                            {internetMoney}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
                                {fuelMoney}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
                                {salaryMoney}
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-red-600 whitespace-nowrap" >
                            {totalMoney} ₹
                          </td>
                          {/* <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
                          </td> */}
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

export default ExpenseTable