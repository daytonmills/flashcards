const BasicCard = require('./BasicCard.js');
const ClozeCard = require('./ClozeCard.js');
const questions = require('./questions.js');
const inquirer = require('inquirer');

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
                console.log("correct");
                cardCheck();
            } else {
                console.log("wrong");
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
    }
}

// Cloze Quiz
function clozeQuiz()
{
    var clozeCards = [];
    var current = 0;

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
                console.log("correct");
                cardCheck();
            } else {
                console.log("wrong");
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
    }
}