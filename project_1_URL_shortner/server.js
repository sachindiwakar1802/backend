import express from "express"
import mongoose from "mongoose"
const app = express();
const port = 1000;
mongoose.connect("mongodb+srv://sachindiwakar1802_db_user:62l26BMa5kBZvk19@cluster0.9dzxwy8.mongodb.net/?appName=Cluster0",
    { dbName: "url_shortner" })
 .then(()=>console.log("mongoDb Connected...")).catch((err)=>console.log(err));
 // routes 
 // rendering the ejs file
 app.get('/',(req,res)=>{
  res.render("index.ejs",{shortUrl:null})
 })

app.listen(port,()=>{
  console.log(`server is runnung on  the port num ${port}`)
});