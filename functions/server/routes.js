const express = require('express')
const router = express.Router()
const { getRandomNumber } = require('./utils')
const data = require('./data.json')
const pagingUnit = 10

/**
 * @api {get} /gif/all List All Gifs
 * @apiName ListGif
 * @apiGroup Gif
 *
 * @apiParam {Number} page Page for selecting certain 10 gifs
 *
 * @apiSuccess {Array} data An array of all returned gifs
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "data": [
 *        {
 *          "kind": "hooray",
 *          "type": "gif",
 *          "id": "11sBLVxNs7v6WA",
 *          "slug": "cheer-cheering-11sBLVxNs7v6WA",
 *          "url": "https://i.giphy.com/11sBLVxNs7v6WA.gif",
 *          "createdAt": "2015-01-29 16:30:00"
 *        },
 *        {
 *          "kind": "hooray",
 *          "type": "gif",
 *          "id": "l4JySAWfMaY7w88sU",
 *          "slug": "brooklynninenine-fox-brooklyn-nine-nine-l4JySAWfMaY7w88sU",
 *          "url": "https://i.giphy.com/l4JySAWfMaY7w88sU.gif",
 *          "createdAt": "2016-12-14 01:23:13"
 *        }
 *     ]
 *   }
 *
 * @apiError PageNotProvided The page query parameter should be given.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Query parameter(page) should be given."
 *     }
 */
router.get('/gif/all', (req, res) => {
  const page = Number(req.query.page)

  if (Number.isNaN(page)) {
    res
      .status(400)
      .send({
        message: 'Query parameter(page) should be given.',
      })
  } else if (page < 1) {
    res
      .status(400)
      .send({
        message: 'Query parameter(page) starts at 1.',
      })
  }

  // Last page: 315 page
  const startIndex = (page - 1) * pagingUnit
  const endIndex = startIndex + pagingUnit - 1

  res
    .status(200)
    .send({
      data: data.slice(startIndex, endIndex),
    })
})

// GET RANDOM 50 GIF IMAGES
/**
 * @api {get} /gif/random50 Get Random 50 Gifs
 * @apiName GetRandom50Gif
 * @apiGroup Gif
 *
 * @apiSuccess {Array} data An array of randomly returned 50 gifs
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "data": [
 *        {
 *          "kind": "hooray",
 *          "type": "gif",
 *          "id": "11sBLVxNs7v6WA",
 *          "slug": "cheer-cheering-11sBLVxNs7v6WA",
 *          "url": "https://i.giphy.com/11sBLVxNs7v6WA.gif",
 *          "createdAt": "2015-01-29 16:30:00"
 *        },
 *        {
 *          "kind": "hooray",
 *          "type": "gif",
 *          "id": "l4JySAWfMaY7w88sU",
 *          "slug": "brooklynninenine-fox-brooklyn-nine-nine-l4JySAWfMaY7w88sU",
 *          "url": "https://i.giphy.com/l4JySAWfMaY7w88sU.gif",
 *          "createdAt": "2016-12-14 01:23:13"
 *        }
 *     ]
 *   }
 */
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

// SEARCH GIF IMAGES WITH THE GIVEN QUERY PARAMETER(q)
/**
 * @api {get} /gif/search Search Gifs that match the given query
 * @apiName SearchGifs
 * @apiGroup Gif
 * 
 * @apiParam {String} q Query for searching gifs
 *
 * @apiSuccess {Array} data An array of searched gifs
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "data": [
 *        {
 *          "kind": "hooray",
 *          "type": "gif",
 *          "id": "11sBLVxNs7v6WA",
 *          "slug": "cheer-cheering-11sBLVxNs7v6WA",
 *          "url": "https://i.giphy.com/11sBLVxNs7v6WA.gif",
 *          "createdAt": "2015-01-29 16:30:00"
 *        },
 *        {
 *          "kind": "hooray",
 *          "type": "gif",
 *          "id": "l4JySAWfMaY7w88sU",
 *          "slug": "brooklynninenine-fox-brooklyn-nine-nine-l4JySAWfMaY7w88sU",
 *          "url": "https://i.giphy.com/l4JySAWfMaY7w88sU.gif",
 *          "createdAt": "2016-12-14 01:23:13"
 *        }
 *     ]
 *   }
 */
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

// GET A GIF IMAGE WITH THE GIVEN ID
/**
 * @api {get} /gif/:id Get a Gif that has the given id
 * @apiName GetGif
 * @apiGroup Gif
 * 
 * @apiParam {String} id ID for getting a gif
 *
 * @apiSuccess {Object} data An object of a found gif
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "data": {
 *        "kind": "hooray",
 *        "type": "gif",
 *        "id": "11sBLVxNs7v6WA",
 *        "slug": "cheer-cheering-11sBLVxNs7v6WA",
 *        "url": "https://i.giphy.com/11sBLVxNs7v6WA.gif",
 *        "createdAt": "2015-01-29 16:30:00"
 *      }
 *   }
 */
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
        message: 'The gif image with the given id could not be found.',
      })
  }
})

module.exports = router
