import express from 'express'
import mongoose from 'mongoose'
const app = express();

mongoose.connect("mongodb+srv://sachindiwakar1802_db_user:62l26BMa5kBZvk19@cluster0.9dzxwy8.mongodb.net/?appName=Cluster0",{dbName:"Nodejs"}).then(()=>console.group("mongo db connected...")).catch((err)=>console.log(err));

const port = 1000;
app.listen(port,()=>console.log(`server is running on port ${port}`));

