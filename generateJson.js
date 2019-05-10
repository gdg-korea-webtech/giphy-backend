require('dotenv').config()
const fs = require('fs')
const axios = require('axios')

const apiKey = process.env.GIPHY_API_KEY

// prepare 150 queries
const queries = [
  'hooray', 'seriously?', 'ironman', 'marvel',
  'racoon', 'thor', 'god', 'omg', 'thunder', 'hmm',
  'huh?', 'love', 'captain', 'america', 'pure',
  'purity', 'tranquil', 'awesome', 'movie', 'chips',
  'war', 'explosion', 'bomb', 'tank', 'sun',
  'glasses', 'coke', 'hot', 'summer', 'winter',
  'snow', 'weather', 'dust', 'corn', 'interstellar',
  'star', 'planet', 'earth', 'humane', 'kind',
  'iphone', 'apple', 'steve jobs', 'smart', 'maple',
  'books', 'library', 'study', 'technology', 'canada',

  'free', 'news', 'cheat', 'tax', 'makeuup', 'dating',
  'propose', 'props', 'tattoo', 'team', 'holic', 'fantasy',
  'fan', 'feelings', 'nothing', 'something', 'coding',
  'geek', 'cat', 'dog', 'doggo', 'catdog', 'adventure',
  'groove', 'grooving', 'mobile', 'web', 'hero',
  'listen music', 'play music', 'music video', 'hang out',
  'infinite', 'infinite loop', 'find out', 'understand',
  'why not', 'wow', 'cheer up', 'dont worry', 'be happy',
  'how to', 'sure', 'why not', 'hint', 'rich', 'fancy',
  'reaction', 'reality', 'weekend', 'cloudy', 'sunny',
  'snow', 'winter', 'summer', 'spring', 'autumn', 'windy',

  'hello', 'oh my gosh' , 'wait a second', 'please', 'lego',
  'please dont', 'come on', 'hey', 'give up', 'guitar', 'ronaldo',
  'say hi', 'piano', 'cake', 'simpsons', 'finn the human',
  'finn and jake', 'cafe', 'coffee', 'journey', 'kitty',
  'super mario', 'smurf', 'pilot', 'candy', 'chocolate',
  'book', 'story', 'disney', 'pixar', 'food', 'spongebob',
  'rabbit', 'tiger', 'koala', 'chameleon', 'avengers',
  'frodo baggins', 'gandalf', 'snack', 'snoopy', 'cookie',
  'funny cats', 'funny dog', 'gorilla', 'notification',
  'dinosaur', 'kims convenience', 'conan obrien', 'starwars',
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

        // extract things that seem useful
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
  .catch((error) => {
    console.log('**************************************')
    console.log('******** Axios error occured. ********')
    console.log('**************************************')
    console.error(error.response)
    console.log('**************************************')
  })
