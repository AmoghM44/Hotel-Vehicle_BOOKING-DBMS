import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
    const [cred,setCred] = useState({
        email: "",
        password:"",
    })
    const handelChange = (e) => {
        setCred((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    const handelClick = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:8800/users/"+cred.email)
            if(res.data[0].password === cred.password){
                if(res.data[0].email.includes("@admin.com")){
                    navigate("/admin")
                }else{
                    navigate("/customer/"+res.data[0].u_id)
                }
            }else{
                navigate("/wrong")
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="content-login">
      <div className="form-wrapper">
        <h2>Sign In</h2>
        <div className="form-login">
          <div className="form-control">
            <input type="text" name="email" onChange={handelChange} required />
            <label>Email or Phone Number</label>
          </div>

          <div className="form-control">
            <input type="password" name="password" onChange={handelChange} required />
            <label>Password</label>
          </div>
          <button onClick={handelClick}>Sign In</button>

          <p>
            New to the Website? <a href="./signup">Sign up now</a>
          </p>
        </div>
      </div>
    </div>
  );
}
