require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// middleware

// this will check if any body of the 
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // only listen for requests when initiate database
    app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT)
  })
})
.catch((error) => {
    console.log(error)
})

