import React, { useEffect,useState }  from 'react'
import axios from "axios"
import { Link, useLocation } from "react-router-dom";

export default function Bookings() {
    const location = useLocation()
    const userID = location.pathname.split("/")[2]
    const [hotels,setHotels] = useState([])
    
    useEffect(()=>{
      const fetchAllHotels = async ()=>{
        try{
          const res = await axios.get("http://localhost:8800/booking/"+userID)
          setHotels(res.data)
          console.log(hotels)
        }catch(err){
          console.log(err)
        }
      }
      fetchAllHotels()
    },[])
    
    
    return (
      <div>
        <h1>Bookings</h1>
        <div className="hotels">
          {hotels.map(hotel=>(
            <div className="hotel" key={`${hotel.hotel_id}`}>
              <h2>Hotel ID: {hotel.hotel_id}</h2>
              <p>No of days: {hotel.no_of_days}</p>
              <p>No of rooms: {hotel.no_of_rooms}</p>
            </div>
          )
          )}
        </div>
      </div>
    )
}
