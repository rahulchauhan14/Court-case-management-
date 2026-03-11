
import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import api from '../api/axios.js'
import styles from './Login.module.css' // <-- Imported the styles here

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
    <form className={styles.form} onSubmit={handleLogin}>
        <h2 className={styles.heading}>login</h2>
        <label className={styles.label}>Login:
            <input className={styles.input} type="email" placeholder='Email'onChange={e=>setEmail(e.target.value)}/>
        </label>
        <label className={styles.label}>Password:
            <input className={styles.input} type="password" placeholder='Password'onChange={e=>setPassword(e.target.value)}/>
        </label>
        <button className={styles.loginBtn}>Login</button>
    </form>
    <button className={styles.registerBtn} onClick={()=>navigate('/register')}>Register</button>
    </>
  )
}

export default Login