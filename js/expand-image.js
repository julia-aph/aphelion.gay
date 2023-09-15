const modal = document.createElement('div');
modal.className = 'modal';

const imageContainer = document.createElement('div');
imageContainer.className = 'modal-image-container';
imageContainer.addEventListener('click', closeModal);
modal.appendChild(imageContainer);

const modalBar = document.createElement('div');
modalBar.className = 'modal-bar';
modal.appendChild(modalBar);

const altText = document.createElement('div');
altText.className = 'modal-alt-text';
modalBar.appendChild(altText);

const caption = document.createElement('a');
caption.className = 'caption';
modalBar.appendChild(caption);

const expandedImage = document.createElement('img');
expandedImage.className = 'expanded-image';
expandedImage.src = '/images/cat pc.jpg'
imageContainer.appendChild(expandedImage);

document.body.appendChild(modal);

const images = document.querySelectorAll('img');
images.forEach(function(image) {
    image.addEventListener('click', function() {
        openModal(this);
    });
});

function openModal(image) {
    const filename = decodeURI(image.src.split("/").pop());
    caption.innerText = filename;
    caption.href = image.src;
    caption.download = filename;

    altText.innerText = image.alt;
    
    expandedImage.src = image.src;
    expandedImage.alt = image.alt;
    
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}
