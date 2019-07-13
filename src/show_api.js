import PracticeAPI from './api.js'

const methods = {
  listChallenges: async (editor) => {
    const challenges = await PracticeAPI.getChallenges()
    let menu = '<ul>'
    for (let suite in challenges) {
      menu += `<li><ul><h3>${suite.toUpperCase()}</h3>`
      for (let challenge in challenges[suite])
        menu += `<li class='challenge' data-suite='${suite}' data-challenge='${challenge}'><h4>${challenges[suite][challenge].title}</h4><summary>${challenges[suite][challenge].description}</summary></li>`
      menu += '</ul></li>'
    }
    menu += '</ul>'
    document.querySelector('nav').innerHTML = menu
    for (let element of document.querySelectorAll('ul > li > ul > li')) {
      element.addEventListener('click', async () => {
        const suite = element.getAttribute('data-suite')
        const challenge = element.getAttribute('data-challenge')
        if (document.querySelector('.active') !== null)
          document.querySelector('.active').classList.remove('active')
          document.querySelector('h2').innerText = challenges[suite][challenge].task
        element.classList.add('active')
        await methods.listFiles(editor, element)
        const files = document.querySelectorAll('#files li')
        if (files.length !== 0) {
          files[files.length - 1].click()
          files[files.length - 1].scrollIntoView()
        }
      })
    }
    document.querySelectorAll('ul li ul li')[0].click()
  },
  doneChallenges: async () => {
    const progress = await PracticeAPI.getProgress()
    const tests = await PracticeAPI.getTests()
    const failedTests = [...new Set(tests.filter(el => !el.success).map(el => {return {suite: el.filename.split('.')[0], challenge: el.filename.split('.')[1]}}))]
    for (let span of document.querySelectorAll('span')) {
      span.parentNode.removeChild(span)
    }
    for (let element of document.querySelectorAll('ul > li > ul > li')) {
      const suite = element.getAttribute('data-suite')
      const challenge = element.getAttribute('data-challenge')
      if (progress.filter(el => el.suite === suite && el.challenge === challenge).length > 0) {
        const span = document.createElement('span')
        span.innerText = '✅'
        element.appendChild(span)
      } else if (failedTests.filter(el => el.suite === suite && el.challenge === challenge).length > 0) {
        const span = document.createElement('span')
        span.innerText = '❌'
        element.appendChild(span)
      }
    }
  },
  listFiles: async (editor, element) => {
    const suite = element.getAttribute('data-suite')
    const challenge = element.getAttribute('data-challenge')
    const files = await PracticeAPI.listFiles(suite, challenge)
    element.classList.add('active')
    let filemenu = '<ul>'
    for (let file of files) {
      const date = /\d+-\d+-\d+ \d+-\d+-\d+/.exec(file)
      filemenu += `<li data-date='${date}'>${date}</li>`
    }
    filemenu += '</ul>'
    document.querySelector('#files').innerHTML = filemenu
    for (let link of document.querySelectorAll('#files li')) {
      link.addEventListener('click', async () => {
        if (document.querySelector('.current') !== null)
          document.querySelector('.current').classList.remove('current')
        const code = await PracticeAPI.loadFile(`${suite}.${challenge}.${link.getAttribute('data-date')}.js`)
        link.classList.add('current')
        editor.setValue(code)
      })
    }
  },
  save: async (editor) => {
    if (document.querySelector('.active') === null) {
      document.querySelector('#results').innerHTML = 'Select a challenge first'
      return
    }
    const code = editor.getValue()
    const suite = document.querySelector('.active').getAttribute('data-suite')
    const challenge = document.querySelector('.active').getAttribute('data-challenge')
    const file = await PracticeAPI.saveFile(suite, challenge, code)
    await methods.listFiles(editor, document.querySelector('.active'))
    const files = document.querySelectorAll('#files li')
    files[files.length - 1].click()
    files[files.length - 1].scrollIntoView()
  },
  test: async () => {
    if (document.querySelector('.current') === null) {
      document.querySelector('#results').innerHTML = 'Save and select file before testing'
      return
    }
    const suite = document.querySelector('.active').getAttribute('data-suite')
    const challenge = document.querySelector('.active').getAttribute('data-challenge')
    const date = document.querySelector('.current').getAttribute('data-date')
    const result = await PracticeAPI.test(suite, challenge, `${suite}.${challenge}.${date}.js`)
    let message = `<br>Test ${result.success ? 'passed ✅' : 'failed ❌'}<br>`
    if (!result.success) {
      message += result.error
      message += '<br>Check the server console for more information'
    }
    await methods.doneChallenges()
    document.querySelector('#results').innerHTML = message
  }
}

export default methods
