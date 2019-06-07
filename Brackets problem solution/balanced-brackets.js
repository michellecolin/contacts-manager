const inquirer = require('inquirer');

const questionText = [{
  type: 'input',
  name: 'string',
  message: "Please, input the text you want to verify:",
}];

console.log('\nWelcome to the "balanced brackets" program! Here you can verify if your brackets are balanced :)\n');
askForUserText();


//----- functions ----
function askForUserText() {
  inquirer.prompt(questionText).then(answers => {
    console.log('\nVerifying...');
  
    const isBalanced = isBalancedParenthesis(answers['string']);
  
    if (isBalanced) {
      console.log('\nYour text brackets are balanced! Yay :)\n');
    } else {
      console.log('\nYour text brackets are NOT balanced! :(\n');
    }
  
    const questionVeirfyAgain = [{
      type: 'input',
      name: 'verifyAgain',
      message: "Do you want to verify another text? (y/n)",
    }];
  
    inquirer.prompt(questionVeirfyAgain).then(answers => {
      let answer = answers['verifyAgain'].toLowerCase(); 

      if (answer === 'y') {
        console.log('\n');
        askForUserText();
      } else if (answer === 'n') {
        console.log('\nThanks for using the "balanced brackets" program, see you soon!\n');
      } else {
        questionNotValid = [{
          type: 'input',
          name: 'notValid',
          message: 'This answer was not valid, please type "y" for yes and "n" for no.\n',
        }];
      }
    });
  
  });
}

function isBalancedParenthesis(str) {
  return !str.split('').reduce((uptoPrevChar, thisChar) => {
      if(thisChar === '(' || thisChar === '{' || thisChar === '[' ) {
          return ++uptoPrevChar;
      } else if (thisChar === ')' || thisChar === '}' || thisChar === ']') {
          return --uptoPrevChar;
      }

      return uptoPrevChar
  }, 0);
};