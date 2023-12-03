import React, { useEffect,useState } from 'react'
import axios from "axios"
import { Link, useLocation } from "react-router-dom";


export default function Vechicle() {
  const location = useLocation();
  const hotelID = location.pathname.split("/")[2]
  const [vechicles,setVechicles] = useState([])
  const [length,setLength] = useState(0)
  const handelDelete = async (id)=>{
    try {
      await axios.delete("http://localhost:8800/vechicle/"+id)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    const fetchAllVechicles = async ()=>{
      try{
        const res = await axios.get("http://localhost:8800/vechicle/"+hotelID)
        setVechicles(res.data)
        setLength(res.data.length)
      }catch(err){
        console.log(err)
      }
    }
    fetchAllVechicles()
  },[])
  
  if(length === 0){
    return(
      <div>
      <h1>Vechicles</h1>
      <div className="hotels">
        <p>No Vechicles available</p>
      </div>
      <button className='main_add'><Link to={`/vechicle_add/${hotelID}`}>Add new Vechicle</Link></button>
    </div>
    )
  }
  return (
    <div>
      <h1>Vechicles</h1>
      <div className="hotels">
        {vechicles.map(vechicle=>(
          <div className="hotel" key={vechicle.id}>
            <h2>{vechicle.v_name}</h2>
            <p>Type: {vechicle.v_type}</p>
            <p>Cost: {vechicle.v_cost}</p>
            <button className="delete" onClick={()=>{handelDelete(vechicle.id)}}>Delete</button>
            {/* <button className="update"><Link to={`/update/${hotel.id}`}>Update</Link></button> */}
          </div>
        )
        )}
      </div>
      <button className='main_add'><Link to="/add">Add new hotel</Link></button>
    </div>
  )
}
