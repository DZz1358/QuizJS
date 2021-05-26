/* All answer options */

const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
/* All our option */
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');
const numberOfQuestion = document.getElementById('number-of-question');
const numberOfAllQuestion = document.getElementById('number-of-all-questions');

let indexOfQuestion; // индекс текущего вопроса
let indexOfPage = 0; // индекс страницы

const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

let score = 0; // Итоговый результат

const correctAnswer = document.getElementById('correct-answer');
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line max-len
const numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2');
const btnTryAgain = document.getElementById('btn-try-again');

const questions = [
  {
    question: 'Как в JavaScript вычислить % от числа??',
    options: [
      'Так в JavaScript нельзя делать',
      'Оператор %',
      'Умножить на количество процентов и разделить на 100',
      'Вызвать метод findPercent()',
    ],
    rightAnswer: 2,
  },
  {
    question: 'Результат выражения "13" + 7',
    options: [
      '20',
      '137',
      'undefined',
      'error',
    ],
    rightAnswer: 1,
  },
  {
    question: 'На JavaScript нельзя писать:  ',
    options: [
      'Игры',
      'Скрипты для сайтов',
      'Десктопные приложения',
      'Плохо',
    ],
    rightAnswer: 3,
  },
  {
    question: 'Чем метод отличается от функции?',
    options: [
      'Ничем',
      'Что такое функция?',
      'Что такое метод?',
      'Метод - это в обьекте',
    ],
    rightAnswer: 3,
  },

  

];

numberOfAllQuestion.innerHTML = questions.length; // выводим количество всех вопросов

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question; // сам вопрос

  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  // eslint-disable-next-line max-len
  // установка номера текущей страницы
  numberOfQuestion.innerHTML = indexOfPage + 1;
  indexOfPage++;
};

let completedAnswers = [];

const randomQuestion = () => {
  // выбор рандомного числа
  const randomNumber = Math.floor(Math.random() * questions.length);
  const hitDuplicate = false;

  if (indexOfPage == questions.length) {
    quizOver();
  } else {
    if (completedAnswers.length > 0) {
      completedAnswers.forEach(item => {
        if (item == randomNumber) {
          hitDuplicate = true;
        }
      });
      if (hitDuplicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    };
    if (completedAnswers == 0) {
      indexOfQuestion = randomNumber;
      load();
    }
  };
  completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
  if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
    el.target.classList.add('correct');
    updateAnswerTracker('correct');
    score++;
  }else {
    el.target.classList.add('wrong');
    updateAnswerTracker('wrong');
  }
  disabledOptions();
}

const disabledOptions = () => {
  optionElements.forEach(item => {
    item.classList.add('disabled');
    if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
      item.classList.add('correct');
    }
  })
};

const enableOptions = () => {
  optionElements.forEach(item => {
    item.classList.remove('disabled', 'correct' , 'wrong');
  })
};

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement('div');
    answersTracker.appendChild(div);
  })
};

const updateAnswerTracker = status => {
  answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
  if(!optionElements[0].classList.contains('disabled')){
    alert('Выберите один из вариантов ответа!');
  } else {
    randomQuestion();
    enableOptions();
  }
};



btnNext.addEventListener('click' , validate);

for(option of optionElements) {
  option.addEventListener('click', e => checkAnswer(e));
}


const quizOver = () => {
  document.querySelector('.quiz-over-modal').classList.add('active'); 
  correctAnswer.innerHTML = score;
  numberOfAllQuestion2.innerHTML = questions.length;
};

const tryAgain = () => {
  window.location.reload();
};

btnTryAgain.addEventListener('click' , tryAgain);

window.addEventListener('load', () => {
  randomQuestion();
  answerTracker();
});

