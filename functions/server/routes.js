const express = require('express')
const router = express.Router()
const { getRandomNumber } = require('./utils')
const data = require('./data.json')
const pagingUnit = 10

// GET ALL GIF IMAGES WITH PAGING
router.get('/gif/all', (req, res) => {
  const { page } = req.query

  if (!page) {
    res
      .status(400)
      .send({
        message: 'Query parameter(page) should be given.',
      })
  } else if (page < 1) {
    res
      .status(400)
      .send({
        message: 'Query parameter(page) should be bigger than 0.',
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

// GET RANDOM 50 GIF IMAGES
router.get('/gif/random50', (req, res) => {
  const minIndex = 0
  const maxIndex = 2999
  const randomFiftyIndice = Array
    .from(Array(50).keys())
    .map(() => getRandomNumber(minIndex, maxIndex))

  res
    .status(200)
    .send({
      data: data
        .filter((_, index) => randomFiftyIndice.includes(index)),
    })
})

// SEARCH GIF IMAGES
router.get('/gif/search', (req, res) => {
  const { q } = req.query

  if (!q) {
    res
      .status(400)
      .send({
        message: 'Query parameter(q) should be given in order to search gif images.',
      })
  }

  res
    .status(200)
    .send({
      data: data
        .filter((gif) => gif.kind.includes(q) || q.includes(gif.kind)),
    })
})

// GET A GIF IMAGE WITH A GIVEN ID
router.get('/gif/:id', (req, res) => {
  const { id } = req.params

  if (!id) {
    res
      .status(400)
      .send({
        message: 'Parameter(id) should be given.',
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
