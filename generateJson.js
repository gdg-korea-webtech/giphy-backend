const fs = require('fs')
const axios = require('axios')

const apiKey = 'FJ3V96H0Zez9EgXoNm4rIJmHP00FdPeZ'

// prepare 150 queries
const queries = [
  'hooray', 'seriously?', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',

  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',

  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',

  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',

  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '',
];

const allRequests = queries
  .map((query) => {
    return axios({
      method: 'get',
      url: 'http://api.giphy.com/v1/gifs/search',
      params: {
        api_key: apiKey,
        q: query,
        limit: 20,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data.data)
    .then((data) => {
      return data.map((gif) => {
        const gifPath = gif.images.original_still.url.split('/media/')[1]
        const gifHashId = gifPath.split('/')[0]
        const resolvedUrl = `https://i.giphy.com/${gifHashId}.gif`

        return {
          kind: query,
          type: gif.type,
          id: gif.id,
          slug: gif.slug,
          url: resolvedUrl,
          createdAt: gif.import_datetime,
        }
      })
    })
  })

Promise
  .all(allRequests)
  .then((allData) => {
    const result = allData.reduce(
      (flattened, array) => flattened.concat(...array),
      []
    )

    fs.writeFile(
      'data.json',
      JSON.stringify(result),
      'utf8',
      () => {}
    )
  })
