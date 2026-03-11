
// import React, { useState,useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
// import api from '../api/axios'
// import styles from './Register.module.css' // <-- Imported the styles here

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
//         })
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
//     <form className={styles.form} onSubmit={handleRegister}>
//         <h2 className={styles.heading}>login</h2>
//         <label className={styles.label}>name:
//             <input className={styles.input} type="text" placeholder='name'onChange={e=>setFrom({...form,username:e.target.value})}/>
//         </label>
//         <label className={styles.label}>Login:
//             <input className={styles.input} type="email" placeholder='Email'onChange={e=>setFrom({...form,email:e.target.value})}/>
//         </label>
//         <label className={styles.label}>Password:
//             <input className={styles.input} type="password" placeholder='Password'onChange={e=>setFrom({...form,password:e.target.value})}/>
//         </label>
//         <select className={styles.select} onChange={e=>setFrom({...form,role:e.target.value})}>
//             <option value="lawyer">lawyer</option>
//             <option value="admin">admin</option>
//             <option value="clerk">clerk</option>
//             <option value="judge">judge</option>
//         </select>
//         <button className={styles.submitBtn} onSubmit={handleRegister}>Register</button>
//     </form>
//     <button className={styles.navigateBtn} onClick={()=>navigate('/login')}>Login</button>
//     </>
//   )
// }

// export default Register
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import styles from './Register.module.css';

const Register = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        role: "lawyer" // Default role
    });
    
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await api.get("/auth/check");
                const role = res.data.role;
                if (role) {
                    navigate(`/${role}`); // Send them to their dashboard if already logged in
                }
            } catch (error) {
                console.log("Not logged in, staying on register page.");
            }
        };
        checkAuth();
    }, []); // <-- FIX 1: ADDED THIS EMPTY ARRAY! Now it only checks ONCE when the page loads.

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/register", form);
            // Assuming your backend returns the user object with a role
            const { user } = res.data;
            alert("Registration successful!");
            navigate(`/${user.role}`);
        } catch (error) {
            // FIX 2: Better error message so you know exactly what info was missing/wrong
            const errorMessage = error.response?.data?.message || "Registration failed. Please check your details.";
            alert(errorMessage);
        }
    };

    return (
        <>
            <form className={styles.form} onSubmit={handleRegister}>
                <h2 className={styles.heading}>Register Account</h2>
                
                {/* FIX 3: Added 'required' to prevent submitting empty fields */}
                <label className={styles.label}>Name:
                    <input 
                        className={styles.input} 
                        type="text" 
                        placeholder='Full Name'
                        required
                        onChange={e => setForm({ ...form, username: e.target.value })} 
                    />
                </label>
                
                <label className={styles.label}>Email:
                    <input 
                        className={styles.input} 
                        type="email" 
                        placeholder='Email Address'
                        required
                        onChange={e => setForm({ ...form, email: e.target.value })} 
                    />
                </label>
                
                <label className={styles.label}>Password:
                    <input 
                        className={styles.input} 
                        type="password" 
                        placeholder='Password'
                        required
                        onChange={e => setForm({ ...form, password: e.target.value })} 
                    />
                </label>
                
                <label className={styles.label}>Role:
                    <select 
                        className={styles.select} 
                        value={form.role}
                        onChange={e => setForm({ ...form, role: e.target.value })}
                    >
                        <option value="lawyer">Lawyer</option>
                        <option value="admin">Admin</option>
                        <option value="clerk">Clerk</option>
                        <option value="judge">Judge</option>
                    </select>
                </label>
                
                {/* FIX 4: Changed onSubmit to type="submit" for the button */}
                <button type="submit" className={styles.submitBtn}>
                    Register
                </button>
            </form>
            
            <button className={styles.navigateBtn} onClick={() => navigate('/login')}>
                Already have an account? Login
            </button>
        </>
    );
};

export default Register;