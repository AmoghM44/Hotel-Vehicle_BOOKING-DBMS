import axios from "axios"
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function BookHotel() {
    const navigate = useNavigate()
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const userID = location.pathname.split("/")[3]
    const [booking,setBooking] = useState({
        no_of_days:null,
        no_of_rooms:null,
        cust_id : userID,
        hotel_id: id
    })
    const [cost,setCost] = useState(0)

    const handelChange = (e) =>{
        setBooking((prev) => ({...prev,[e.target.name]:e.target.value}))
    }

    const handelClick =  (e)=>{
        e.preventDefault();
        document.getElementById("cost").style.display = "block"       
        document.getElementById("book").style.display = "none"
        document.getElementById("pay").style.display = "block"
        setCost(cost*booking.no_of_days*booking.no_of_rooms)
    }

    const [hotel, setHotel] = useState({});
    useEffect(()=>{
        const hotelInfo = async ()=>{
            try {
                const res = await axios.get("http://localhost:8800/hotels/"+id)
                setHotel(res.data[0])
                setCost(res.data[0].hotel_cost_per_day)
            } catch (error) {
                console.log(error)
            }
        }
        hotelInfo()
    },[])

    const handelPay = async (e) =>{
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/booking",booking)
            navigate("/customer/"+userID)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="form-booking">
        <h1>Book Hotel</h1>
        <p>{hotel.hotel_name}</p>
        <p>Price: {hotel.hotel_cost_per_day}</p>
        <p>Address: {hotel.hotel_address}</p>
        <p>Contact: {hotel.hotel_phone_number}</p>
        <p>Rooms Available: {hotel.hote_rooms_ava}</p>
        <input 
        type="number"
        name="no_of_days"
        placeholder="Number of days"
        onChange={handelChange}
        />
        <input 
        type="number"
        name="no_of_rooms"
        placeholder="Number of rooms"
        onChange={handelChange}
        />
        <h2 id="cost" style={{display:"none"}}>Cost: {cost}</h2>
        <button className="add_update_button" id="book" onClick={handelClick}>Book Hotel</button>
        <button className="add_update_button" id="pay" style={{display:"none"}} onClick={handelPay}>Pay</button>
    </div>
    )
}
