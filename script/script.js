import {questions} from '../questions.js';

document.addEventListener('DOMContentLoaded', function() {
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');

    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
    });
    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
    });

    const playTest = () => {
        let numberQuestion = 0;

        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item', 'd-flex', 'flex-column');
                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="${answer.url}" alt="${answer.title}">
                        <span>${answer.title}</span>
                    </label>
                `;
                formAnswers.appendChild(answerItem);
            })
        }

        const renderQuestions = (indexQuestions) => {
            formAnswers.innerHTML = "";
            questionTitle.textContent = `${questions[indexQuestions].question}`;
            renderAnswers(indexQuestions);
        }

        const updateButtons = () => {
            if(numberQuestion === 0) {
                prevButton.style.display = 'none';
            } else {
                prevButton.style.display = 'block';
            }

            if(numberQuestion === questions.length - 1) {
                nextButton.style.display = 'none';
            } else {
                nextButton.style.display = 'block';
            }
        }

        nextButton.onclick = () => {
            if(numberQuestion < questions.length - 1) {
                numberQuestion++;
                renderQuestions(numberQuestion);
                updateButtons();
            }
        };        

        prevButton.onclick = () => {
            if(numberQuestion > 0) {
                numberQuestion--;
                renderQuestions(numberQuestion);
                updateButtons();
            }
        }

        renderQuestions(numberQuestion);
        updateButtons();
    }
});