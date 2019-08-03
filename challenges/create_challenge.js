const prompt = require('prompt')

const challenge_schema = {
  properties: {
    challenge: {
      type: 'string',
      required: true,
      default: ''
    },
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    task: {
      type: 'string',
      required: true
    },
    mode: {
      type: 'string',
      required: true,
      default: 'module'
    }
  }
}

prompt.start()
prompt.get(challenge_schema, (err, result) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(`
    ${result.challenge}: {
      title: '${result.title}',
      description: '${result.description}',
      task: '${result.task}',
      verify: output => {
        
      },
      mode: '${result.mode}'
    },`)
})
