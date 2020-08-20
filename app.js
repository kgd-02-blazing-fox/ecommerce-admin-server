if(process.env.NODE_ENV === 'development'){
  require('dotenv').config()
} else if (process.env.NODE_ENV === 'test'){
  require('dotenv').config()
}

const express = require('express');
const app = express()

const cors = require('cors')
// const whitelist = ['http://localhost:8080'];
// const corsOptions = {
//   credentials: true, // This is important.
//   origin: (origin, callback) => {
//     if(whitelist.includes(origin))
//       return callback(null, true)
//       callback(new Error('Not allowed by CORS'));
//   }
// }

const index = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(cors(corsOptions));
app.use(cors())
app.use('/', index)
app.use(errorHandler)

module.exports = app