import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import api from '../api/axios.js'
const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    useEffect(()=>{
        const checkAuth=async ()=>{
            try {
                const res=await api.get("/auth/check")
                const role=res.data.role
                if(role)
                    navigate(`/${role}`)
            } catch (error) {
                console.log("stay")
            }
        }
        checkAuth()
    },[])
    const handleLogin=async(e)=>{
        e.preventDefault()
        try {
            const res=await api.post("/auth/login",{email,password})
            console.log(res.data)
            const {user}=res.data
            navigate(`/${user.role}`)
        } catch (error) {
            alert("login failed")
        }
    }
  return (
    <>
    <form onSubmit={handleLogin}>
        <h2>login</h2>
        <label>Login:
            <input type="email" placeholder='Email'onChange={e=>setEmail(e.target.value)}/>
        </label>
        <label>Password:
            <input type="password" placeholder='Password'onChange={e=>setPassword(e.target.value)}/>
        </label>
        <button >Login</button>
    </form>
    <button onClick={()=>navigate('/register')}>Register</button>
    </>
  )
}

export default Login