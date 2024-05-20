import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {updateRbmData} from '../../../services/rbmAPI.jsx';
import {toast} from "react-hot-toast";
import RbmTable from './RbmTable';
import { setLoading } from '../../../slices/authSlice.js';
import { apiConnector } from '../../../services/apiConnector';
import { BASE_URL } from '../../../BaseURL';
import userImg from "../../../assests/user1.png";
import Rbm from "../RbmComponent/Rbm.jsx";
import PlantExpense from "../PlantExpensesComponents/PlantExpense.jsx";
import { logout } from '../../../services/authAPI.js';
import { VscSignOut } from "react-icons/vsc"
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";

const UpdateRbm = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    let {id} = useParams();

    const { user } = useSelector((state) => state.profile)

    const [formtype, setFormType] = useState('Rbm');
    const [toggle, setToggle] = useState(false);

    const [formData, setFormData] = useState({
        ownerName:"",
        vNumber:"",
        load:"",
        material:"",
        amount:"",
      });

      const [netWeight, setNetWeight] = useState(0);
      const [vLoad, setVLoad] = useState(0);
    
      const handleInputChange = (e) =>{
        setFormData({ ...formData,
          [e.target.name]: e.target.value
        });
      }

      useEffect(()=>{
        const load = parseInt(formData.load);
        const wt = load - vLoad;
        setNetWeight(parseInt(wt));
      },[vLoad]);

      let LastUpdatedBy;
      LastUpdatedBy=user.fullName;

      const handleUpdate = (e) =>{
        e.preventDefault();

        if(!formData.ownerName || !formData.material  || !formData.amount || !netWeight || !vLoad){
          toast.error("All fields are Required");
          return;
        }
       
          dispatch(updateRbmData(
            id,
            formData.ownerName,
            formData.load,
            formData.material,
            formData.amount,
            netWeight,
            vLoad,
            LastUpdatedBy,
           navigate));
            

        //Reset 
        setFormData({
          ownerName:'',
          vNumber:'',
          load:'',
          material:'',
          amount:'',
        });
        setNetWeight("");
        setVLoad("");
        setSelectedRbmId("");
        // window.location.reload();
      }

    const [RbmData, setRbmData] = useState([]);
    const [vNumData, setVnumData] = useState([]);
    const [selectedRbmId, setSelectedRbmId] = useState('');

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
        }
        dispatch(setLoading(false));
    }

    useEffect(()=>{
        getAllRbms();
    },[formData.vNumber])

  const getOneRbm = async() =>{
    dispatch(setLoading(true));
    try {
     
      const response = await apiConnector("get",`${BASE_URL}/rbm/get-one-sale/${id}`);
      
        if(!response.data.success){
            throw new Error(response.data.message);
        }

        setFormData(response?.data.data);
        setNetWeight(response?.data.data.netWeight);
        setVLoad(response?.data.data.vLoad);


    } catch (error) {
        console.log("Can't fetch Data due to",error);
    }
    dispatch(setLoading(false));
  }

  useEffect(()=>{
    getOneRbm();
  },[])



  return (
    <div className='flex flex-col gap-10 pt-5 pb-10' >
      <div className='w-full flex flex-col md:items-center lg:w-full ' >
      <p className='font-medium lg:text-[56px] text-center text-2xl mb-5 ' >Update <span className=' text-2xl font-bold lg:text-[46px] text-[#5D59D9] font-poppins '
                >Rbm</span> </p>
          <p className=' text-center font-semibold text-md lg:text-2xl ' >CRM Portal</p>
      </div>
            <form>
                <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[50px] ' >
                <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='vNumber' className=' text-[18px] font-semibold font-poppins ' >V. Number</label>
                            {/* <select
                                id='number'
                                name='vNumber'
                                // value={formData.vNumber}
                                onChange={(e)=>setSelectedRbmId(e.target.value)}
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            >
                              <option value="" >Select vNumber</option>
                              {
                                RbmData.map((item)=>(
                                  <option key={item._id} value={item._id}>{item.vNumber}</option>
                                ))
                              }
                            </select> */}
                            <input
                                 id='text'
                                 name='vNumber'
                                 value={formData.vNumber}
                                 onChange={handleInputChange}
                                 className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='ownerName' className=' text-[18px] font-semibold font-poppins ' >Owner Name</label>
                            <input
                                type='text'
                                id='ownerName'
                                name='ownerName'
                                value={formData.ownerName}
                                onChange={handleInputChange}
                                placeholder='Enter Owner Name'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                {/* <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='date' className=' text-[18px] font-semibold font-poppins ' >Date</label>
                            <input
                                type='date'
                                id='date'
                                name='date'
                                value={formData.date}
                                onChange={handleInputChange}
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div> */}
                  {/* <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='paymentMode' className=' text-[18px] font-semibold font-poppins ' >Payment Mode</label>
                            <select
                                id='paymentMode'
                                name='paymentMode'
                                value={formData.paymentMode}
                                onChange={handleInputChange}
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            >
                              <option value="" >Select Payment Mode</option>
                              <option value="cash" >Cash</option>
                              <option value="due" >Due (Udhaar)</option>
                              <option value="online" >Online</option>
                            </select>
                  </div>
                  {
                    formData.paymentMode === 'due' && (
                      <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='advanceAmount' className=' text-[18px] font-semibold font-poppins ' >Advance Amount</label>
                            <input
                                type='number'
                                id='advanceAmount'
                                name='advanceAmount'
                                value={formData.advanceAmount}
                                onChange={handleInputChange}
                                placeholder='Enter deposit amount'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            >
                            </input>
                  </div>
                    )
                  } */}
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='load' className=' text-[18px] font-semibold font-poppins ' >Load (in tons)</label>
                            <input
                                type='number'
                                id='load'
                                name='load'
                                value={formData.load}
                                onChange={handleInputChange}
                                placeholder='Enter Load'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='vLoad' className=' text-[18px] font-semibold font-poppins ' >V. Load (in tons)</label>
                            <input
                                type='number'
                                id='vLoad'
                                name='vLoad'
                                value={vLoad}
                                onChange={(e)=>setVLoad(e.target.value)}
                                placeholder='Enter V.Load'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='netWeight' className=' text-[18px] font-semibold font-poppins ' >Net Weight (in tons)</label>
                            <input
                                type='number'
                                id='netWeight'
                                name='netWeight'
                                value={netWeight}
                                onChange={(e)=>setNetWeight(e.target.value)}
                                placeholder='Enter Net Weight'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='material' className=' text-[18px] font-semibold font-poppins ' >Material</label>
                            <select
                                id='material'
                                name='material'
                                value={formData.material}
                                onChange={handleInputChange}
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            >
                              <option value="" >Select Material</option>
                              <option value="smallRocks" >Smaller Rocks</option>
                              <option value="gravel" >Gravel</option>
                              <option value="dust" >Dust</option>
                            </select>
                  </div>
                  <div className='flex bg-[white] flex-col gap-1 px-6 py-4 rounded-md ' >
                            <label id='amount' className=' text-[18px] font-semibold font-poppins ' >Total Amount</label>
                            <input
                                type='number'
                                id='amount'
                                name='amount'
                                value={formData.amount}
                                onChange={handleInputChange}
                                placeholder='Enter Amount'
                                className=' w-[100%] rounded-md bg-transparent text-[16px] outline-none '
                            />
                  </div>
                </div>
                <button onClick={handleUpdate} 
                className=' w-full bg-[rgb(93,89,217)] mt-10 text-xl font-semibold text-white px-2 py-3 rounded-md
                 hover:bg-[#3e3aa3] transition-all duration-300' 
                >Update Data</button>
            </form>

            {/* <h2 className='font-bold text-4xl text-[#5D59D9] font-poppins mt-[50px] '
            >All Rbms Data</h2>
            <div className='w-full h-[1px] bg-[#BFBFBF] mt-3 mb-5 ' ></div>
            <RbmTable/> */}

        </div>
  )
}

export default UpdateRbm