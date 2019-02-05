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
        triviaQuestionSet.push(this.triviaQuestions[i]);
      }
    }
  }
  var questionNumber = Math.floor(Math.random() * triviaQuestionSet.length);
  return triviaQuestionSet[questionNumber];
}

TriviaGame.prototype.setQuestionUsed = function(questionId) {
  for (var i=0; i< this.triviaQuestions.length; i++) {
    if (this.triviaQuestions[i]) {
      if (this.triviaQuestions[i].questionId === questionId) {
        this.triviaQuestions[i].questionUsed = "1";
        break;
      }
    }
  }
}

// Business Logic for TriviaQuestions
function TriviaQuestion (questionId, imageURL, questionType, hint, answerOne, answerTwo, answerThree, answerFour, correctAnswer, questionUsed) {
  this.questionId = questionId,
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

// User Interface Logic
var triviaGame = new TriviaGame();
var currentQuestion;

function loadQuestions() {
  $.ajax({
        type: "GET",
        url: "data/trivia_questions.csv",
        dataType: "text",
        success: function(data) {processData(data);}
  });
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
}

function playGame(category) {
  currentQuestion = triviaGame.getTriviaQuestion(category);
  triviaGame.setQuestionUsed(currentQuestion.questionId);
console.log(currentQuestion);
}

function attachContactListeners() {

};

$(document).ready(function() {
  attachContactListeners();
  loadQuestions();

  $("#category-button button").click(function() {
    //get category the user selected
    var category = $("#category-selection input[name='category']:checked").closest('label').text();
    console.log(category);

    playGame(category);
  })
});
