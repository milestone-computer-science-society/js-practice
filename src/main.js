import './main.scss'

import React from "react";
import { render } from "react-dom";
import codemirror from 'codemirror';
require('codemirror/mode/javascript/javascript');
import PracticeAPI from './api.js';
import {UnControlled as CodeMirror} from 'react-codemirror2';



const Editor = () => {
  return <CodeMirror
    value=''
    options={{
      mode: 'javascript',
      theme: 'material',
      lineNumbers: true
    }}
  />
}

let getFontsize = () => {
  return localStorage.getItem('fontSize') || 16
}

let setFontSize = (size) => {
  return localStorage.setItem('fontSize', size)
}

const App = () => (
  <div id='container'>
    <div id='sideMenu'>
    </div>
    <div id='topMenu'>
      <select id='chooseTheme'>
      </select>
      <input id='fontSize' type='number '/>
    </div>
    <div id='editor'>
    <Editor />
    </div>
    <div id='previousVersions'>
    </div>
    <div id='test'>
      <button id='testButton'>Test</button>
      <div id='testResult'>
      </div>
    </div>
  </div>
);

render(<App />, document.getElementById("root"))

document.querySelector('.CodeMirror').style.fontSize = getFontsize() + 'px'
document.querySelector('#fontSize').addEventListener('input', function() {
  setFontSize(event.target.value)
  document.querySelector('.CodeMirror').style.fontSize = event.target.value + 'px'
})

window.addEventListener("load", async () => {
  const challenges = await PracticeAPI.getChallenges()
  document.querySelector("#sideMenu").innerHTML += "<ul>"
  for (let suite in challenges) {
    document.querySelector("#sideMenu").innerHTML += `<li><ul><h3>${suite}</h3>`
    for (let challenge in challenges[suite]) {
      document.querySelector("#sideMenu").innerHTML += `<li data-suite='${suite}' data-challenge='${challenge}'><h4>${challenges[suite][challenge].title}</h4><summary>${challenges[suite][challenge].description}</summary></li>`
    }
    document.querySelector("#sideMenu").innerHTML += "</ul></li>"
  }
  document.querySelector("#sideMenu").innerHTML += "</ul>"
})
