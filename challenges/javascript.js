const should = require('should')

module.exports = {
  easy: {
    helloworld: {
      title: "Hello World",
      description: "The first challenge",
      task: "Log 'Hello, World!' into the console",
      verify: (output) => {
        should(output).be.exactly("Hello, World!")
      },
      mode: "vm"
    },
    vaiable: {
      title: "Create a variable",
      description: "Declaring using keywords",
      task: "Declare a variable named 'name' and initialize it with any value",
      verify: (output) => {
        should(name).be.instanceOf(String).and.not.empty()
      },
      mode: "vm"
    }
  }
}
