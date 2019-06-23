const fs = require('fs')
const vm = require('vm')
const logSymbols = require('log-symbols')

module.exports = (file, challenge) => {
  const content = fs.readFileSync(file)
  console.log(logSymbols.info, `Starting evaluation of ${file} for challenge ${challenge.title} in mode ${challenge.mode}.`)
  let result
  try {
    switch (mode) {
      case 'eval':
        eval(content + '')
        break
      case 'vm':
        const output = ""
        console.log = (...values) => {
          for (let i = 0; i < values.length; i++) {
            if (i > 0) {
              output += ' '
            }
            output += values[i].toString()
          }
          output += '\n'
        }
        vm.runInThisContext(content)
        break
      case module:
        result = require(file)
        break
    }
  } catch (error) {
    console.log(logSymbols.error, error)
    console.log(logSymbols.error, 'Running your code failed.')
  }
  console.log(logSymbols.info, 'Finished running your code.')
  console.log(logSymbols.info, 'Starting tests.')
  try {
    const success = challenge.verify()
    if (success) {
      console.log(logSymbols.info, 'All tests have passed.')
    } else {
      console.log(logSymbols.warning, 'Some tests have failed.')
    }
  } catch (error) {
    console.log(logSymbols.error, 'Your code has produced an error: ')
    console.log(logSymbols.error, error)
  }
  console.log(logSymbols.info, 'Finished tests.')
}
