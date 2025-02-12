const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Database setup
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.p14wy.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/files',
  express.static(path.resolve(__dirname, '../', 'tmp', 'uploads'))
)

app.use(require('./routes'))

app.listen(3000)
