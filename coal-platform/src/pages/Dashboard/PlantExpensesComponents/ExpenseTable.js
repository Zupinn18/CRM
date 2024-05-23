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

    console.log("expense data is ", ExpenseData);

    let electricityMoney=0,fuelMoney=0,formenMoney=0,munshiSalaryMoney=0,salaryMoney=0, 
    plantDumpMoney=0, plantExpenseMoney=0,advanceSalaryMoney=0,miscellaneousSalaryMoney=0,
    plantHMMoney=0, plantJCBMoney=0, plantTractorMoney=0, rentMoney=0, royaltyMoney=0;
    ExpenseData?.forEach(obj => {
      electricityMoney+=obj.electricity;
      fuelMoney+=obj.diesel;
      formenMoney+=obj.formen;
      munshiSalaryMoney+=obj.munshiSalary;
      plantDumpMoney+=obj.plantDumper;
      plantExpenseMoney += obj.plantExpense;
      plantHMMoney += obj.plantHM;
      plantJCBMoney += obj.plantJCB;
      plantTractorMoney += obj.plantTractor;
      rentMoney += obj.rent;
      royaltyMoney += obj.royalty;
      advanceSalaryMoney += obj.advanceSalary;
      miscellaneousSalaryMoney += obj.miscellaneousSalary;
    });

    let totalMoney = electricityMoney + fuelMoney + formenMoney + munshiSalaryMoney + plantDumpMoney 
    + plantExpenseMoney + plantHMMoney + plantJCBMoney + plantTractorMoney + rentMoney + royaltyMoney + advanceSalaryMoney + miscellaneousSalaryMoney ;

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
                  className="px-4 py-3 text-[12px] font-bold text-left uppercase "
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[12px] font-bold text-left uppercase "
                >
                  Diesel
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[12px] font-bold text-left uppercase "
                >
                  Electricity
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[12px] font-bold text-left uppercase "
                >
                  Formen
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[12px] font-bold text-left uppercase "
                >
                  Munshi Salary
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[12px] font-bold text-left uppercase "
                >
                  Advance Salary
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[12px] font-bold text-left uppercase "
                >
                  Plant Dumper
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[12px] font-bold text-left uppercase "
                >
                  Plant Expense
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[12px] font-bold text-left uppercase "
                >
                  Plant HM
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[12px] font-bold text-left uppercase "
                >
                  Plant JCB
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[12px] font-bold text-left uppercase "
                >
                  Plant Tractor
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[12px] font-bold text-left uppercase "
                >
                  Rent
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[12px] font-bold text-left uppercase "
                >
                  Royalty
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[12px] font-bold text-left uppercase "
                >
                  Miscellaneous Salary
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[12px] font-bold text-left  uppercase "
                >
                  Total Expense
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
                ExpenseData?.map((Expense)=>(
                    <tbody className="divide-y divide-gray-200" key={Expense._id} >
        <tr className='bg-gray-50' >
                <td className="px-6 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {formateDate(Expense?.date)}
                </td>
                <td className="px-6 py-4 text-[12px] text-gray-800 whitespace-nowrap">{`${Expense.diesel}`}</td>
                <td className="px-6 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {`${Expense?.electricity}`}
                </td>
                <td className="px-6 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {`${Expense?.formen}`}
                </td>
                <td className="px-6 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {`${Expense?.munshiSalary} rs, ${Expense?.munshiName}`}
                </td>
                <td className="px-6 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {`${Expense?.advanceSalary}`}
                </td>
                <td className="px-6 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {`${Expense?.plantDumper}`}
                </td>
                <td className="px-6 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {`${Expense?.plantExpense}`}
                </td>
                <td className="px-6 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {`${Expense?.plantHM}`}
                </td>
                <td className="px-6 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {`${Expense?.plantJCB}`}
                </td>
                <td className="px-6 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {`${Expense?.plantTractor}`}
                </td>
                <td className="px-6 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {`${Expense?.rent}`}
                </td>
                <td className="px-6 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {`${Expense?.royalty}`}
                </td>
                <td className="px-6 py-4 text-[12px] text-gray-800 whitespace-nowrap">
                {`${Expense?.miscellaneousSalary}`}
                </td>
                <td className="px-6 py-4 text-[12px] text-red-500 font-semibold whitespace-nowrap">
                Rs. {Expense?.electricity + Expense?.formen + Expense?.munshiSalary + Expense?.diesel + Expense?.advanceSalary + Expense?.miscellaneousSalary +
                Expense?.plantDumper + Expense?.plantHM + Expense?.plantExpense + Expense?.plantJCB + Expense?.plantTractor + Expense?.rent + Expense?.royalty }
                </td>
              </tr>
            </tbody>
            )))
            }
            {
                      !loading && (
                      <tr className="divide-y divide-gray-200 bg-gray-100 " >
                          <td className="px-6 py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                                Total
                          </td> 
                          <td className="px-6 py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap" >
                            {fuelMoney}
                          </td>
                          <td className="px-6 py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                            {electricityMoney}
                          </td>
                          <td className="px-6 py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                            {formenMoney}
                          </td>
                          <td className="px-6 py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                            {munshiSalaryMoney}
                          </td>
                          <td className="px-6 py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                                {advanceSalaryMoney}
                          </td>
                          <td className="px-6 py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                                {plantDumpMoney}
                          </td>
                          <td className="px-6 py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                                {plantExpenseMoney}
                          </td>
                          <td className="px-6 py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                                {plantHMMoney}
                          </td>
                          <td className="px-6 py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                                {plantJCBMoney}
                          </td>
                          <td className="px-6 py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                                {plantTractorMoney}
                          </td>
                          <td className="px-6 py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                                {rentMoney}
                          </td>
                          <td className="px-6 py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                                {royaltyMoney}
                          </td>
                          <td className="px-6 py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
                                {miscellaneousSalaryMoney}
                          </td>
                          <td className="px-6 py-4 text-[12px] font-bold text-red-600 whitespace-nowrap" >
                          Rs. {totalMoney}
                          </td>
                          {/* <td className="px-6 py-4 text-[12px] font-semibold text-gray-800 whitespace-nowrap">
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