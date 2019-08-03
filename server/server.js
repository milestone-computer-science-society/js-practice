const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const tester = require('./testing.js')
const challenges = require('../challenges/javascript.js')
const io = require('./io.js')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('dist'))

app.post('/test', async (req, res, next) => {
  const challenge = challenges[req.body.suite][req.body.challenge]
  const result = await tester(path.join(global.directory, 'files', req.body.filename), challenge, `${req.body.suite}.${req.body.challenge}`)
  res.status(200).send(result)
  io.updateprogress(req.body.filename, result.success)
})

app.post('/files/list', async (req, res, next) => {
  res.status(200).send(await io.list())
})

app.post('/files/list/:suite', async (req, res, next) => {
  res.status(200).send(await io.list(req.params.suite))
})

app.post('/files/list/:suite/:challenge', async (req, res, next) => {
  res.status(200).send(await io.list(req.params.suite, req.params.challenge))
})

app.post('/files/save', async (req, res, next) => {
  res.status(200).send(await io.save(req.body.suite, req.body.challenge, req.body.data))
})

app.post('/files/load', async (req, res, next) => {
  res.status(200).send(await io.load(req.body.filename))
})

app.post('/tests', async (req, res, next) => {
  res.status(200).send(await io.getprogress())
})

app.post('/progress', async (req, res, next) => {
  res.status(200).send(await io.getdone())
})

app.post('/challenges', async (req, res, next) => {
  const c = {}
  for (let suite in challenges) {
    c[suite] = {}
    for (const challenge in challenges[suite]) {
      const original = challenges[suite][challenge]
      const details = c[suite][challenge] = {}
      details.title = original.title
      details.description = original.description
      details.task = original.task
    }
  }
  res.status(200).send(c)
})

module.exports = app
