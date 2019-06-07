/// Include prompt module.
/*var prompt = require('prompt');

// This json object is used to configure what data will be retrieved from command line.
var prompt_attributes = [
    {
        // The fist input text is assigned to username variable.
        name: 'username',
        // The username must match below regular expression.
        validator: /^[a-zA-Z\s\-]+$/,
        // If username is not valid then prompt below message.
        warning: 'Username is not valid, it can only contains letters, spaces, or dashes'
    },
    {
        // The second input text is assigned to password variable.
        name: 'password',
        // Do not show password when user input.
        hidden: true
    },
    {
        // The third input text is assigned to email variable.
        name: 'email',
        // Display email address when user input.
        hidden: false
    }
];

// Start the prompt to read user input.
prompt.start();

// Prompt and get user input then display those data in console.
prompt.get(prompt_attributes, function (err, result) {
    if (err) {
        console.log(err);
        return 1;
    }else {
        console.log('Command-line received data:');

        // Get user input from result object.
        var username = result.username;
        var password = result.password;
        var email = result.email;
        var message = "  Username : " + username + " , Password : " + password + " , Email : " + email;

        // Display user input in console log.
        console.log(message);
    }
});*/


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