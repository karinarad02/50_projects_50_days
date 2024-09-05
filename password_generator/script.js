const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

//object with keys for the functions
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

clipboardEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = resultEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    //we use textarea to copy the password to the clipboard because it has specific methods for that
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard!");
});

generateEl.addEventListener("click", () => {
    const length = +lengthEl.value;
    //the + sign converts the string to a number
    const hasLower = lowercaseEl.checked;
    //checked is a boolean
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    
    resultEl.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );
});

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = "";
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
        item => Object.values(item)[0]
    );
    //it will look like this: [{lower: true}, {upper: false}, {number: true}, {symbol: false}]
    //filter will return an array with only the true values

    if (typesCount === 0) {
        return "";
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            //it will give me the key: lower, upper, number, symbol
            generatedPassword += randomFunc[funcName]();
            //then we call the function for that key
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;

}

function getRandomLower() {
  //fromCharCode() method converts Unicode values into characters
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  //the alphabet has 26 letters
  //lowercase letters start at 97 and end at 122
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  //uppercase letters start at 65 and end at 90
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  //the numbers 0-9 are 10 numbers
  //numbers start at 48 and end at 57
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
  //symbols.length is 15
  //we can use index on a string
}
