const express = require('express')
const path = require('path')
const routes = require('./routes')

// Server app basic configuration
const app = express()
const port = 8008
const allowCORS = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  req.method === 'OPTIONS' ? res.send(200) : next()
}

// Use Middlewares
app.use(allowCORS)
app.use('/api', routes)

app.listen(port, () => {
  console.log('Express is listening on port: ', port)
})
