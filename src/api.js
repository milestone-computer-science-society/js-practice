export default class PracticeAPI {
  static async test(suite, challenge, filename) {
    let result = await fetch('/test', {method: 'post', body: {suite, challenge, filename}})
    let json = await result.json()
    return json
  }

  static async listFiles(suite, challenge) {
    let result = await fetch('/files/list' + (typeof suite === 'undefined' ? '' : '/' + suite) + (typeof challenge === 'undefined' ? '' : '/' + challenge), {method: 'post'})
    let json = await result.json()
    return json
  }

  static async saveFile(suite, challenge, data) {
    let result = await fetch('/files/save', {method: 'post', body: {suite, challenge, data}})
    let json = await result.json()
    return json
  }

  static async loadFile(filename) {
    let result = await fetch('/files/load', {method: 'post', body: {filename}})
    let text = await result.text()
    return text
  }

  static async getTests() {
    let result = await fetch('/tests', {method: 'post'})
    let json = await result.json()
    return json
  }

  static async getProgress() {
    let result = await fetch('/progress', {method: 'post'})
    let json = await result.json()
    return json
  }

  static async getChallenges() {
    let result = await fetch('/challenges', {method: 'post'})
    let json = await result.json()
    return json
  }
}
