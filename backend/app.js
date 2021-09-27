const express = require("express");
const app = express()
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv/config")


const corsOptions = {
    credentials:true,
    origin:"http://localhost:3001"
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }));app.use(cors(corsOptions));
app.use(cookieParser())

// Import Routes
const usersRoute = require("./routes/users")
app.use("/api/users", usersRoute)

const booksRoute = require("./routes/books")
app.use("/api/books", booksRoute)

const cartRoute = require("./routes/cart")
app.use("/api/cart", cartRoute)

// Connect to database
mongoose.connect(process.env.DB_CONNECTION, ()=>{
    console.log("Successfully connected to database");
});

// Listen to the current port
app.listen(3000)