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