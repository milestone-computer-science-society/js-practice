const default_port = 3000

const open = require('open')
const readline = require('readline')
const fs = require('fs').promises
const path = require('path')

;(async () => {
  if (require.main.filename.indexOf('node_modules') === -1) {
    global.directory = require.main.filename
  } else {
    global.directory = /.*(?=node_modules)/.exec(require.main.filename)[0]
  }
  try {
    await fs.mkdir(path.join(global.directory, 'files'))
  } catch {}
  const server = require('./server/server.js')
  const port = process.env.PORT || default_port
  server.listen(port, () => console.log('Server is running.'))
  if (process.argv.indexOf('--nobrowser') === -1) {
    open(`http://localhost:${port}`)
  }
  if (process.argv.indexOf('--dev') !== -1) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    console.log('Press enter to stop process')
    rl.on('line', () => {
      rl.close()
      process.exit()
    })
  }
})()
