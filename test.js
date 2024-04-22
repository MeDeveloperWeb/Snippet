var qs = require('qs');
var data = qs.stringify({
  code: 'def add_numbers(num1, num2):\n    return num1 + num2\n\n# Input\nnum1 = float(input("Enter first number: "))\nnum2 = float(input("Enter second number: "))\n\n# Adding the numbers\nresult = add_numbers(num1, num2)\n\n# Output\nprint("The sum of", num1, "and", num2, "is:", result)',
  language: 'py',
  input: '7\n8\n9'
});

var requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: data,
  redirect: 'follow'
};

fetch('https://codex-api-vnk9.onrender.com', requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(JSON.stringify(result)))
  .catch((error) => console.log('error', error));
