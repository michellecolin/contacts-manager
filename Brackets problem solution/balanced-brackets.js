const inquirer = require('inquirer');

const questionText = [{
  type: 'input',
  name: 'string',
  message: 'Please, input the text you want to verify:',
}];

write('\nWelcome to the "balanced brackets" program! Here you can verify if your brackets are balanced :)\n');
askForUserText();

//----- functions ----
function askForUserText() {
  inquirer.prompt(questionText).then(answers => {
    write('\nVerifying...');
  
    const isBalanced = isBalancedParenthesis(answers['string']);
  
    if (isBalanced) {
      write('\nYour text brackets are balanced! Yay :)\n');
    } else {
      write('\nYour text brackets are NOT balanced! :(\n');
    }
  
    const questionVerifyAgain = [{
      type: 'input',
      name: 'verifyAgain',
      message: "Do you want to verify another text? (y/n)",
    }];

    const checkVerifyAgainAnswer = (answers, name) => {
      let answer = answers[name].toLowerCase(); 

      if (answer === 'y') {
        write('\n');
        askForUserText();
      } else if (answer === 'n') {
        write('\nThanks for using the "balanced brackets" program, see you soon!\n');
      } else {
        write('\n');
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

function write(str) {
  console.log(str);
}

function isBalancedParenthesis(str) {
  return !str.split('').reduce((uptoPrevChar, thisChar) => {
    if (thisChar === '(' || thisChar === '{' || thisChar === '[' ) {
      return ++uptoPrevChar;
    } else if (thisChar === ')' || thisChar === '}' || thisChar === ']') {
      return --uptoPrevChar;
    }

    return uptoPrevChar;
  }, 0);
};