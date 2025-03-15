import { state } from './constants.js';
import { questionBox, timeBox } from './elements.js';

let number1 = document.getElementById('number1') as HTMLSpanElement;
let number2 = document.getElementById('number2') as HTMLSpanElement;
let operation = document.getElementById('operation') as HTMLSpanElement;
let indicator = document.getElementById('indicator') as HTMLDivElement;
let answers = document.querySelectorAll('.btnAnswer') as NodeListOf<HTMLButtonElement>;

let operations = ['-', '+', '*'];
let correctAnswer: number;

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateValue() {
  state.firstGeneratedNumber = getRandomNumber(state.minNum, state.maxNum);
  state.secondGeneratedNumber = getRandomNumber(state.minNum, state.maxNum);
  state.generatedOperation = operations[Math.floor(Math.random() * operations.length)];
}

function renderScreen() {
  number1.textContent = `${state.firstGeneratedNumber}`;
  operation.textContent = `${state.generatedOperation}`;
  number2.textContent = `${state.secondGeneratedNumber}`;
}

function randomAnswer() {
  updateValue();
  renderScreen();

  let correctIdx = Math.floor(Math.random() * answers.length);
  let num1 = state.firstGeneratedNumber;
  let num2 = state.secondGeneratedNumber;
  let operator = state.generatedOperation;

  correctAnswer = eval(`${num1} ${operator} ${num2}`);

  let wrongAnswers = new Set<number>();
  answers[correctIdx].textContent = `${correctAnswer}`;

  while (wrongAnswers.size < answers.length - 1) {
    let offset = Math.floor(Math.random() * 20) - 10;
    let wrongAnswer = correctAnswer + offset;

    if (!wrongAnswers.has(wrongAnswer) && wrongAnswer !== correctAnswer) {
      wrongAnswers.add(wrongAnswer);
    }
  }

  let wrongArr = Array.from(wrongAnswers);
  let wrongIdx = 0;
  for (let i = 0; i < answers.length; i++) {
    if (i !== correctIdx) {
      answers[i].textContent = `${wrongArr[wrongIdx++]}`;
    }
  }
 }


function startTimer() {
  setInterval(() => {
    state.timeLimit--;
    if (state.timeLimit === 0) {
        randomAnswer()
        state.timeLimit = 10
        state.indicatorHistory.push('bg-black')
        renderIndicator()
    }
    if(state.indicatorHistory.length === 10) {
        alert(`result: ${state.correctAnswer}/10`)
        state.indicatorHistory.splice(0, state.indicatorHistory.length)
        state.timeLimit = 10
        renderIndicator()
        state.correctAnswer = 0
    }
    timeBox.innerText = state.timeLimit.toString()
    questionBox.innerText = `${state.indicatorHistory.length + 1}/ 10`
    
  }, 1000);
}


function renderIndicator() {
    let res = state.indicatorHistory.map((item, index)=>{
        return `
            <div class='w-10 h-10 ${item}'></div>
        `
    }).join('')
    indicator.innerHTML = res
}


answers.forEach(btn => {
  btn.addEventListener('click', function () {
    if (btn.textContent === `${correctAnswer}`) {
      state.indicatorHistory.push('bg-green-500');
      state.correctAnswer++
    } else {
        state.indicatorHistory.push('bg-red-500');
    }
    state.timeLimit = 10
    renderIndicator()
    setTimeout(() => {
      randomAnswer();
    }, 200);
  });
});


function init() {
  randomAnswer();
  renderScreen();
  startTimer();
}

window.addEventListener('load', init);
