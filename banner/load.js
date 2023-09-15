const placeholder = document.getElementById('banner');
fetch('/banner/banner.html')
.then((response) => {
    if (!response.ok) {
        throw new Error('Network response not ok')
    }
    return response.text()
}).then((html) => {
    placeholder.innerHTML = html;
})
.catch((error) => {
    console.error('Error:', error);
})