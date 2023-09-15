const socket = new WebSocket("wss://aphelion.gay:444");

const postContainer = document.getElementById('post-container');

const postTemplate = document.getElementById('post-template');
const postTemplateContent = postTemplate.content.getElementById('post-template-content');

const postForm = document.getElementById('post-form');
const postName = document.getElementById('post-name');
const postContent = document.getElementById('post-content');
postForm.addEventListener('submit', post);

socket.addEventListener('open', (event) => {
    console.log('connected to server!');
});

socket.addEventListener('message', (event) => {
    displayPost(event.data);
});

function post(event) {
    const author = postName.value.trim();
    const content = postContent.value.trim();
    if (author !== "" && content !== "") {
        socket.send('<' + author + '>: ' + content);
        postContent.value = '';
    }
    event.preventDefault();
}

function displayPost(content) {
    const postElement = document.importNode(postTemplateContent, true);
    postElement.innerText = content;
    postContainer.prepend(postElement);
}