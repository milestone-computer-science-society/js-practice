import './main.scss'

import CodeMirror from 'codemirror'
require('codemirror/mode/javascript/javascript')
require('codemirror/addon/hint/show-hint.js')
require('codemirror/addon/hint/javascript-hint.js')
import Show from './show_api.js'

window.addEventListener('load', async () => {
  const editor = CodeMirror(document.querySelector('#editor'), {
    lineNumbers: true,
    mode: 'text/javascript',
    matchBrackets: true,
    theme: 'xq-dark',
    extraKeys: {
      'Ctrl-Space': 'autocomplete'
    }
  })
  editor.setSize('100%', '100%')

  document.querySelector('#save').addEventListener('click', async () => {
    await Show.save(editor)
  })
  document.querySelector('#test').addEventListener('click', async () => {
    await Show.test(editor)
  })

  await Show.listChallenges(editor)
  await Show.doneChallenges()
})
