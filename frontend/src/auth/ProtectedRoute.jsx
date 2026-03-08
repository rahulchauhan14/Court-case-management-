import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { Navigate,useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children,allowedRoles}) => {
    const [loading,setLoading]=useState(true)
    const [authorized,setAuthorized]=useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
        const checkRole=async ()=>{
            try {
                const res=await api.get("/auth/check")
                const role=res.data.role
                if(!allowedRoles||allowedRoles.includes(role))
                    setAuthorized(true)
            } catch (error) {
                setAuthorized(false)
            }
            finally{
                setLoading(false)
            }
            checkRole()
        }
        checkRole()
    },[])
    if(loading) return <div>loading</div>
    if(!authorized) return <Navigate to="/login" replace/>
  return children
}

export default ProtectedRoute