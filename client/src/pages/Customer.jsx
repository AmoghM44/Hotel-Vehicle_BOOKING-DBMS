import React, { useEffect,useState }  from 'react'
import axios from "axios"
import { Link, useLocation } from "react-router-dom";

export default function Customer() {
    const [hotels,setHotels] = useState([])
    const [length,setLength] = useState(0)
    const location = useLocation()
    const userID = location.pathname.split("/")[2]
    useEffect(()=>{
      const fetchAllHotels = async ()=>{
        try{
          const res = await axios.get("http://localhost:8800/hotels")
          setHotels(res.data)
          setLength(res.data.length)
        }catch(err){
          console.log(err)
        }
      }
      fetchAllHotels()
    },[])

    if(length === 0){
      return(
        <div>
        <h1>Hotels</h1>
        <div className="hotels">
          <p>No Hotels available</p>
        </div>
      </div>
      )
    }
    return (
      <div>
        <h1>Hotels</h1>
        <div className="hotels">
          {hotels.map(hotel=>(
            <div className="hotel" key={hotel.id}>
              
              <h2>{hotel.hotel_name}</h2>
              <p>Price: {hotel.hotel_cost_per_day}</p>
              <p>Address: {hotel.hotel_address}</p>
              <p>Contact: {hotel.hotel_phone_number}</p>
              <p>Rooms Available: {hotel.hote_rooms_ava}</p>
              <button className='update'><Link to={`/hotels/${hotel.id}/${userID}`}>Book Hotel</Link></button>
            </div>
            
          )
          )}
        </div>
        <button className='update'><Link to={`/bookings/${userID}`}>My Bookings</Link> </button>
      </div>
    )
}
