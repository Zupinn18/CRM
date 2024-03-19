import {toast} from "react-hot-toast";
import { setLoading } from "../slices/authSlice";
import { apiConnector } from "./apiConnector";
import { BASE_URL } from "../BaseURL.js";

export function createSale( 
        date,
        ownerName,
        vNumber,
        load,
        material,
        paymentMode,
        amount,
        netWeight,
        vLoad,
        advanceAmount,
        navigate,
        ){
    
    return async (dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",`${BASE_URL}/sale/create-sale`,{
                date,
                ownerName,
                vNumber,
                load,
                vLoad,
                netWeight,
                material,
                paymentMode,
                advanceAmount,
                amount:amount,
            });

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Sale Data Saved Successfully");
            navigate("/dashboard");

        } catch (error) {
            console.log("Can't Save Data due to",error);
            toast.error(`Cannot Create because ${error.response.data.message}`);
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function updateSale( 
    date,
    ownerName,
    vNumber,
    load,
    material,
    paymentMode,
    amount,
    netWeight,
    vLoad,
    advanceAmount,
    navigate,
    ){

return async (dispatch) =>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
        const response = await apiConnector("PUT",`${BASE_URL}/sale/update-sale`,{
            date,
            ownerName,
            vNumber,
            load,
            vLoad,
            netWeight,
            material,
            paymentMode,
            advanceAmount,
            amount:amount,
        });


        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Sale Data Updated Successfully");
        navigate("/dashboard");

    } catch (error) {
        console.log("Can't Updated Data due to",error);
        toast.error("Sale data can't Updated");
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
}
}