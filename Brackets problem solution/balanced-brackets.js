const inquirer = require('inquirer');

//start
const questionText = [{
  type: 'input',
  name: 'string',
  message: 'Please, input the text you want to verify:',
}];

print('\nWelcome to the "balanced brackets" program! Here you can verify if your brackets are balanced :)\n');
askForUserText();

//----- functions ----
function askForUserText() {
  inquirer.prompt(questionText).then(answers => {
    print('\nVerifying...');
  
    const isBalanced = isBalancedParenthesis(answers['string']);
  
    if (isBalanced) {
      print('\x1b[32m\nYour text brackets are balanced! Yay :)\n');
    } else {
      print('\x1b[31m\nYour text brackets are NOT balanced! :(\n');
    }
  
    const questionVerifyAgain = [{
      type: 'input',
      name: 'verifyAgain',
      message: "Do you want to verify another text? (y/n)",
    }];

    const checkVerifyAgainAnswer = (answers, name) => {
      let answer = answers[name].toLowerCase(); 

      if (answer === 'y') {
        print('\n');
        askForUserText();
      } else if (answer === 'n') {
        print('\nThanks for using the "balanced brackets" program, see you soon!\n');
      } else {
        print('\n');
        questionNotValid = [{
          type: 'input',
          name: 'notValid',
          message: 'This answer was not valid, please type "y" for yes and "n" for no.\n',
        }];

        inquirer.prompt(questionNotValid).then(answers => {
          checkVerifyAgainAnswer(answers, 'notValid');
        });
      }
    };

    inquirer.prompt(questionVerifyAgain).then(answers => {
      checkVerifyAgainAnswer(answers, 'verifyAgain');
    });

  });
}

//print on console
function print(str) {
  console.log(str);
}

//check balanced parenthesis
function isBalancedParenthesis(str) {
  let stack = [];

  const map = { //matching brackets
    '(': ')',
    '[': ']',
    '{': '}'
  };

  //iterate string chars
  for (i = 0; i < str.length; i++) {
    if (str[i] === '(' || str[i] === '{' || str[i] === '[' ) {
      stack.push(str[i]);
    } else {
      let initialChar = stack.pop();

      if (str[i] !== map[initialChar]) { //chars don't match
        stack.push(initialChar); //return it to stack
        break; //stop for loop => the brackets are not balanced
      }
    }
  }

  if (stack.length !== 0) { return false; } //brackets not balanced
  return true;
}