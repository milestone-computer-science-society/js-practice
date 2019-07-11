const fs = require('fs').promises
const vm = require('vm')
const logSymbols = require('log-symbols')

module.exports = async (file, challenge, id) => {
  const content = await fs.readFile(file)
  console.log(logSymbols.info, `Starting evaluation of ${file} for challenge ${challenge.title} (${id}) in ${challenge.mode} mode.`)
  let context = {}
  let result = ''
  const solution = {}
  try {
    switch (challenge.mode) {
      case 'vm':
        const script = new vm.Script(content)
        function log(...args) {
          result += args.join(' ') + '\n'
        }
        context = vm.createContext({require, console: {log}}, {name: 'Test context'})
        script.runInNewContext(context, {timeout: 10000, filename: 'code.js'})
        break
    case 'module':
        result = require(file)
        break
    }
  } catch (error) {
    console.log(logSymbols.error, error)
    console.log(logSymbols.error, 'Running your code failed.')
    solution.success = false
    solution.error = error.toString()
      return solution
  }
  console.log(logSymbols.info, 'Finished running your code.')
  console.log(logSymbols.info, 'Starting tests.')
  try {
    if (vm.isContext(context)) {
      vm.runInContext('const should = require(\'should\')', context, {filename: 'testing.js'})
      vm.runInContext(`(${challenge.verify.toString()})(\`${result.replace(/`/g, '\`')}\`)`, context, {filename: 'testing.js'})
    } else {
      challenge.verify(result)
    }
    solution.success = true
    console.log(logSymbols.info, 'All tests have passed.')
    if (typeof challenge.stop !== 'undefined') {
      challenge.stop()
    }
  } catch (error) {
    solution.success = false
    solution.error = error.toString()
    console.log(logSymbols.warning, error)
    console.log(logSymbols.warning, 'Some tests have failed.')
  }
  return solution
}
