const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan')
const expressJwt = require('express-jwt')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 7000

app.use(express.json())
app.use(morgan('dev'))
// app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect("mongodb://localhost:27017/final-project" , {useNewUrlParser:true} , () => {
    console.log("[+] Connected to the DB")
})



app.use("/auth", require("./routes/authRoutes"))
//Make the app use the express-jwt authentication middleware on anything starting with /api
app.use("/api", expressJwt({secret: process.env.SECRET}))

//Routes
app.use("/api/posts", require("./routes/postRoutes.js"))
app.use("/api/users", require("./routes/userRoutes.js"))

// app.use(bodyParser.urlencoded({extended: true}))
// app.use(express.static(path.join(__dirname, '..' , 'public')))

app.use((err,req,res,next) => {
    console.log(err)
    if (err.name === "UnauthorizedError") {
        res.status(err.status);
    }    
    return res.send({errMsg: err.message})
})

// app.get("*" , (req, res) =>{
//     res.sendFile(path.join(__dirname, "client", "build" , "index.html"))
// })

app.listen(PORT, () => {
    console.log(`[o] Server is running on port ${PORT}`)
})
 