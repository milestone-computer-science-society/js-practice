import './main.sass'

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

  addEventListener('keydown', async event => {
    const isAppleDevice = navigator.platform.indexOf('Mac') === 0 || navigator.platform.indexOf('iP') === 0
    const shortcutKey = isAppleDevice ? event.metaKey : event.ctrlKey
    if (shortcutKey && event.key === 's') {
      event.preventDefault()
      await Show.save(editor)
    }
    if (shortcutKey && event.key === 'e') {
      event.preventDefault()
      await Show.test(editor)
    }
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

  document.querySelectorAll('.collapse-suite').forEach(el => el.addEventListener('click', async () => {
    if (el.classList.contains('expand-suite')) {
      el.classList.remove('expand-suite')
      el.classList.add('collapse-suite')
      el.parentNode.classList.add('expanded-suite')
      el.parentNode.classList.remove('collapsed-suite')
      el.textContent = '-'
    } else {
      el.classList.add('expand-suite')
      el.classList.remove('collapse-suite')
      el.parentNode.classList.remove('expanded-suite')
      el.parentNode.classList.add('collapsed-suite')
      el.textContent = '+'
    }
  }))
})
