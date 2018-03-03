
const STATE ={
quiz:0,
correct:0
}
const questionList = ["What is the normal amount of tomatoes on a sandwich?",
"What is the normal amount of cucumbers on a sandwich?",
"How much lettuce goes on a sandwich?",
"How thick should a sub cut be?",
"What should you always do as a bread start?",
"How many slices of bacon go on a BLT?",
"Where does the Dijon go on a #14?",
"How many portions of beef comes on a number 10?",
"How many hot peppers go on a sandwich for a normal amount?",
"How many onions go on a sandwich for a normal amount?"]

const answers = [{"2-4":false, "3-6":false, "3-5":true, "5-6":false},
{"3-6":false,"2-4":false,"5-6":false,"3-5":true},
{"A handful":false,"Enough to replace the bread gut":true,"A cup":false,"However much you want":false},
{"No larger than the width of a tomato slice":true,"1/2 inch":false,"Whatever you feel safe cutting":false,"Half the width of the bread":false},
{"Leave the Mayo on the bread":true,"Dance":false,"Sing":false,"Tell jokes":false},
{"2":false,"3":false,"4":true,"5":false},
{"On the cheese":false,"Between the turkey and beef":true,"On the lettuce":false,"On the bread":true},
{"1":false, "2":true, "3":false,"4":false},
{"4-5":false, "5-6":false, "6-8":true,"2-4":false},
{"6-8":false, "4-5":false, "5-8":false, "8-10":true}
]


function changeState(){
	STATE.quiz++
	checkState()
}
function checkState(){
	let cs = STATE.quiz
	if(cs > 0 && cs<=questionList.length){
		hideIntro();
		showQuestion(getQuestionRef());
	}
	else if(cs === questionList.length+1){
		console.log("This else statement is running")
		showFinalPage();
	}
	else{
		showIntro();
		hideQuestion();
	}
}


function showAnswers(questionRef){
	let currentAnswers = Object.keys(answers[questionRef]);
	let currentValues = Object.values(answers[questionRef]);
	const thisAnswer = `<label><input type='radio' name='amount' value='${currentValues[0]}'>${currentAnswers[0]}</label><br>
					<label><input type='radio' name='amount' value='${currentValues[1]}'>${currentAnswers[1]}</label><br>
					<label><input type='radio' name='amount' value='${currentValues[2]}'>${currentAnswers[2]}</label><br>
					<label><input type='radio' name='amount' value='${currentValues[3]}'>${currentAnswers[3]}</label>
					<input type='submit' class='showCorrect'>`;
	$('.answersContainer').append(thisAnswer);
}
function changeSelectedAnswer(){
	$('input[type="radio"]').change(e =>{
		$('input[type="radio"]:checked').parent().addClass('myAnswer')
	})
}

function showQuestion(questionRef){
	$('.quizSection').show();
	const question = `
	<p>${questionList[questionRef]}</p>`;
	$('.questionContainer').append(question);
	showAnswers(questionRef);
	submitAnswer();
	showQuestionCounters();
	changeSelectedAnswer();
}

function submitAnswer(){
	$('.showCorrect').click(e =>{
			e.stopPropagation();
			if ($("form input[type='radio']").is(':checked')) {
				const answerValue = $("form input[type='radio']:checked").val()
				removeQuestion();
				removeAnswers();
				removeCounter();
				hideQuestion();
				if (answerValue==='true'){
					STATE.correct++;
					showCorrectPage();
				}
				else {
					showWrongPage();
					
				}
			}
			else {
				alert("Please choose an answer");
				return false;
			}
			return false
		});
}


function nextQuestion(){
	console.log('next question')
	$('.next').click(e =>{
		e.stopPropagation();
		hideWrongPage();
		hideCorrectPage();
		changeState();
		return false;
	});
}

function showFinalPage(){
	$('.finalPageContainer').append(`<h2>Congratulations!</h2>
	 <p>You finished with a score of ${STATE.correct} out of ${questionList.length} </p>
	 <input type='reset' class='restart' >`)
	$('.finalPage').show();
	restartQuiz();
}

function restartQuiz(){
	$('.restart').click(e => {
		STATE.quiz = 0;
		STATE.correct = 0;
		removeFinalPage();
		checkState();
	})
}
let thisVariable = true
function showQuestionCounters(){
	$('.footerContainer').append(`<p>Question ${STATE.quiz} of 10</p>`).append(`<p>Correct:${STATE.correct} Incorrect:${(STATE.quiz-1) - STATE.correct}</p>`)
}

function hideIntro(){
	$('.main').hide()
}
function showIntro(){
	$('.main').show()
}

function hideQuestion(){
	$('.quizSection').hide()
}


function getQuestionRef(){
return (STATE.quiz-1)
}

function showCorrectPage(){
	$('.correct').show()
}

function hideCorrectPage(){
	$('.correct').hide()
}

function showWrongPage(){
	$('.incorrect').show();
}

function hideWrongPage(){
	$('.incorrect').hide();
}

function removeCounter(){
	$('.footerContainer').contents().remove()
}

function removeQuestion(){
	$('.questionContainer').contents().remove();
	console.log('removeQuestion is running')
}

function removeAnswers(){
$('.answersContainer').contents().remove();
}
function removeFinalPage(){
	$('.finalPage').contents().remove()
}

function beginTest(){
	$('.start').click(e => {
		e.stopPropagation();
		changeState();
	});
}


function setStart(){
	checkState();
	beginTest();
	nextQuestion();
}

$(setStart);