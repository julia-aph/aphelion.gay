import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    query,
    orderBy,
    serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDNNjhPoyqQkRUQivD7pb8KI7pvzrkdF70",
    authDomain: "silly-5647f.firebaseapp.com",
    projectId: "silly-5647f",
    storageBucket: "silly-5647f.appspot.com",
    messagingSenderId: "822000230299",
    appId: "1:822000230299:web:5e9fcffff02db015d0cb3e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const commentsRef = collection(db, 'comments');
const nameInput = document.getElementById('name-input');
const contentInput = document.getElementById('content-input');
const commentContainer = document.getElementById('comment-container');

function formatDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day + '.' + month + '.' + year + ' ' + date.toLocaleTimeString();
}

async function displayComments() {
    while(commentContainer.firstChild){
        commentContainer.removeChild(commentContainer.firstChild);
    }

    const querySnapshot = await getDocs(query(commentsRef, orderBy('timestamp')));
    querySnapshot.forEach((doc) => {
        const { author, content, timestamp } = doc.data();
        const formattedDate = formatDate(timestamp.toDate());
        const comment = document.createElement('div');
        comment.className = 'item';

        const propertyDiv = document.createElement('div');
        propertyDiv.className = 'property';
        const dateSpan = document.createElement("span");
        dateSpan.className = 'content__secondary-alt';
        dateSpan.innerText = formattedDate;
        const authorSpan = document.createElement("span");
        authorSpan.className = 'content__secondary';
        authorSpan.innerText = ' <' + author + '>:';
        propertyDiv.appendChild(dateSpan);
        propertyDiv.appendChild(authorSpan);
        
        const valueDiv = document.createElement('div');
        valueDiv.className = 'value';
        const messageSpan = document.createElement("span");
        messageSpan.innerText = content;
        valueDiv.appendChild(messageSpan);

        comment.appendChild(propertyDiv);
        comment.appendChild(valueDiv);

        commentContainer.prepend(comment);
    })
}

document.getElementById('post').addEventListener('click', () => {
    const author = nameInput.value.trim();
    const content = contentInput.value.trim();
    const timestamp = serverTimestamp();
    if (author !== "" && content !== "") {
        addDoc(commentsRef, {
            author: author,
            content: content,
            timestamp: timestamp,
        })
        .then(() => {
            contentInput.value = "";
            displayComments();
        })
        .catch((error) => {
            console.error('Error adding comment: ', error);
        });
    }
});

document.getElementById('refresh').addEventListener('click', () => {
    displayComments();
});

displayComments();