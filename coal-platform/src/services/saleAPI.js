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
            navigate("/dashboard/my-profile");

        } catch (error) {
            console.log("Can't Save Data due to",error);
            toast.error(`Cannot Create because ${error.response.data.message}`);
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function updateSale( 
    id,
    ownerName,
    load,
    material,
    paymentMode,
    amount,
    netWeight,
    vLoad,
    advanceAmount,
    LastUpdatedBy,
    navigate,
    ){

return async (dispatch) =>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
        const response = await apiConnector("PUT",`${BASE_URL}/sale/update-sale`,{
            id,
            ownerName,
            load,
            vLoad,
            netWeight,
            material,
            paymentMode,
            advanceAmount,
            LastUpdatedBy,
            amount:amount,
        });


        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Sale Data Updated Successfully");
        navigate("/dashboard/my-profile");

    } catch (error) {
        console.log("Can't Updated Data due to",error);
        toast.error("Sale data can't Updated");
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
}
}