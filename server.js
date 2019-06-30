const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')

const tester = require('./testing.js')
const challenges = require('./challenges/javascript.js')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('dist'))

app.post('/test', (req, res, next) => {
  const challenge = challenges[req.body.suite][req.body.identifier]
  res.send(tester(path.join(__dirname, 'files', req.body.filename), challenge))
})

app.post('/save', (req, res, next) => {
  fs.writeFileSync(path.join(__dirname, 'files', req.body.filename), req.body.contents)
  res.sendStatus(200)
})

app.post('/file', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'files', req.body.filename))
})

module.exports = app
