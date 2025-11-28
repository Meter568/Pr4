// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBA00G69ELYRV-dMKq9tAmIpjPG8M2-TxA",
    authDomain: "testburger-6d0b1.firebaseapp.com",
    databaseURL: "https://testburger-6d0b1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "testburger-6d0b1",
    storageBucket: "testburger-6d0b1.firebasestorage.app",
    messagingSenderId: "844134916090",
    appId: "1:844134916090:web:6f85d098a8339a649c4e43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export async function loadQuestions(){
    const questionsRef = await get(ref(db, "questions"));
    console.log(questionsRef);
    return questionsRef.val();
}

export async function uploadAnswers(answers){
    set(ref(db, "answers"), answers).then(() => console.log('Data saved successfully!'))
}