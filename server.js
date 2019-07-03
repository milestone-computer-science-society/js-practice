const express = require('express')
const bodyParser = require('body-parser')

const tester = require('./testing.js')
const challenges = require('./challenges/javascript.js')
const io = require('./io.js')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('dist'))

app.post('/test', (req, res, next) => {
  const challenge = challenges[req.body.suite][req.body.challenge]
  res.status(200).send(await tester(path.join(__dirname, 'files', req.body.filename), challenge))
})

app.post('/files/list', async (req, res, next) => {
  res.status(200).send(await io.list())
})

app.post('/files/save', async (req, res, next) => {
  await io.save(req.body.suite, req.body.challenge, req.body.data)
  res.sendStatus(200)
})

app.post('/files/load', async (req, res, next) => {
  res.status(200).send(await io.load(req.body.filename))
})

app.post('/progress/update', async (req, res, next) => {

})

app.post('/progress/load', async (req, res, next) => {

})

module.exports = app
