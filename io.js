const fs = require('fs').promises
const path = require('path')

module.exports = {
  list: async () => {
    let files = await fs.readdir(path.join(__dirname, 'files'))
    return files
  },
  save: async (suite, challenge, data) => {
    suite = suite.replace(/[.\/]/, '')
    challenge = challenge.replace(/[.\/]/, '')
    let date = new Date()
    await fs.writeFile(path.join(__dirname, 'files', `${suite}.${challenge}/${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMonth()}:${date.getSeconds()}`))
  },
  load: async (filename) => {
    filename = filename.replace(/[.\/]/, '')
    let contents = await fs.readFile(path.join(__dirname, 'files', filename))
    return contents
  }
}
