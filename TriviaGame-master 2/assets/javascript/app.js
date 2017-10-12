/*
  delcare and initialize game object
  game object is an array of objects, each with 2 key/value pairs: a question and an array of answers
*/

var game = {
  questionsArr: [{
    question: "What vehicle was driven by Caractacus Potts?",
    Answers: ["Chitty Chitty Bang Bang","Mystery Machine","Anglia","Ecto-1"],
  }, {
    question: "Which rock start plays the role of vampire in the 1983 movie 'The Hunger'?",
    Answers: ["David Bowie","Billy Idol","Gene Simmons","Ozzie Osbourne"],
  },{
    question: "What 1990 hit song by Jane's Addiction begins with the sound of dogs barking?",
    Answers: ["Been Caught Stealing","Jane Says","Ocean Size","Just Because"],
  },{
    question: "In the TV show 'The Simpsons' what is the name of the Springfield's music store?",
    Answers: ["King Toot's","Moe's","Kwik-E-Mart","Lard Lad Donuts"],
  },{
    question: "What is singer Meat Loafs real name?",
    Answers: ["Michael Lee Aday","Prince Rogers Nelson","Georgios Kyriacos Panayiotou","Richard Bachman"],
  },{
    question: "In the 1988 move, 'Die Hard', what does John McClane leave in the limo?",
    Answers: ["A teddy bear","His lighter","A TV Dinner","A walkie talkie"],
  },{
    question: "What is the name of the prince in Disney's 'Sleeping Beauty'?",
    Answers: ["Phillip","Florian","Henry","Eric"],
  },{
    question: "Whose adventures on TV take place on the fictional island of Sodor?",
    Answers: ["Thomas the Tank Engine","Goku","Finn & Jake","Sayid Jarrah"],
  },{
    question: "For what does the 'T' stand in the name of Star Trek's captain James T. Kirk?",
    Answers: ["Tiberius","Thomas","Tranquility","Terrance"],
  },{
    question: "In what movie is $200,000 of Confederate gold buried in the grave marked 'Unknown' next to Arch Stanton?",
    Answers: ["The Good, The Bad, & The Ugly","True Grit","No Country for Old Men","A Fistful of Dollars"],
  },{
    question: "What Madonna video won the 1998 MTV Video of the Year Award?",
    Answers: ["Ray of Light","Like a Virgin","Hung Up","Nothing Really Matters"],
  },{
    question: "What actor died at the age of 24 while driving his Porsche Spyder?",
    Answers: ["James Dean","Paul Walker","Bruce Lee","Brandon Lee"],
  },{
    question: "What Broadway Musical is based off the opera 'La Bohen'?",
    Answers: ["Rent","Wicked","My Fair Lady","Les Miserables"],
  },{
    question: "What movie featured the fictional band 'The Soggy Bottom Boys'?",
    Answers: ["O Brother, Where Art Thou","The Great Outdoors","Get On Up","That Thing You Do!"],
  },{
    question: "What year did 'The Tonight Show' first air?",
    Answers: ["1954","1955","1956","1957"],
  },{
    question: "In which US state was rapper 'Eminem' born?",
    Answers: ["Missouri","Michigan","Indiana","Ohio"],
  },{
    question: "What was Walt Disney's middle name?",
    Answers: ["Elias","Tobias","Ray","Thomas"],
  },{
    question: "For what movie did Dan Aykroyd receive an Oscar nomination?",
    Answers: ["Driving Miss Daisy","Ghostbusters","Blues Brothers","Spies Like Us"],
  },{
    question: "Singer Stefani Joanne Angelina Germanotta is better known by what stage name?",
    Answers: ["Lady Gaga","Gwen Stefani","Pink","Eve"],
  },{
    question: "What movie did the villain Norman Bates appear in?",
    Answers: ["Pyscho","Saw","One Flew Over the Cuckoos Nest","Birds"],
  },
],

  maxQuestions: 10,
  answer1Clicked: false,
  answer2Clicked: false,
  answer3Clicked: false,
  answer4Clicked: false,
  questionsAskedArr: [],
  startingScore: 1000,
  accumScore: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  progressInterval: "",
  scoreInterval: "",

/*
  randomNoRepeats selects a random object from the array of objects within my game object.
  In order to ensure I did not repeat any questions, spliced the random item chosen and pushed that into a new array.  Ideally I will display a final answer sheet after the 10
  questions are up - this will display each question that was randomly selected, the correct answer, and the answer chosen.  This is a work in progress
*/
  randomNoRepeats: function(){
    var index = Math.floor(Math.random() * this.questionsArr.length);
    var item = this.questionsArr[index];
    var removedItem = this.questionsArr.splice(index, 1);
    this.questionsAskedArr.push(removedItem);

    if(this.questionsAskedArr.length > this.maxQuestions){
      $(".btn-default").prop("disabled", true);
      $("#go").prop("disabled", true);
      clearInterval(this.scoreInterval);
      clearInterval(this.progressInterval);
      alert("Game Over!");
      alert("Refresh to Start a New Game")
    }
    return removedItem;
  },

/*
  wrongAnswers function is a quick function that looks at the values in each .Answer array and displays values in index 1-3 to the document
  Ideally this would be much more robust, selecting from the correct array of answers and randomly displaying to one of the 4 answer buttons
  Since I wasn't able to get that to work, I simply arranged the answers in the array to ensure that the correct answer is always at the 0 index,
  and then display that index to the same button choice :-/  So.....just choose the first answer each time.  I'll keep working on this
*/
  wrongAnswers: function(arg){

    $("#answer2").html(arg[0].Answers[1]);
    $("#answer3").html(arg[0].Answers[2]);
    $("#answer4").html(arg[0].Answers[3]);
  },

/*
  displayQuestion - setter to return the Question that is returned from the randomNoRepeats function
*/
  displayQuestion: function(arg1){
    var ques = arg1[0].question;
    return ques;
  },

  /*
    displayAnswer - setter to return the correct answer associated with the returned object of the randomNoRepeats function
  */
  displayAnswer: function(arg2){
    var answ = arg2[0].Answers[0];
    return answ;
  },

/*
  startProgress function is called on the go button click and sets an interval for the progress bar; interval timer should match the scoring Interval to ensure progress bar
  reaches 0% width when score reaches zero
*/
  startProgress: function(){
    var i = 100;
    var that = this;
    this.progressInterval = setInterval(function(){
      i--;
      if(i > 0)
      {
        $(".progress-bar").css("width", i+"%");
      }else{
        clearInterval(that.progressInterval);
      }
    }, 100);

    $(".btn-default").on("click", function(){
      clearInterval(that.progressInterval);
    })
  },

/*
  startScore function is called on the go button click; sets Interval for decreasing score.  If score reaches zeroe before an answer is clicked, incorrectAnswer is incremented
  and zero is added to the total score
*/
  startScore: function(){
    var that = this;
    this.scoreInterval = setInterval(function() {
      $("#score").html(that.startingScore);
      that.startingScore--;
      $("#score").html(that.startingScore);
      if(that.startingScore === 0)
      {
        clearInterval(this.scoreInterval);
        alert("Time's Up!");
        that.incorrectAnswers++;
        $(".btn-default").prop("disabled", true);
        $("#go").prop("disabled", false);
      }

    }, 10);

    $("#questions").html(that.incorrectAnswers + that.correctAnswers);
  },

  /*
    firstAnswer function is called on click of the first answer option; increments correctAnswer, disables all other answer buttons and enables the start button
  */
  firstAnswer: function(){
    var that = this;
    $("#answer1").on("click", function(){
      clearInterval(that.scoreInterval);
      that.accumScore += that.startingScore;
      that.correctAnswers++;
      console.log(that.accumScore);
      alert("That's right!");
      $("#go").prop("disabled", false);
      $(".btn-default").prop("disabled", true);
      that.startingScore = 1000;
      game.displayResults();
    });
  },

  /*
    secondAnswer function is called on click of the second answer option; increments incorrectAnswer, disables all other answer buttons and enables the start button
  */
  secondAnswer: function(){
    var that = this;
    $("#answer2").on("click", function(){
      clearInterval(that.scoreInterval);
      that.incorrectAnswers++;
      that.accumScore += 0;
      $("#score").html("0");
      alert("Incorrect!");
      $("#go").prop("disabled", false);
      $(".btn-default").prop("disabled", true);
      that.startingScore = 1000;
      game.displayResults();
    });
  },

/*
  thirdAnswer function is called on click of the third answer option; increments incorrectAnswer, disables all other answer buttons and enables the start button
*/
  thirdAnswer: function(){
    var that = this;
    $("#answer3").on("click", function(){
      clearInterval(that.scoreInterval);
      that.incorrectAnswers++;
      that.accumScore += 0;
      $("#score").html("0");
      alert("Incorrect!");
      $("#go").prop("disabled", false);
      $(".btn-default").prop("disabled", true);
      that.startingScore = 1000;
      game.displayResults();
    });
  },

  /*
    fourthAnswer function is called on click of the fourth answer option; increments incorrectAnswer, disables all other answer buttons and enables the start button
  */
  fourthAnswer: function(){
    var that = this;
    $("#answer4").on("click", function(){
      clearInterval(that.scoreInterval);
      that.incorrectAnswers++;
      that.accumScore += 0;
      $("#score").html("0");
      alert("Incorrect!");
      $("#go").prop("disabled", false);
      $(".btn-default").prop("disabled", true);
      that.startingScore = 1000;
      game.displayResults();
    });
  },

  /*
    displayResults function displays accumulators to the document
  */
displayResults: function(){
  $("#questions").html(this.incorrectAnswers + this.correctAnswers);
  $("#total-score").html(this.accumScore);
  $("#correct").html(this.correctAnswers);
  $("#incorrect").html(this.incorrectAnswers);
}

}; //end game object

$("document").ready(function(){

  $("#go").on("click", function(){

      game.startScore();
      var progress = game.startProgress();
      var random = game.randomNoRepeats();
      var wrong = game.wrongAnswers(random);

      $("#question").html(game.displayQuestion(random));
      $("#answer1").html(game.displayAnswer(random));
      $("#go").prop("disabled", true);
      $(".btn-default").prop("disabled", false);




  }); //end start click event

  $("#answer1").on("click", game.firstAnswer());
  $("#answer2").on("click", game.secondAnswer());
  $("#answer3").on("click", game.thirdAnswer());
  $("#answer4").on("click", game.fourthAnswer());



}); //end document ready
