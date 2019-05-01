const functions = require('firebase-functions')
const app = require('./server/app')

exports.gdgWebtechHackathonBackend = functions.https.onRequest(app)
