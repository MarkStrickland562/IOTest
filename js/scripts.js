// Business Logic for TriviaGame
function TriviaGame() {
  this.triviaQuestions = []
}

TriviaGame.prototype.addTriviaQuestion = function(triviaQuestion) {
  this.triviaQuestions.push(triviaQuestions);
}

TriviaGame.prototype.getTriviaQuestion = function(questionType) {
  var triviaQuestionsSet = [];
  for (var i=0; i< this.triviaQuestions.length, i++) {
    if (this.triviaQuestions[i]) {
      if (this.triviaQuestions[i].questionType === questionType && this.triviaQuestions[i].questionUsed === 0) {
        triviaQuestionsSet.push(this.triviaQuestions[i]);
      }
    }
  }
}

// Business Logic for TriviaQuestions
function TriviaQuestion (imageURL, questionType, hint, answerOne, answerTwo, answerThree, answerFour, correctAnswer, questionUsed) {
  this.imageURL = imageURL,
  this.questionType = questionType,
  this.hint = hint,
  this.answerOne = answerOne,
  this.answerTwo = answerTwo,
  this.answerThree = answerThree,
  this.answerFour = answerFour,
  this.correctAnswer = correctAnswer
}

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            var triviaQuestion = new TriviaQuestion(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8]);
            triviaGame.addTriviaQuestion(triviaQuestion);
        }
    }
console.log(triviaQuestion);
console.log(triviaGame);
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
