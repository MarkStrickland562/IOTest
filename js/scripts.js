function TriviaGame() {
  this.triviaQuestions = [],
  this.questionUsed = 0
}

TriviaGame.prototype.addTriviaQuestions = function(triviaQuestions) {
  this.triviaQuestions.push(triviaQuestions);
}

function TriviaQuestions (imageURL, questionType, hint, answerOne, answerTwo, answerThree, answerFour, correctAnswer) {
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

console.log(allTextLines);

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            var triviaQuestions = new TriviaQuestions(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8]);
            triviaGame.addTriviaQuestions(triviaQuestions);
        }
    }
console.log(triviaQuestions);
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
