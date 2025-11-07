import {questions} from '../questions.js';

document.addEventListener('DOMContentLoaded', function() {
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');

    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
    });
    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
    });
    const playTest = () => {
        const renderQuestions = () => {
            questionTitle.textContent = questions[0].question;
            formAnswers.innerHTML = questions[0].answers.map((answer) => `
                <div class="answers-item d-flex flex-column">
                    <input type="radio" id="answerItem1" name="answer" class="d-none">
                    <label for="answerItem1" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src=${answer.url} alt="burger">
                        <span>${answer.title}</span>
                    </label>
                </div>
            `).join('');
        }
        renderQuestions();
    }
});