import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VechicleAdd() {
    const location = useLocation()
    const hotelID = location.pathname.split("/")[2]
  
  const [vechicle, setVechicle] = useState({
    v_name: "",
    v_type:"",
    v_cost:""
  });
  const navigate = useNavigate();
  const handelChange = (e) => {
    setVechicle((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handelClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/vechicle/"+hotelID, vechicle);
      navigate("/admin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Add Vechicle</h1>
      <input
        type="text"
        placeholder="Vechicle Name"
        onChange={handelChange}
        name="v_name"
      />
      <input
        type="text"
        placeholder="Vechicle Type"
        onChange={handelChange}
        name="v_type"
      />
      <input
        type="number"
        placeholder="Vechciel cost"
        onChange={handelChange}
        name="v_cost"
      />
      <button className="add_update_button" onClick={handelClick}>Add</button>
    </div>
  );
}
