import './App.css';
import Login from './pages/Login'; 
import { Routes, Route, Link } from "react-router-dom";
import Register from './pages/Register';
import Home from './pages/Dashboard/Home';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import  OpenRoute  from "./components/Auth/OpenRoute";
import PrivateRoute from "./components/Auth/PrivateRoute";
import HomePage from './pages/HomePage';

function App() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem("user") ) {
      navigate("/dashboard");
    }
  }, [])

  return (
    <div className='w-[100%] h-full bg-[#E5E5E5] ' >
      <div className='w-11/12 h-full mx-auto ' >
        <Routes>
           <Route path="/" element={
             <OpenRoute>
            <HomePage />
            </OpenRoute>
           }/>
           <Route path="/register" 
           element={
            <OpenRoute>
            <Register />
            </OpenRoute>
           }/>
           <Route path="/login" element={<Login />}/>
           <Route path="/dashboard" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
           }/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
