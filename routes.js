const express = require('express')
const router = express.Router()
const data = require('./data.json')
const pagingUnit = 10

// GET ALL GIF IMAGES WITH PAGING
router.get('/gif/all', (req, res) => {
  const { page } = req.query

  if (!page) {
    res
      .status(400)
      .send({
        message: 'Page query parameter should be given.',
      })
  } else if (page < 1) {
    res
      .status(400)
      .send({
        message: 'Page query parameter should be bigger than 0.',
      })
  }

  const startIndex = page - 1
  const endIndex = page * pagingUnit

  res
    .status(200)
    .send({
      data: data.slice(startIndex, endIndex),
    })
})

module.exports = router
