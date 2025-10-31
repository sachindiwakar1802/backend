import express from 'express'
const app = express();
app.get('/',(req,res)=>{
  res.render('index.ejs')
})
const port = 2000;
app.listen(port,()=>console.log(`server is running on port ${port}`))