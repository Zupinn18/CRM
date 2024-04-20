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

function App() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem('token') && localStorage.getItem("user") ) {
  //     // navigate("/dashboard");
  //   }
  // },[])

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
      </Routes>
      <div className='w-11/12 h-full mx-auto ' >
        <Routes>
           <Route path="/register" 
           element={
            <OpenRoute>
            <Register />
            </OpenRoute>
           }/>
           <Route path="/login" element={<Login />}/>
           <Route path="/update-sale/:id" element={
              <UpdateSale />
           }/>
           <Route path="/admin-dashboard" 
           element={
            <OpenRoute>
            <AdminDashboard />
            </OpenRoute>
           }/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
