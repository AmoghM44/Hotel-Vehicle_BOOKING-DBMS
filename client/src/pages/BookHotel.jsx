import axios from "axios"
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function BookHotel() {
    const location = useLocation()
    const id = location.pathname.split("/")[2]

    const [hotel, setHotel] = useState({});
    useEffect(()=>{
        const hotelInfo = async ()=>{
            try {
                const res = await axios.get("http://localhost:8800/hotels/"+id)
                setHotel(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        hotelInfo()
    },[])


  return (
    <>
    <div className="form-booking">
        <h1>Book Hotel</h1>
        <p>{hotel[0].hotel_name}</p>
        <p>Price: {hotel[0].hotel_cost_per_day}</p>
        <p>Address: {hotel[0].hotel_address}</p>
        <p>Contact: {hotel[0].hotel_phone_number}</p>
        <p>Rooms Available: {hotel[0].hote_rooms_ava}</p>
    </div>
    
    </>
    
    )
}
