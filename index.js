const default_port = 3000

const open = require('open')

;(async () => {
  const server = require('./server.js')
  const port = process.env.PORT || default_port
  server.listen(port, () => console.log('Server is running.'))
  if (process.argv.indexOf("--nobrowser") === -1) {
    open(`http://localhost:${port}`)
  }
})()
