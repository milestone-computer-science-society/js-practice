const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const tester = require('./testing.js')
const challenges = require('./challenges/javascript.js')
const io = require('./io.js')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('dist'))

app.post('/test', async (req, res, next) => {
  const challenge = challenges[req.body.suite][req.body.challenge]
  const result = await tester(path.join(__dirname, 'files', req.body.filename), challenge)
  res.status(200).send(result)
  io.updateprogress(req.body.filename, result.success)
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

app.post('/progress', async (req, res, next) => {
  res.status(200).send(await io.getprogress())
})

app.post('/challenges', async (req, res, next) => {
  let c = {}
  for (let suite in challenges) {
    c[suite] = {}
    for (let challenge in challenges[suite]) {
      let original = challenges[suite][challenge]
      let details = c[suite][challenge] = {}
      details.title = original.title
      details.description = original.description
      details.task = original.task
    }
  }
  res.status(200).send(c)
})

module.exports = app
