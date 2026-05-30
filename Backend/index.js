//const express = require("express");
//const db = require('./src/config/db');
//require('dotenv').config();
//const app = express();
//app.use(express.json());



//app.get("/",(req,res) =>{
    //const name = "rayen"
    //res.render("page.ejs",{
       // name : name,
   // })
//})
//app.get("/:id",(req,res) =>{
    //const name =req.params
   // console.log(name)
   // if (name.id !== "rayen") {
        //return res.status(402).send("not")
    //}
    //res.status(200).send("hello me")
//})

//app.get("/test",async (req,res) =>{
    //const [rows] = await db.query("SELECT * from ingredient LIMIT 5");
   // console.log(rows);
    //res.json(rows);
//})

//app.post("/",(req,res) =>{
    //const user = {name:"ahmed",
        //age :"20"};
    //users.push(user)    
    //res.status(201).send(user)
//})

const app = require ("./src/app");
app.listen(process.env.PORT,()=>{
    console.log(`i am the index ${process.env.PORT}` )
})