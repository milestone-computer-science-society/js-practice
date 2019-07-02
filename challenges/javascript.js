const should = require('should')

module.exports = {
  beginner: {
    helloworld: {
      title: 'Hello World',
      description: 'The first challenge',
      task: 'Log "Hello, World!" into the console',
      verify: output => {
        should(output).be.exactly('Hello, World!')
      },
      mode: 'vm'
    },
    variable: {
      title: 'Create a variable',
      description: 'Declaring using keywords',
      task: 'Declare a variable named "name" and initialize it with any non-empty value',
      verify: output => {
        should(name).be.instanceOf(String).and.not.empty()
      },
      mode: 'vm'
    },
    number: {
      title: 'Create a numerical variable',
      description: 'Declaring using keywords',
      task: 'Declare a variable named "cost" and initialize it with a numerical value',
      verify: output => {
        should(cost).be.instanceOf(Number)
      },
      mode: 'vm'
    },
    sum: {
      title: 'Create a function',
      description: 'A simple sum function',
      task: 'Create the funcion "sum" that sums the 3 parameters it receives',
      verify: output => {
        should(sum(5, 6, -8)).be.exactly(3)
        should(sum(-7, 452, 19.7)).be.exactly(464.7)
      },
      mode: 'eval'
    },
    highestIndex: {
      title: 'Largest element',
      description: 'The largest element in an array',
      task: 'Create the function "max" which given an array as a parameter, returns the highest element\'s index',
      verify: output => {
        should(max([5, -6, 4.3, 19, 85, 10])).be.exactly(4)
        should(max([7, 4, 0, 4])).be.exactly(0)
      },
      mode: 'eval'
    },
    multiply: {
      title: 'Multiplication',
      description: 'Multiplying numbers',
      task: 'Create the function "times" which returns the two numbers it received multiplied together',
      verify: output => {
        should(times(7, 8)).be.exactly(56)
        should(times(0, 2)).be.exactly(0)
        should(times(23, 74)).be.exactly(1702)
      },
      mode: 'eval'
    },
    object: {
      title: 'Object',
      description: 'Create an object with properties',
      task: 'Create an object called "details" which has at least 5 properties',
      verify: output => {
        should(Object.keys(details).length).be.aboveOrEqual(5)
      },
      mode: 'vm'
    },
    swap: {
      title: 'Array swapping',
      description: 'Swap two elements of an array',
      task: 'Create a function called "swap" that receives 3 parameters: an array, and two indices, which represent the elements that should be swapped',
      verify: output => {
        let a = swap([5, 6, 7, 8])
        let b = [5, 8, 7, 6]
        should(a).be.deepEqual(b)
      },
      mode: 'vm'
    },
    triangle: {
      title: 'Triangle properties',
      description: 'Calculate perimeter and area of triangle',
      task: 'Create a function called "triangle" that receives the 3 lengths of the sides of a triangle, and returns an object, with two properties, the area and perimetre of the triangle',
      verify: output => {
        should(triangle(5, 6, 7)).deepEqual({area: Math.sqrt(9*4*3*2), perimeter: 18})
        should(triangle(6, 8, 10)).deepEqual({area: Math.sqrt(12*6*4*2), perimeter: 24})
      },
      mode: 'vm'
    },
    circle: {
      title: 'Circle properties',
      description: 'Calculate area and circumference of circle',
      task: 'Create a function called "circle" that receives the radius of a circle as a parameter, and returns an object with the area and circumference as properties',
      verify: output => {
        should(circle(8)).deepEqual({area: Math.PI * 8 * 8, circumference: 2 * 8 * Math.PI})
        should(circle(40)).deepEqual({area: Math.PI * 40 * 40, circumference: 2 * 40 * Math.PI})
      },
      mode: 'vm'
    }
  },
  date: {
    currenttime: {
      title: 'Current time',
      description: 'Display the current time',
      task: 'Log the current time in HH:MM:SS format',
      verify: output => {
        const date = new Date()
        should(output).be.exactly(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())
      },
      mode: 'vm'
    },
    currentdate: {
      title: 'Current date',
      description: 'Display the current date',
      task: 'Log the current date in YYYY:MM:DD format',
      verify: output => {
        const date = new Date()
        should(output).be.exactly(date.getYear() + ':' + date.getMonth() + ':' + date.getDate())
      },
      mode: 'vm'
    },
    dayofweek: {
      title: 'Day of the week',
      description: 'Display the day of the week',
      task: 'Log the current day of week to the console',
      verify: output => {
        const date = new Date()
        switch (date.getDay()) {
          case 0:
            let day = 'Sunday'
            break
          case 1:
            day = 'Monday'
            break
          case 2:
            day = 'Tuesday'
            break
          case 3:
            day = 'Wednesday'
            break
          case 4:
            day = 'Thursday'
            break
          case 5:
            day = 'Friday'
            break
          case 6:
            day = 'Saturday'
            break
        }
        should(output).be.exactly(day)
      },
      mode: 'vm'
    }
  }
}
