// Business Logic for TriviaGame
function TriviaGame() {
  this.triviaQuestions = []
}

TriviaGame.prototype.addTriviaQuestion = function(triviaQuestion) {
  this.triviaQuestions.push(triviaQuestion);
}

TriviaGame.prototype.getTriviaQuestion = function(questionType) {
  var triviaQuestionSet = [];
  for (var i=0; i< this.triviaQuestions.length; i++) {
    if (this.triviaQuestions[i]) {
      if (this.triviaQuestions[i].questionType === questionType && this.triviaQuestions[i].questionUsed === 0) {
        triviaQuestionsSet.push(this.triviaQuestions[i]);
      }
    }
  }
  var questionNumber = Math.floor(Math.random() * triviaQuestionSet.length);
  return questionNumber;
}

// Business Logic for TriviaQuestions
function TriviaQuestion (questionID, imageURL, questionType, hint, answerOne, answerTwo, answerThree, answerFour, correctAnswer, questionUsed) {
  this.questionID = questionID,
  this.imageURL = imageURL,
  this.questionType = questionType,
  this.hint = hint,
  this.answerOne = answerOne,
  this.answerTwo = answerTwo,
  this.answerThree = answerThree,
  this.answerFour = answerFour,
  this.correctAnswer = correctAnswer,
  this.questionUsed = 0
}

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            var triviaQuestion = new TriviaQuestion(i, data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8]);
            triviaGame.addTriviaQuestion(triviaQuestion);
        }
    }
console.log(triviaQuestion);
console.log(triviaGame);
var questionNumber = triviaGame.getTriviaQuestion();
console.log(questionNumber);
}

var triviaGame = new TriviaGame();

$(document).ready(function() {

  $.ajax({
        type: "GET",
        url: "data/trivia_questions.csv",
        dataType: "text",
        success: function(data) {processData(data);}
  });
});
