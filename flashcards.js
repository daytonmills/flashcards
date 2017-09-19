const BasicCard = require('./BasicCard.js');
const ClozeCard = require('./ClozeCard.js');
const questions = require('./questions.js');
const inquirer = require('inquirer');

var count = 0;
var flashcards = [];

//Dynamically create a specific type of card for each question
for(let question of questions)
{
    switch(question.type){
        case "Basic":
            let basicCard = new BasicCard(question.question, question.answer);
            flashcards.push(basicCard);
            break;
        case "Cloze":
            let clozeCard = new ClozeCard(question.question, question.answer);
            flashcards.push(clozeCard);
            break;
    }
}

for(let card of flashcards)
{
    console.log(card);
}