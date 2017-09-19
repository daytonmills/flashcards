const BasicCard = require('./BasicCard.js');
const ClozeCard = require('./ClozeCard.js');
const questions = require('./questions.js');
const inquirer = require('inquirer');
const chalk = require('chalk');
const log = console.log;

inquirer.prompt([{
    type: 'list',
    name: 'type',
    message: 'Which type of cards would you like?',
    choices: ["Basic Cards", "Cloze Cards"]
}]).then((answer) => {
    if (answer.type === 'Basic Cards') {
        basicQuiz();
    } else {
        clozeQuiz();
    }
});

function basicQuiz()
{
    var basicCards = [];
    var current = 0;
    var correct = 0;
    var wrong = 0;

    for(let question of questions)
    {
        if(question.type == "Basic"){
            let basicCard = new BasicCard(question.question, question.answer);
            basicCards.push(basicCard);
        }
    }

    cardPrompt();

    function cardPrompt()
    {
        inquirer.prompt([
        {
            type: 'input',
            message: basicCards[current].front,
            name: "answer"
        }]).then(function(question) {
            if(question.answer === basicCards[current].back) {
                log(
                    chalk.black.bold("=============================================\n") +
                    chalk.greenBright("Correct!!!\n") +
                    chalk.gray(basicCards[current].front + " : " + basicCards[current].back + "\n") +
                    chalk.black.bold("=============================================\n")
                );
                correct++;
                cardCheck();
            } else {
                log(
                    chalk.black.bold("=============================================\n") +
                    chalk.redBright("Wrong!!!\n") +
                    chalk.gray(basicCards[current].front + " : " + basicCards[current].back + "\n") +
                    chalk.black.bold("=============================================\n")
                );
                wrong++;
                cardCheck();
            }
        });
    }

    function cardCheck()
    {
        if (current < basicCards.length-1) {
            current++;
            cardPrompt();
        }
        else {
            log(
                chalk.white.bold("Game Over!!!\n") +
                chalk.black.bold("=============================================\n") +
                chalk.green("Correct: ") + chalk.greenBright(correct) +
                chalk.red("\nWrong: ") + chalk.redBright(wrong) +
                chalk.black.bold("\n=============================================\n")
            );

            inquirer.prompt([
                {
                    type: 'confirm',
                    message: 'Play Again?',
                    name: 'continue'
                }
            ]).then(function(answer) {
                if (answer.continue) {
                    current = 0;
                    correct = 0;
                    wrong = 0;
                    cardPrompt();
                } else {
                    log(chalk.red("Goodbye!"));
                }
            });
        }
    }
}

// Cloze Quiz
function clozeQuiz()
{
    var clozeCards = [];
    var current = 0;
    var correct = 0;
    var wrong = 0;

    for(let question of questions)
    {
        if(question.type == "Cloze"){
            let clozeCard = new ClozeCard(question.question, question.answer);
            clozeCards.push(clozeCard);
        }
    }

    cardPrompt();

    function cardPrompt()
    {
        inquirer.prompt([
        {
            type: 'input',
            message: clozeCards[current].partial,
            name: "answer"
        }]).then(function(question) {
            if(question.answer === clozeCards[current].cloze) {
                log(
                    chalk.black.bold("=============================================\n") +
                    chalk.greenBright("Correct!!!\n") +
                    chalk.gray(clozeCards[current].fullText + "\n") +
                    chalk.black.bold("=============================================\n")
                );
                correct++;
                cardCheck();
            } else {
                log(
                    chalk.black.bold("=============================================\n") +
                    chalk.redBright("Wrong!!!\n") +
                    chalk.gray(clozeCards[current].fullText + "\n") +
                    chalk.black.bold("=============================================\n")
                );
                wrong++;
                cardCheck();
            }
        });
    }

    function cardCheck()
    {
        if (current < clozeCards.length-1) {
            current++;
            cardPrompt();
        }
        else {
            log(
                chalk.white.bold("Game Over!!!\n") +
                chalk.black.bold("=============================================\n") +
                chalk.green("Correct: ") + chalk.greenBright(correct) +
                chalk.red("\nWrong: ") + chalk.redBright(wrong) +
                chalk.black.bold("\n=============================================\n")
            );

            inquirer.prompt([
                {
                    type: 'confirm',
                    message: 'Play Again?',
                    name: 'continue'
                }
            ]).then(function(answer) {
                if (answer.continue) {
                    current = 0;
                    correct = 0;
                    wrong = 0;
                    cardPrompt();
                } else {
                    log(chalk.red("Goodbye!"));
                }
            });
        }
    }
}