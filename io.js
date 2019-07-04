const fs = require('fs').promises
const path = require('path')
const JsonDB = require('node-json-db')

const db = new JsonDB.JsonDB("progress/progress.json")

module.exports = {
  list: async (suite, challenge) => {
    let files = await fs.readdir(path.join(__dirname, 'files'))
    if (typeof suite === 'undefined' || typeof challenge === 'undefined') {
      return files
    } else {
      return files.filter(file => file.split('.')[0] === suite && file.split('.')[1] === challenge)
    }
  },
  save: async (suite, challenge, data) => {
    suite = suite.replace(/[.\/]/g, '')
    challenge = challenge.replace(/[.\/]/g, '')
    let date = new Date()
    function nf(val) {
      return val < 10 ? '0' + val : val
    }
    const filename = `${suite}.${challenge}.${date.getFullYear()}-${nf(date.getMonth())}-${nf(date.getDate())} ${nf(date.getHours())}:${nf(date.getMonth())}:${nf(date.getSeconds())}.js`
    await fs.writeFile(path.join(__dirname, 'files', filename), data)
    return {filename}
  },
  load: async (filename) => {
    filename = filename.replace(/\//g, '').replace(/\.\./g, '')
    let contents = await fs.readFile(path.join(__dirname, 'files', filename))
    return contents
  },
  getprogress: async () => {
    return db.getData('/data')
  },
  getdone: async () => {
    return [...new Set(db.getData('./data').filter(test => test.success).map(test => {return {suite: test.filename.split('.')[0], challenge: test.filename.split('.')[1]}}))]
  },
  updateprogress: async (filename, success) => {
    db.push('/data[]', {filename, success})
  }
}
