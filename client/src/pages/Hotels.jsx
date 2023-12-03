import React, { useEffect,useState } from 'react'
import axios from "axios"
import { Link } from "react-router-dom";


export default function Hotels() {
  const [hotels,setHotels] = useState([])
  const [length,setLength] = useState(0)
  const handelDelete = async (id)=>{
    try {
      await axios.delete("http://localhost:8800/hotels/"+id)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
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
      <button className='main_add'><Link to="/add">Add new hotel</Link></button>
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
            <button className="delete" onClick={()=>{handelDelete(hotel.id)}}>Delete</button>
            <button className="update"><Link to={`/update/${hotel.id}`}>Update</Link></button>
            <button className="update"><Link to={`/vechicle_add/${hotel.id}`}>Add Vechicle</Link></button>
            <button className="update"><Link to={`/vechicle/${hotel.id}`}>Show Vechicle</Link></button>
          </div>
        )
        )}
      </div>
      <button className='main_add'><Link to="/add">Add new hotel</Link></button>
    </div>
  )
}
