const express = require('express');
const app = express();
const dotenv = require("dotenv");
const dbConnect = require("./Database/database.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT || 5000;


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
)

app.get('/', (req,res)=>{
    res.send('Hey, I am Backend Server Route');
})

app.listen(PORT, ()=>{
    dbConnect();
    console.log(`Server Started at Port ${PORT}`);
})