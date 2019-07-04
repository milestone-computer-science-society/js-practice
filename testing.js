const fs = require('fs').promises
const vm = require('vm')
const logSymbols = require('log-symbols')

module.exports = async (file, challenge) => {
  const content = await fs.readFile(file)
  console.log(logSymbols.info, `Starting evaluation of ${file} for challenge ${challenge.title} in mode ${challenge.mode}.`)
  let result
  try {
    switch (challenge.mode) {
      case 'eval':
        eval(content + '')
        break
      case 'vm':
        result = ''
        const log = console.log
        console.log = (...values) => {
          for (let i = 0; i < values.length; i++) {
            if (i > 0) {
              result += ' '
            }
            result += values[i].toString()
          }
          result += '\n'
        }
        vm.runInThisContext(content)
        console.log = log
        break
    case 'module':
        result = require(file)
        break
    }
  } catch (error) {
    console.log(logSymbols.error, error)
    console.log(logSymbols.error, 'Running your code failed.')
  }
  console.log(logSymbols.info, 'Finished running your code.')
  console.log(logSymbols.info, 'Starting tests.')
  let solution = {}
  try {
    challenge.verify(result)
    solution.success = true
    console.log(logSymbols.info, 'All tests have passed.')
    if (typeof challenge.stop !== 'undefined') {
      challenge.stop()
    }
  } catch (error) {
    solution.success = false
    console.log(logSymbols.warning, 'Some tests have failed.')
    console.log(logSymbols.warning, error)
  }
  return solution
}
