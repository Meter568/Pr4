import {questions} from '../questions.js';

document.addEventListener('DOMContentLoaded', function() {
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');
    const sendButton = document.querySelector('#send');

    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
    });
    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
    });

    const playTest = () => {
        const finalAnswers = [];
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

        const renderFinishScreen = () => {
            questionTitle.textContent = "Дякуємо за пройдений тест!";
            formAnswers.innerHTML = `
                <div>
                    <h5 class="mb-3">Залиште свій номер телефону</h5>
                    <div class="form-group">
                        <label for="numberPhone">Ваш номер:</label>
                        <input 
                            type="tel" 
                            class="form-control" 
                            id="numberPhone" 
                            placeholder="+380..."
                        />
                    </div>
                </div>
            `;
        };

        const renderThanksScreen = () => {
            questionTitle.textContent = "Дякую за пройдений тест!";
            formAnswers.innerHTML = `
                <div class="text-center mt-4">
                    <h3 class="mt-3">Ваш номер успішно надіслано!</h3>
                </div>
            `;
            setTimeout(() => {
                modalBlock.classList.remove('d-block');
            }, 2000)
        };

        const updateButtons = () => {
            switch (numberQuestion) {
                case 0:
                    prevButton.style.display = 'none';
                    nextButton.style.display = 'block';
                    sendButton.classList.remove('d-block');
                    sendButton.classList.add('d-none');
                    break;

                case questions.length:
                    nextButton.style.display = 'none';
                    prevButton.style.display = 'none';
                    sendButton.classList.remove('d-none');
                    sendButton.classList.add('d-block');
                    break;

                default:
                    prevButton.style.display = 'block';
                    nextButton.style.display = 'block';
                    sendButton.classList.remove('d-block');
                    sendButton.classList.add('d-none');
                    break;
            }
        };

        const checkAnswers = () => {
            const obj = {};
            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === "numberPhone");
            inputs.forEach((input, index) => {
                if(numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                    obj[`${index} ${questions[numberQuestion].question}`] = input.value;
                }

                if(numberQuestion === questions.length) {
                    obj["Номер телефону"] = input.value;
                }
            });
            finalAnswers.push(obj);
        }
        nextButton.onclick = () => {
            checkAnswers();
            numberQuestion++;
            if (numberQuestion < questions.length) {
                renderQuestions(numberQuestion);
            } else {
                renderFinishScreen();
            }
            updateButtons();
        };
        
        prevButton.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);
            updateButtons();
        }
        
        sendButton.onclick = () => {
            const number = document.getElementById("numberPhone")?.value;
            if (!number || number.trim() === "") {
                alert("Будь ласка, введіть номер телефону.");
                return;
            }
            checkAnswers();
            console.log(finalAnswers);
            renderThanksScreen();
            sendButton.classList.remove('d-block');
            sendButton.classList.add('d-none');
        };
        renderQuestions(numberQuestion);
        updateButtons();
    }
});