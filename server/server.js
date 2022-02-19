const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 2020

// MIDDLEWARE //

app.use(express.json())
app.use(cors())


mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.2aekx.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
 {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
    
}).then(()=>{
    console.log("Database connected successfully")
}).catch(err=>{console.log("Database connected failed")});

// ROUTES //

app.use('/', require('./controllers/rootController'))
app.use('/user', require('./controllers/userController'))
app.use('/admin', require('./controllers/adminController'))
// app.use('/pwr', require('./controllers/pwrController'))


// LISTENER //


app.listen(port,()=>{
    console.log(`listening on port : ${port}`)
})
