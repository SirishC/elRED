const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');

// MongoDB Connectivity 
mongoose.connect(process.env.MONGODB_CONNECTION,{
    useNewUrlParser:true
});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Connected to MongoDB Successfully!");
})

// Routers 

const userRouter = require('./routers/users.router.js');
 
app.use('/api/users',userRouter);
const PORT = process.env.PORT || 3322;
app.listen(PORT,()=>{
    console.log(`Application running on PORT: ${PORT}`);
})