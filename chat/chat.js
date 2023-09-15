const messageTextarea = document.getElementById("message-textarea");
messageTextarea.addEventListener("keydown", submitOnEnter);

function submitOnEnter(event) {
    if (event.which === 13 && !event.repeat) {
        messageTextarea.innerText = "";
        event.preventDefault();
    }
}