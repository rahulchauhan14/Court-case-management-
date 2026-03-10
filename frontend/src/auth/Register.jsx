// import React, { useState,useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
// import api from '../api/axios'
// const Register = () => {
//     const [form,setFrom]=useState({
//         username:"",
//         email:"",
//         password:"",
//         role:"lawyer"
//     })
//     const navigate=useNavigate()
//     useEffect(()=>{
//             const checkAuth=async ()=>{
//                 try {
//                     const res=await api.get("/auth/check")
//                     const role=res.data.role
//                     if(role)
//                         navigate(`/${role}`)
//                 } catch (error) {
//                     console.log("stay")
//                 }
//             }
//             checkAuth()
//         },[])
//     const handleRegister=async(e)=>{
//         e.preventDefault()
//         try {
//             const res=await api.post("/auth/register",form)
//             const {user}=res.data
//             navigate(`/${user.role}`)
//         } catch (error) {
//             alert("registeration failed")
//         }
//     }
//   return (
//     <>
//     <form onSubmit={handleRegister}>
//         <h2>login</h2>
//         <label>name:
//             <input type="text" placeholder='name'onChange={e=>setFrom({...form,username:e.target.value})}/>
//         </label>
//         <label>Login:
//             <input type="email" placeholder='Email'onChange={e=>setFrom({...form,email:e.target.value})}/>
//         </label>
//         <label>Password:
//             <input type="password" placeholder='Password'onChange={e=>setFrom({...form,password:e.target.value})}/>
//         </label>
//         <select onChange={e=>setFrom({...form,role:e.target.value})}>
//             <option value="lawyer">lawyer</option>
//             <option value="admin">admin</option>
//             <option value="clerk">clerk</option>
//         </select>
//         <button onSubmit={handleRegister}>Register</button>
//     </form>
//     <button onClick={()=>navigate('/login')}>Login</button>
//     </>
//   )
// }

// export default Register
import React, { useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import styles from './Register.module.css' // <-- Imported the styles here

const Register = () => {
    const [form,setFrom]=useState({
        username:"",
        email:"",
        password:"",
        role:"lawyer"
    })
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
    const handleRegister=async(e)=>{
        e.preventDefault()
        try {
            const res=await api.post("/auth/register",form)
            const {user}=res.data
            navigate(`/${user.role}`)
        } catch (error) {
            alert("registeration failed")
        }
    }
  return (
    <>
    <form className={styles.form} onSubmit={handleRegister}>
        <h2 className={styles.heading}>login</h2>
        <label className={styles.label}>name:
            <input className={styles.input} type="text" placeholder='name'onChange={e=>setFrom({...form,username:e.target.value})}/>
        </label>
        <label className={styles.label}>Login:
            <input className={styles.input} type="email" placeholder='Email'onChange={e=>setFrom({...form,email:e.target.value})}/>
        </label>
        <label className={styles.label}>Password:
            <input className={styles.input} type="password" placeholder='Password'onChange={e=>setFrom({...form,password:e.target.value})}/>
        </label>
        <select className={styles.select} onChange={e=>setFrom({...form,role:e.target.value})}>
            <option value="lawyer">lawyer</option>
            <option value="admin">admin</option>
            <option value="clerk">clerk</option>
        </select>
        <button className={styles.submitBtn} onSubmit={handleRegister}>Register</button>
    </form>
    <button className={styles.navigateBtn} onClick={()=>navigate('/login')}>Login</button>
    </>
  )
}

export default Register