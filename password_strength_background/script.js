const password = document.getElementById('password')
const background = document.getElementById('background')

password.addEventListener('input', (e) => {
  const input = e.target.value

  // we get the length of the input
  const length = input.length

  // we get the number of capital letters
  const capitalLetters = input.replace(/[^A-Z]/g, '').length

  // we get the number of numbers
  const numbers = input.replace(/\D/g, '').length
  
  // we get the number of special characters
  const specialCharacters= input.replace(/[^\W]/g, '').length

  // we keep the ormal lowercase letters in a variable
  const lowerLetters = length - capitalLetters - numbers - specialCharacters

  const blurValue = 20 - lowerLetters - 2*capitalLetters  - 2*numbers - 3*specialCharacters
  background.style.filter = `blur(${blurValue}px)`
})