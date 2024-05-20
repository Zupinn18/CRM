import {toast} from "react-hot-toast";
import { setLoading } from "../slices/authSlice";
import { apiConnector } from "./apiConnector";
import { BASE_URL } from "../BaseURL.js";

export function createRbm( 
        date,
        ownerName,
        vNumber,
        load,
        material,
        amount,
        netWeight,
        vLoad,
        navigate,
        ){
    
    return async (dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",`${BASE_URL}/rbm/create-rbm`,{
                date,
                ownerName,
                vNumber,
                load,
                vLoad,
                netWeight,
                material,
                amount:amount,
            });

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Rbm Data Saved Successfully");
            navigate("/dashboard");

        } catch (error) {
            console.log("Can't Save Data due to",error);
            toast.error(`Cannot Create because ${error.response.data.message}`);
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function updateRbmData( 
    id,
    ownerName,
    load,
    material,
    amount,
    netWeight,
    vLoad,
    LastUpdatedBy,
    navigate,
    ){

return async (dispatch) =>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
        console.log("isme aaya");
        const response = await apiConnector("PUT",`${BASE_URL}/rbm/update-rbm`,{
            id,
            ownerName,
            load,
            vLoad,
            netWeight,
            material,
            LastUpdatedBy,
            amount:amount,
        });


        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Rbm Data Updated Successfully");
        navigate("/dashboard/my-profile");

    } catch (error) {
        console.log("Can't Updated Data due to",error);
        toast.error("Rbm data can't Updated");
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
}
}