const express = require('express')
const router = express.Router()
const data = require('./data.json')
const pagingUnit = 10

// Get all gifs
router.get('/gif/all', (req, res) => {
  const { page } = req.query

  if (!page) {
    res
      .status(400)
      .send({
        message: 'Page query parameter should be given.',
      })
  }

  const dataToReturn = data
    // .filter((gif, index) => {
    //   // pagingUnit * page
    //   // index === 
    // });

  res
    .status(200)
    .send({
      data: dataToReturn,
    })
})

module.exports = router
