import axios from 'axios'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Signup() {
    const navigate = useNavigate()
    const [cred,setCred] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handelChange = (e) =>{
        setCred((prev)=>({ ...prev, [e.target.name]: e.target.value }))
    }

    const handelClick = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:8800/users/"+cred.email)
            if(res.data.length > 0){
                navigate("/exists")
            }else{
                await axios.post("http://localhost:8800/users/",cred)
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
<div className="form-wrapper">
        <h2>Sign Up</h2>
        <div className="form-login">
        <div className="form-control">
                <input type="text" name="name" onChange={handelChange}required />
                <label>Full Name</label>
            </div>
            <div className="form-control">
                <input type="text" name="email" onChange={handelChange}required />
                <label>Email or Phone Number</label>
            </div>
            
            <div className="form-control">
                <input type="password" name="password" onChange={handelChange}required />
                <label>Password</label>
            </div>
            <button onClick={handelClick}>Sign Up</button>
        
        <p>Already have an account? <a href="./">Sign in</a></p>
        </div>
            

    </div>
    )
}
