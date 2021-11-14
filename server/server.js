const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 2020

// MIDDLEWARE //

app.use(express.json())
app.use(cors())



// LISTENER //


app.listen(port,()=>{
    console.log(`listening on port : ${port}`)
})
