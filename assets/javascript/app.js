$(document).ready(function () {
var options = [
	{
		question: "How many digits are there in the product 999 * 1001?", 
		choice: ["7", "6", "2", "8"],
		answer: 1,
		photo: "assets/images/six.gif"
	 },
	 {
	 	question: "At Poof School, 2 students disappear during each week of the school year. There were 43 students at Poof School at the beginning of the school year. After 17 full weeks, how many students have NOT yet disappeared from Poof School?", 
		choice: ["9", "34", "43", "17"],
		answer: 0,
		photo: "assets/images/nine.gif"
	 }, 
	 {
	 	question: "How many odd 3-digit numbers can be made using each of the digits 0, 1, 2, and 4 at most once?", 
		choice: ["8", "24", "4", "6" ],
		answer: 2,
		photo: "assets/images/four.gif"
	}, 
	{
		question: "Six notebooks cost $8 and nine pencils cost $4. What is the ratio of the cost of a notebook to the cost of a pencil?", 
		choice: ["24", "4", "3", "8" ],
		answer: 2,
		photo: "assets/images/three.gif"
	}, 
	{
		question: "A good number is a positive integer divisible by 4 but not 3. How many good numbers are there less than 55?", 
		choice: ["12", "15", "13", "9" ],
		answer: 3,
		photo: "assets/images/nine.gif"
	}, 
	{
		question: "How many positive even factors does 90 have?", 
		choice: ["10", "6", "9", "8" ],
		answer: 1,
		photo: "assets/images/six.gif"
	}, 
	{
		question: "Last year, Mayank's age was a perfect square. Next year, his age will be a perfect cube. How old is Mayank if he is less than 100 years old?", 
		choice: ["100", "26", "64", "25" ],
		answer: 1,
		photo: "assets/images/twentysix.gif"
	}, 
	{
		question: "Compute the sum 1 + 2 - 3 + 4 + 5 - 6 + 7 + 8 - 9 + 10 + 11 - 12?", 
		choice: ["18", "20", "1", "15" ],
		answer: 0,
		photo: "assets/images/eighteen.gif"
	}];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

//	if (pick.shown) {
//		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
//		displayQuestion();
//	} else {
//		console.log(pick.question);
		//iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})