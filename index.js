const default_port = 3000

const fs = require('fs').promises
const path = require('path')
const updateNotifier = require('update-notifier-plus')

;
(async () => {
  if (require.main.filename.indexOf('node_modules') === -1) {
    global.directory = path.dirname(require.main.filename)
  } else {
    global.directory = /.*(?=node_modules)/.exec(require.main.filename)[0]
  }
  const packageJson = require(path.join(global.directory, './package.json'))
  updateNotifier({
    pkg: packageJson
  }).notify()
  try {
    await fs.mkdir(path.join(global.directory, 'files'))
  } catch {}
  const server = require('./server/server.js')
  const port = process.env.PORT || default_port
  server.listen(port, () => console.log('Server is running.'))
  if (process.argv.indexOf('--nobrowser') === -1) {
    const open = require('open')
    open(`http://localhost:${port}`)
  }
  if (process.argv.indexOf('--dev') !== -1) {
    const readline = require('readline')
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
