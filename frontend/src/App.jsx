import React, { useEffect, useState } from 'react'
import api from "./api/axios"
import {BrowserRouter,Routes,Route,useNavigate} from "react-router-dom"
import Lawyer from './pages/Lawyer'
import Clerk from './pages/Clerk'
import Admin from './pages/Admin'
import Login from './auth/Login'
import Register from './auth/Register'
import ProtectedRoute from './auth/ProtectedRoute'
// const AppRouts = () => {
//   const navigate=useNavigate()
//   const [role,setRole]=useState(null)
//   const [loading,setLoading]=useState(true)
//   useEffect(()=>{
//       const checkAuth=async ()=>{
//         try {
//           const res=await api.get('/auth/check')
//           setRole(res.data.role)
//           console.log(role)
//           if(res.data.message)
//             navigate("/login")
//           if(role==="lawyer") navigate("/lawyer")
//           else if(role==="admin") navigate("/admin")
//           else if(role==="clerk") navigate("/clerk")
//           else navigate("/login")
//         } catch (error) {
//           setRole(null)
//           navigate("/login")
//         } finally{
//           setLoading(false)
//         }
//       }
//     checkAuth()
//   },[navigate])
//   if(loading) return <div>waiting</div>
//   return (
//       <Routes>
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/register' element={<Register/>}/>
//         <Route path="/lawyer" element={<Lawyer />} />
//       <Route path="/clerk" element={<Clerk />} />
//       <Route path="/admin" element={<Admin />} />
//       </Routes>
//   )
// }
const App=()=>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/lawyer" element={
          <ProtectedRoute allowedRoles={["lawyer"]}>
            <Lawyer />
          </ProtectedRoute>
          } />
      <Route path="/clerk" element={
          <ProtectedRoute allowedRoles={["clerk"]}>
            <Clerk />
          </ProtectedRoute>
          } />
      <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Admin />
          </ProtectedRoute>
          } />
      </Routes>
    </BrowserRouter>
  )
}
export default App