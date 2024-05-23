import {toast} from "react-hot-toast";
import { setLoading, setToken } from "../slices/authSlice";
import {setUser} from "../slices/profileSlice";
import { apiConnector } from "./apiConnector";
import { BASE_URL } from "../BaseURL.js";


export function register(fullName,email,password,confirmPassword,phoneNumber, accountType, navigate) {

    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", `${BASE_URL}/auth/register`, {
                fullName,
                email,
                password,
                confirmPassword,
                phoneNumber,
                accountType,
            });

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("User Registration Successfull");
            navigate("/");

        } catch (error) {
            console.log("SIGNUP API ERROR.............", error)
            toast.error("Signup Failed")
            navigate("/register")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}

export function login(email, password, navigate){
    return async(dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",`${BASE_URL}/auth/login`, {
                email,
                password
            });
            
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Login Successful");

            dispatch(setToken(response.data.token));
            dispatch(setUser({ ...response.data.user}));

            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))

            if(response?.data.user.accountType === 'User'){
                navigate("/dashboard/my-profile");
            } else if(response?.data.user.accountType === 'Admin'){
                navigate("/admin-dashboard/my-profile");
            }

        } catch (error) {
            console.log("LOGIN API ERROR..............", error);
            toast.error(`Login failed due to ${error.response.data.message}`)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }