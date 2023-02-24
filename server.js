const express = require('express');
const app = express();
require('dotenv').config();
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
const taskRouter = require('./routers/tasks.router.js');
 
app.use('/api/users',userRouter);
app.use('/api/task',taskRouter);

// API Documentation 
app.get("/", (req, res) => {
    res.status(301).redirect("https://documenter.getpostman.com/view/4446750/2s93CNNtYA#628a974c-6952-4ff3-817c-56f1b6d5a57e")
})

const PORT = process.env.PORT || 3322;
app.listen(PORT,()=>{
    console.log(`Application running on PORT: ${PORT}`);
})