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

function App() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile)
  // console.log("user is ", user);
  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem("user") ) {
      if(user.accountType === 'User'){
         navigate("/dashboard");
      }else if(user.accountType === 'Admin'){
        navigate("/admin-dashboard");
      }
    }
  },[])

  return (
    <div className='w-[100%] h-full bg-[#E5E5E5] ' >
      <Routes>
      <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
           }/>
            <Route path="/" element={
             <OpenRoute>
            <HomePage />
            </OpenRoute>
           }/>
           <Route path="/admin-dashboard" 
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
        </Routes>
      </div>
    </div>
  );
}

export default App;
