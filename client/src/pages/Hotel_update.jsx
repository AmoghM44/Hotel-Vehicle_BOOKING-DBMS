import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Hotel_update() {
  const location = useLocation()
  const bookID = location.pathname.split("/")[2]


  const [hotel, setHotel] = useState({
    hotel_name: "",
    hotel_cost_per_day: null,
    hotel_address: "",
    hotel_phone_number: null,
    hote_rooms_ava: null,
  });
  const navigate = useNavigate();
  const handelChange = (e) => {
    setHotel((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handelClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/hotels/" +bookID,hotel);
      navigate("/admin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Update the Hotel</h1>
      <input
        type="text"
        placeholder="Hotel Name"
        onChange={handelChange}
        name="hotel_name"
      />
      <input
        type="number"
        placeholder="Price per day"
        onChange={handelChange}
        name="hotel_cost_per_day"
      />
      <input
        type="text"
        placeholder="Hotel address"
        onChange={handelChange}
        name="hotel_address"
      />
      <input
        type="number"
        placeholder="Phone Number"
        onChange={handelChange}
        name="hotel_phone_number"
      />
      <input
        type="number"
        placeholder="Rooms available"
        onChange={handelChange}
        name="hote_rooms_ava"
      />
      <button className="add_update_button" onClick={handelClick}>Update</button>
    </div>
  );
}
