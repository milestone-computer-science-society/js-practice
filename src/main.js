import './main.scss'

import CodeMirror from 'codemirror'
require('codemirror/mode/javascript/javascript')
require('codemirror/addon/hint/show-hint.js')
require('codemirror/addon/hint/javascript-hint.js')
import Show from './show_api.js'

addEventListener('load', async () => {
  const editor = CodeMirror(document.querySelector('#editor'), {
    lineNumbers: true,
    mode: 'text/javascript',
    matchBrackets: true,
    theme: 'xq-dark',
    extraKeys: {
      'Ctrl-Space': 'autocomplete',
      'Shift-Tab': e => {
        let oldvalue = e.getValue()
        for (var i = 0; i < e.lineCount(); i++)
          e.indentLine(i)
      }
    }
  })
  editor.setSize('100%', '100%')

  document.querySelector('#save').addEventListener('click', async () => {
    await Show.save(editor)
  })
  document.querySelector('#test').addEventListener('click', async () => {
    await Show.test(editor)
  })

  addEventListener('beforeunload', async () => {
    if (typeof localStorage !== 'undefined' && document.querySelector('.active') !== null) {
      const suite = document.querySelector('.active').getAttribute('data-suite')
      const challenge = document.querySelector('.active').getAttribute('data-challenge')
      if (editor.getValue() !== '')
        localStorage.setItem(`${suite}.${challenge}`, editor.getValue())
    }
    return true
  })

  await Show.listChallenges(editor)
  await Show.doneChallenges()
})
