import './App.css';
import Header from './components/Header';
import Login from './pages/Login'; 
import { Routes, Route, Link } from "react-router-dom";
import Register from './pages/Register';
import Home from './pages/Dashboard/Home';

function App() {
  return (
    <div className='w-[100%] h-full bg-[#E5E5E5] ' >
      <div className='w-11/12 h-full mx-auto ' >
        <Routes>
           <Route path="/" element={<Register />}/>
           <Route path="/register" element={<Register />}/>
           <Route path="/login" element={<Login />}/>
           <Route path="/home" element={<Home />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
