import {toast} from "react-hot-toast";
import { setLoading } from "../slices/authSlice";
import { apiConnector } from "./apiConnector";
import { BASE_URL } from "../BaseURL.js";

export function uploadExpense(
    date,
    munshiSalary,
    plantDumper,
    electricity,
    rent,
    diesel,
    plantExpense,
    plantJCB,
    plantHM,
    plantTractor,
    formen,
    royalty,
    navigate,
){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",`${BASE_URL}/expense/create-expense`,{
                    date,
                    munshiSalary,
                    plantDumper,
                    electricity,
                    rent,
                    diesel,
                    plantExpense,
                    plantJCB,
                    plantHM,
                    plantTractor,
                    formen,
                    royalty,
            });

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Expense Data Uploaded Successfully");

            
            navigate("/dashboard/my-profile");

        } catch (error) {
            console.log("Can't Upload Expense Data due to",error.response.data.message);
            toast.error(`Cannot Upload because ${error.response.data.message}`);
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}