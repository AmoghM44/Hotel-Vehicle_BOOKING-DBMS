import express from "express"
import mysql from "mysql"
import cors from "cors"

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"abhilashkateel#007",
    database:"hotel_react"
})

const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("hello this is the backend")
})

app.get("/hotels",(req,res)=>{
    const q = "SELECT * FROM hotels"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data) 
    })
})
app.get("/hotels/:id",(req,res)=>{
    const q = "SELECT * FROM hotels WHERE id= ?"
    const hotelID = req.params.id
    db.query(q,[hotelID],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data) 
    })
})

app.post("/hotels",(req,res)=>{
    const q = "INSERT INTO hotels(`hotel_name`,`hotel_cost_per_day`,`hotel_address`,`hotel_phone_number`,`hote_rooms_ava`) VALUES (?)"
    const values = [
        req.body.hotel_name,
        req.body.hotel_cost_per_day,
        req.body.hotel_address,
        req.body.hotel_phone_number,
        req.body.hote_rooms_ava
    ]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.delete("/hotels/:id",(req,res)=>{
    const hotelID = req.params.id
    const q = "DELETE FROM hotels WHERE id = ?"

    db.query(q,[hotelID],(err,data)=>{
        if(err) return res.json(err)
        return res.json("vechicle deleted succesfully")
    })
})
app.put("/hotels/:id",(req,res)=>{
    const hotelID = req.params.id
    const q = "UPDATE hotels SET `hotel_name`= ?,`hotel_cost_per_day`= ?,`hotel_address`= ?,`hotel_phone_number`= ?,`hote_rooms_ava` = ? WHERE id = ?"
    const values = [
        req.body.hotel_name,
        req.body.hotel_cost_per_day,
        req.body.hotel_address,
        req.body.hotel_phone_number,
        req.body.hote_rooms_ava
    ]
    db.query(q,[...values,hotelID],(err,data)=>{
        if(err) return res.json(err)
        return res.json("vechicle updated succesfully")
    })
})


app.get("/vechicle/:id",(req,res)=>{
    const hotelID = req.params.id
    const q = "SELECT * FROM vechicles where h_id = ?"
    db.query(q,[hotelID],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data) 
    })
})

app.post("/vechicle/:id",(req,res)=>{
    const hotelID = req.params.id
    const q = "INSERT INTO vechicles (v_name,v_type,v_cost,h_id) VALUES (?,?,?,?)"
    console.log(req.body)
    const values = [
        req.body.v_name,
        req.body.v_type,
        req.body.v_cost,
    ]
    db.query(q,[...values,hotelID],(err,data)=>{
        if(err) return res.json(err)
        return res.json("vechicle inserted succesfully")

    })

})

app.delete("/vechicle/:id",(req,res)=>{
    const vechicleID = req.params.id
    const q = "DELETE FROM vechicles WHERE id = ?"

    db.query(q,[vechicleID],(err,data)=>{
        if(err) return res.json(err)
        return res.json("vechicle deleted succesfully")
    })
})



app.listen(8800,()=>{
    console.log("Connected to backend!")   
})