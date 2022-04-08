const express=require('express');
const dotenv=require('dotenv');
const app= express();
const mongoose=require('./conn');
const registerRoute=require('./Routers/Register');
const authRoute=require('./Routers/auth');
const userRoute=require('./models/User');
const port= process.env.PORT || 8080;

app.use(express.json());
app.use('/api/register',registerRoute);
app.use('/api/auth',authRoute);
 


app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
});
