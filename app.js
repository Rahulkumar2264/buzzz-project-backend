const express=require('express');
const dotenv=require('dotenv');
const app= express();
const cors = require('cors');
const mongoose=require('./conn');
// const registerRoute=require('./Routers/register');
const authRoute=require('./Routers/auth');
const profileRouter=require('./Routers/profile');
const postRouter=require('./Routers/post');
const userRoute=require('./models/User');
const port= process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
// app.use('/api/register',registerRoute);
app.use('/api/auth',authRoute);
app.use('/api/profile',profileRouter);
app.use('/api/post',postRouter);
 


app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
});
