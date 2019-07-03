const fs = require('fs').promises
const path = require('path')
const JsonDB = require('node-json-db')
const DBconfig = require('node-json-db/lib/JsonDBConfig')

const db = new JsonDB("progress/progress.json")

module.exports = {
  list: async () => {
    let files = await fs.readdir(path.join(__dirname, 'files'))
    return files
  },
  save: async (suite, challenge, data) => {
    suite = suite.replace(/[.\/]/g, '')
    challenge = challenge.replace(/[.\/]/g, '')
    let date = new Date()
    function nf(val) {
      return val < 10 ? '0' + val : val
    }
    await fs.writeFile(path.join(__dirname, 'files', `${suite}.${challenge}.${date.getFullYear()}-${nf(date.getMonth())}-${nf(date.getDate())} ${nf(date.getHours())}:${nf(date.getMonth())}:${nf(date.getSeconds())}.js`), data)
  },
  load: async (filename) => {
    filename = filename.replace(/\//g, '').replace(/\.\./g, '')
    let contents = await fs.readFile(path.join(__dirname, 'files', filename))
    return contents
  },
  getprogress: async () => {
    return db.getData('/data')
  },
  updateprogress: async (filename, success) => {
    db.push('/data[]', {filename, success})
  }
}
