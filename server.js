const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');

// MongoDB Connectivity 
mongoose.connect(process.env.MONGODB_CONNECTION_DEV,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error: "));
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