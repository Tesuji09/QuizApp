const STATE = {
	quiz: 0,
	correct: 0,
};
const QUESTIONLIST = [
	{'What is the normal amount of tomatoes on a sandwich?':
	  { '2-4': false, '3-6': false, '3-5': true, '5-6': false }
	  
	},
	{'What is the normal amount of cucumbers on a sandwich?':
	  { '3-6': false, '2-4': false, '5-6': false, '3-5': true }
	  
	},
	{'How much lettuce goes on a sandwich?':
	  {'A handful': false,
		'Enough to replace the bread gut': true,
		'A cup': false,
		'However much you want': false,}
	},
	{'How thick should a sub cut be?':
	  {'No larger than the width of a tomato slice': true,
		'1/2 inch': false,
		'Whatever you feel safe cutting': false,
		'Half the width of the bread': false,}
	},
	{'What should you always do as a bread start?':
	  {'Leave the Mayo on the bread': true,
		'Dance': false,
		'Sing': false,
		'Tell jokes': false,}
	},
	{'How many slices of bacon go on a BLT?':
	  {'2': false, '3': false, '4': true, '5': false}
	},
	{'Where does the Dijon go on a #14?':
	  {'On the cheese': false,
		'Between the turkey and beef': true,
		'On the lettuce': false,
		'On the bread': false,}
	},
	{'How many portions of beef comes on a number 10?':
	  { '1': false, '2': true, '3': false, '4': false }
	},
	{'How many hot peppers go on a sandwich for a normal amount?':
	  { '4-5': false, '5-6': false, '6-8': true, '2-4': false }
	},
	{'How many onions go on a sandwich for a normal amount?':
	  { '6-8': false, '4-5': false, '5-8': false, '8-10': true }
	},
];

function changeState() {
	STATE.quiz++;
	checkState();
}
function checkState() {
	let cs = STATE.quiz;
	if (cs > 0 && cs <= QUESTIONLIST.length) {
		hideIntro();
		showQuestionPage(getQuestionRef(), getCurrentQuestion(getQuestionRef()));
	} else if (cs === QUESTIONLIST.length + 1) {
		showFinalPage();
	} else {
		showIntro();
		hideQuestion();
	}
}

function showAnswers(questionRef, currentQuestion) {
  let currentQuestionPlusAnswers = QUESTIONLIST[questionRef];
	let currentAnswers = Object.keys(currentQuestionPlusAnswers[currentQuestion]);
	let currentValues = Object.values(currentQuestionPlusAnswers[currentQuestion]);
	const thisAnswer = `<label><input type='radio' name='amount' value='${currentValues[0]}'>${currentAnswers[0]}</label><br>
					<label><input type='radio' name='amount' value='${currentValues[1]}'>${currentAnswers[1]}</label><br>
					<label><input type='radio' name='amount' value='${currentValues[2]}'>${currentAnswers[2]}</label><br>
					<label><input type='radio' name='amount' value='${currentValues[3]}'>${currentAnswers[3]}</label>
					<input type='submit' class='showCorrect' value='submit'>`;
	$('.answersContainer').append(thisAnswer);
}
function changeSelectedAnswer() {
	$('input[type="radio"]').change(e => {
		$('.answersContainer').find('.myAnswer').removeClass('myAnswer');
		$('input[type="radio"]:checked').parent().addClass('myAnswer');
	});
}

function showQuestionPage(questionRef, currentQuestion) {
	$('.quizSection').show();
	const question = `<legend>${currentQuestion}</legend>`;
	$('.questionContainer').append(question);
	showAnswers(questionRef, currentQuestion);
	submitAnswer();
	showQuestionCounters();
	changeSelectedAnswer();
}

function submitAnswer() {
	$('.showCorrect').click(e => {
		e.stopPropagation();
		if ($('form input[type="radio"]').is(':checked')) {
			const answerValue = $('form input[type="radio"]:checked').val();
			removeQuestion();
			removeAnswers();
			removeCounter();
			hideQuestion();
			if (answerValue === 'true') {
				STATE.correct++;
				showCorrectPage();
			} else {
				showWrongPage();
				addCorrectAnswer();
			}
		}	else {
		  return false;
		}
		return false;
		
	});
}

function nextQuestion() {
	$('.next').click(e => {
		e.stopPropagation();
		hideWrongPage();
		hideCorrectPage();
		removeCorrectAnswer();
		changeState();
		return false;
	});
}

function showFinalPage() {
	$('.finalPageContainer').append(`<h2>Congratulations!</h2>
	 <p>You finished with a score of ${STATE.correct} out of ${QUESTIONLIST.length} </p>
	 <input type='reset' class='restart' >`);
	$('.finalPage').show();
	restartQuiz();
}

function restartQuiz() {
	$('.restart').click(e => {
		STATE.quiz = 0;
		STATE.correct = 0;
		removeFinalPage();
		checkState();
	});
}
function showQuestionCounters() {
	$('.footerContainer')
		.append(`<p>Question ${STATE.quiz} of 10</p>`)
		.append(
			`<p>Correct:${STATE.correct} Incorrect:${STATE.quiz -
				1 -
				STATE.correct}</p>`
		);
}

function hideIntro() {
	$('.introContainer').hide();
}
function showIntro() {
	$('.introContainer').show();
}

function hideQuestion() {
	$('.quizSection').hide();
}

function getQuestionRef() {
	return STATE.quiz - 1;
}

function getCurrentQuestion(questionRef){
  let currentKey = Object.keys(QUESTIONLIST[questionRef]);
  let currentQuestion = `${currentKey[0]}`;
  return currentQuestion;
}

function showCorrectPage() {
	$('.correct').show();
}

function addCorrectAnswer() {
  $('.correctAnswerContainer').append(`<p>The correct answer was '${getCorrectAnswer(getQuestionRef(), getCurrentQuestion(getQuestionRef()))}'</p>`);
}

function removeCorrectAnswer(){
  $('.correctAnswerContainer').contents().remove();
}

function getCorrectAnswer(questionRef, currentQuestion) {
  let currentAnswers = QUESTIONLIST[questionRef][currentQuestion]
  for (let correct in currentAnswers){
    if(currentAnswers[correct] === true){
      return(correct)
    }
  }
}

function hideCorrectPage() {
	$('.correct').hide();
}

function showWrongPage() {
	$('.incorrect').show();
}

function hideWrongPage() {
	$('.incorrect').hide();
}

function removeCounter() {
	$('.footerContainer').contents().remove();
}

function removeQuestion() {
	$('.questionContainer').contents().remove();
}

function removeAnswers() {
	$('.answersContainer').contents().remove();
}
function removeFinalPage() {
	$('.finalPage').contents().remove();
}

function beginTest() {
	$('.start').click(e => {
		e.stopPropagation();
		changeState();
	});
}

function setStart() {
	checkState();
	beginTest();
	nextQuestion();
}

$(setStart);
