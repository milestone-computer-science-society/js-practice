export default class PracticeAPI {
  static async test(suite, challenge, filename) {
    const result = await fetch('/test', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        suite,
        challenge,
        filename
      })
    })
    const json = await result.json()
    return json
  }

  static async listFiles(suite, challenge) {
    const result = await fetch('/files/list' + (typeof suite === 'undefined' ? '' : '/' + suite) + (typeof challenge === 'undefined' ? '' : '/' + challenge), {
      method: 'post'
    })
    const json = await result.json()
    return json
  }

  static async saveFile(suite, challenge, data) {
    const result = await fetch('/files/save', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        suite,
        challenge,
        data
      })
    })
    const json = await result.json()
    return json
  }

  static async loadFile(filename) {
    const result = await fetch('/files/load', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filename
      })
    })
    const text = await result.text()
    return text
  }

  static async getTests() {
    const result = await fetch('/tests', {
      method: 'post'
    })
    const json = await result.json()
    return json
  }

  static async getProgress() {
    const result = await fetch('/progress', {
      method: 'post'
    })
    const json = await result.json()
    return json
  }

  static async getChallenges() {
    const result = await fetch('/challenges', {
      method: 'post'
    })
    const json = await result.json()
    return json
  }
}
