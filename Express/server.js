import express from 'express'
const app = express();
const port = 8000;
app.get('/',(req,res)=>{
res.send("you are requested for home rout")
})

app.get('/srk',(req,res)=>{
res.send("you are sharukh khan");
})

app.listen(port,()=>console.log(`server is running on port ${port}`))
