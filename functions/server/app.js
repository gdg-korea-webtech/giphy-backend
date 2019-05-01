const express = require('express')
const cors = require('cors')
const routes = require('./routes')

// Server app basic configuration
const app = express()

// Use Middlewares
app.use(cors())
app.use('/api', routes)

module.exports = app
