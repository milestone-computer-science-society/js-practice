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
      task: 'Create the funcion "sum" that returns the sum of the 3 parameters it receives',
      verify: output => {
        should(sum(5, 6, -8)).be.exactly(3)
        should(sum(-7, 452, 19.7)).be.exactly(464.7)
        should(sum(3, 436, 300)).be.exactly(739)
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
        should(max([2, 4, 18, -3])).be.exactly(2)
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
        let a = swap([5, 6, 7, 8], 1, 3)
        let b = [5, 8, 7, 6]
        should(a).deepEqual(b)
        let c = swap([5, 8, 6, 7], 2, 3)
        should(b).deepEqual(c)
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
    },
    temperature: {
      title: 'Temperature conversion',
      description: 'Convert between Farenheit and Celsius',
      task: 'Create a function called "convert" that receives a string as an input: all but the last character are part of a floating number and the last character specifies the scale. Return the temperature in the other scale using the same format',
      verify: output => {
        should(convert("30.0C")).equal("86F")
        should(convert("0C")).equal("32F")
        should(convert("12.4C")).equal("54.32F")
        should(convert("122F")).equal("50C")
        should(convert("-31F")).equal("-35C")
      },
      mode: 'vm'
    },
    vowel: {
      title: 'Find vowels',
      description: 'Find whether a letter is a vowel',
      task: 'Create a function called "vowel" that returns a boolean indicating whether a lowercase letter is a vowel or not',
      verify: output => {
        should(vowel("a")).be.true()
        should(wovel("e")).be.true()
        should(vowel("u")).be.true()
        should(vowel("o")).be.true()
        should(vowel("i")).be.true()
        should(vowel("b")).be.false()
        should(vowel("m")).be.false()
        should(vowel("x")).be.false()
      },
      mode: 'vm'
    },
    happynumber: {
      title: 'Happy number',
      description: 'Find whether a number is happy or not',
      task: 'Create a function called "happynumber" that returns a boolean indicating whether the number received as a parameter is happy or not',
      verify: output => {
        should(happy(1)).be.true()
        should(happy(19)).be.true()
        should(happy(44)).be.true()
        should(happy(5)).be.false()
        should(happy(12)).be.false()
        should(happy(255)).be.false()
      },
      mode: 'vm'
    },
    prime: {
      title: 'Prime',
      description: 'Find whether a number is prime or not',
      task: 'Create a function called "prime" that returns a boolean indicating whether the number received as a parameter is prime or not',
      verify: output => {
        should(prime(2)).be.true()
        should(prime(7)).be.true()
        should(prime(11)).be.true()
        should(prime(5119)).be.true()
        should(prime(1)).be.false()
        should(prime(12)).be.false()
        should(prime(81)).be.false()
        should(prime(5463)).be.false()
      },
      mode: 'vm'
    },
    perfectnumber: {
      title: 'Perfect number',
      description: 'Find whether a number is perfect or not',
      task: 'Create a function called "perfectnumber" that returns a boolean indicating whether the number received as a parameter is a perfect number or not',
      verify: output => {
        should(perfectnumber(6)).be.true()
        should(perfectnumber(28)).be.true()
        should(perfectnumber(496)).be.true()
        should(perfectnumber(8128)).be.true()
        should(perfectnumber(20)).be.false()
        should(perfectnumber(46)).be.false()
        should(perfectnumber(220)).be.false()
        should(perfectnumber(721)).be.false()
      },
      mode: 'vm'
    },
    polygonangle: {
      title: 'Angle of regular polygon',
      description: 'Interior angle of a regular polygon',
      task: 'Create a function called "angle" that returns the value of one angle of a regular polygon with the side count given as a parameter',
      verify: output => {
        should(angle(3)).be.exactly(60)
        should(angle(4)).be.exactly(90)
        should(angle(5)).be.exactly(108)
        should(angle(8)).be.exaclty(135)
        should(angle(18)).be.exactly(160)
      },
      mode: 'vm'
    },
    papersize: {
      title: 'Size of folded paper',
      description: 'Calculate size of paper folded in half multiple times',
      task: 'Create a function called "papersize" that receives the fold count as a parameter and returns the size of a unit paper folded in half that many times',
      verify: output => {
        should(papersize(0)).be.exactly(1)
        should(papersize(2)).be.exactly(0.25)
        should(papersize(4)).be.exactly(0.0625)
        should(papersize(6)).be.exactly(0.015625)
      },
      mode: 'vm'
    },
    extension: {
      title: 'File extension',
      description: 'Get the extension of a file',
      task: 'Create a function called "extension" that receives a filename as a parameter and returns the extension of the file',
      verify: output => {
        should(extension("image.jpeg")).be.exactly("jpeg")
        should(extension("music.mp3")).be.exactly("mp3")
        should(extension("web.html")).be.exactly("html")
        should(extension("demo.pptx")).be.exactly("pptx")
      },
      mode: 'vm'
    },
    sequence: {
      title: 'String sequence',
      description: 'String multiple times',
      task: 'Create a function called "repeat" that receives a string and a repeat count as an input, and returns the string appended to itself as many times as needed',
      verify: output => {
        should(repeat("a", 3)).be.exactly("aaa")
        should(repeat("Abcd", 4)).be.exactly("AbcdAbcdAbcdAbcd")
        should(repeat("x y ", 6)).be.exactly("x y x y x y x y x y x y ")
      },
      mode: 'vm'
    },
    lowercase: {
      title: 'Lowercase string',
      description: 'Lowercase version of a string',
      task: 'Create a function called "lowercase" which returns the received input string converted into lowercase',
      verify: output => {
        should(lowercase("HELLO")).be.exactly("hello")
        should(lowercase("so what")).be.exactly("so what")
        should(lowercase("Human")).be.exactly("human")
      },
      mode: 'vm'
    },
    ordinal: {
      title: 'Ordinal number',
      description: 'Human readable ordinal number',
      task: 'Create a function called "ordinal" which returns the ordinal number corresponding to the cardinal number given as a parameter',
      verify: output => {
        should(ordinal(1)).be.exactly('1st')
        should(ordinal(2)).be.exactly('2nd')
        should(ordinal(3)).be.exactly('3rd')
        should(ordinal(4)).be.exactly('4th')
        should(ordinal(10)).be.exactly('10th')
        should(ordinal(11)).be.exactly('11th')
        should(ordinal(12)).be.exactly('12th')
        should(ordinal(13)).be.exactly('13th')
        should(ordinal(21)).be.exactly('21st')
        should(ordinal(22)).be.exactly('22nd')
        should(ordinal(23)).be.exactly('23rd')
      },
      mode: 'vm'
    },
    leadingzero: {
      title: 'Leading zeros',
      description: 'Leading zeros for fixed length',
      task: 'Create a function called "leadingzero" that takes two parameters: a number and a wanted length. Return a string with leading zeros',
      verify: output => {
        should(leadingzero(10, 3)).be.exactly('010')
        should(leadingzero(0, 2)).be.exactly('00')
        should(leadingzero(5678.3, 8)).be.exactly('005678.3')
      },
      mode: 'vm'
    },
    htmlclean: {
      title: 'Clean HTML tags',
      description: 'Remove XML/HTML tags from text',
      task: 'Create a function called "clean" that returns the cleaned version (<> removed) of the string received as a parameter',
      verify: output => {
        should(clean('<html><head>')).be.exactly("htmlhead")
        should(clean('Lorem ipsum')).be.exactly("Lorem ipsum")
        should(clean('<button>Click me</button>')).be.exactly("buttonClick me/button")
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
