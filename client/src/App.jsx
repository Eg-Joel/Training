import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/user/Home'
import UserSignup from './pages/user/UserSignup'
import UserLogin from './pages/user/UserLogin'
import Navbar from './components/Navbar'
import './App.css'
import Dashboard from './pages/admin/Dashboard'
import AdminLogin from './pages/admin/AdminLogin'
import Students from './pages/admin/Students'
import Courses from './pages/admin/Courses'
import AdminAppbar from './components/AdminAppbar'

function App() {
  const userDetails =useSelector((state)=>state.user)
  let user = userDetails?.currentUser?.rest
  const adminDetails =useSelector((state)=>state.admin)
  let admin = adminDetails?.currentAdmin?.rest

  return (
    <BrowserRouter>
      {user && <Navbar />}
      
    <Routes>
    
     <Route path='/' element={user ? <Home/>: <Navigate to={"/login"} replace={true}/>}></Route>
     <Route path='/signup' element={user ? <Navigate to={"/"} replace={true}/> : <UserSignup/>}></Route>
     <Route path='/login' element={user ? <Navigate to={"/"} replace={true}/> :<UserLogin/>}></Route>


     <Route path='/admin' element={admin ? <Dashboard/>: <AdminLogin/>}></Route>
     <Route path='/students' element={admin ? <Students/>: <AdminLogin/>}></Route>
     <Route path='/courses' element={admin ? <Courses/>: <AdminLogin/>}></Route>
    
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
