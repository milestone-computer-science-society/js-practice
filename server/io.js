const fs = require('fs').promises
const path = require('path')
const JsonDB = require('node-json-db')

const db = new JsonDB.JsonDB(path.join(global.directory, 'progress', 'progress.json'))

try {
  db.getData('/data')
} catch (error) {
  db.push('/data', [])
}

module.exports = {
  list: async (suite, challenge) => {
    const files = await fs.readdir(path.join(global.directory, 'files'))
    if (typeof suite === 'undefined' || typeof challenge === 'undefined') {
      return files
    } else {
      return files.filter(file => file.split('.')[0] === suite && file.split('.')[1] === challenge)
    }
  },
  save: async (suite, challenge, data) => {
    suite = suite.replace(/[.\/]/g, '')
    challenge = challenge.replace(/[.\/]/g, '')
    const date = new Date()
    function nf(val) {
      return val < 10 ? '0' + val : val
    }
    const filename = `${suite}.${challenge}.${date.getFullYear()}-${nf(date.getMonth() + 1)}-${nf(date.getDate())} ${nf(date.getHours())}-${nf(date.getMinutes())}-${nf(date.getSeconds())}.js`
    await fs.writeFile(path.join(global.directory, 'files', filename), data)
    return {filename}
  },
  load: async (filename) => {
    filename = filename.replace(/\//g, '').replace(/\.\./g, '')
    const contents = await fs.readFile(path.join(global.directory, 'files', filename))
    return contents
  },
  getprogress: async () => {
    return db.getData('/data')
  },
  getdone: async () => {
    return [...new Set(db.getData('/data').filter(test => test.success).map(test => {return {suite: test.filename.split('.')[0], challenge: test.filename.split('.')[1]}}))]
  },
  updateprogress: async (filename, success) => {
    db.push('/data[]', {filename, success})
  }
}
