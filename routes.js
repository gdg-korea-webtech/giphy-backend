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
        message: 'page query parameter should be given.',
      })
  } else if (page < 1) {
    res
      .status(400)
      .send({
        message: 'page query parameter should be bigger than 0.',
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

// GET A GIF IMAGE WITH A GIVEN ID
router.get('/gif/:id', (req, res) => {
  const { id } = req.params

  if (!id) {
    res
      .status(400)
      .send({
        message: 'id parameter should be given.',
      })
  }

  const foundGif = data.find((gif) => gif.id === id)

  if (foundGif) {
    res
      .status(200)
      .send({
        data: foundGif,
      })
  } else {
    res
      .status(400)
      .send({
        message: 'The gif image with a given id could not be found.',
      })
  }
})

module.exports = router
