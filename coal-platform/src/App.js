import './App.css';
import Login from './pages/Login'; 
import { Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import  OpenRoute  from "./components/Auth/OpenRoute";
import PrivateRoute from "./components/Auth/PrivateRoute";
import HomePage from './pages/HomePage';
import AdminDashboard from './components/admin/AdminDashboard';
import UpdateSale from './pages/Dashboard/SaleComponent/UpdateSale';
import { useSelector } from 'react-redux';
import UpdateRbm from './pages/Dashboard/RbmComponent/UpdateRbm';

function App() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  
  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem("user") ) {
      if(user?.accountType === 'User'){
         navigate("/dashboard/my-profile");
      }
      if(user?.accountType === 'Admin'){
        navigate("/admin-dashboard/my-profile");
      }
    }
  },[])

  return (
    <div className='w-[100%] h-full bg-[#E5E5E5] ' >
      <Routes>
      <Route path="/dashboard/my-profile" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
           }/>
            <Route path="/" element={
             <OpenRoute>
            <HomePage />
            </OpenRoute>
           }/>
           <Route path="/admin-dashboard/my-profile" 
           element={
            <PrivateRoute>
            <AdminDashboard />
            </PrivateRoute>
           }/>
      </Routes>
      <div className='w-11/12 h-full mx-auto ' >
        <Routes>
           <Route path="/register" 
           element={
            <PrivateRoute>
            <Register />
            </PrivateRoute>
           }/>
           <Route path="/login" element={<Login />}/>
           <Route path="/update-sale/:id"
            element={
              <PrivateRoute>
                 <UpdateSale />
              </PrivateRoute>
           }/>
           <Route path="/update-rbm/:id"
            element={
              <PrivateRoute>
                 <UpdateRbm />
              </PrivateRoute>
           }/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
