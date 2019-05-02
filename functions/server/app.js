const express = require('express')
const cors = require('cors')
const routes = require('./routes')

// Server app basic configuration
const app = express()

// Use middlewares
app.use(cors())
app.use(express.static('public'))
app.use('/api', routes)

module.exports = app
