const tooltip = document.createElement('div');
tooltip.className = 'alt-text-tooltip';
document.body.appendChild(tooltip);

const imageWrappers = document.querySelectorAll('.half-img, .quad-img');
imageWrappers.forEach(wrapper => {    
    const image = wrapper.querySelector('img');

    wrapper.addEventListener('mouseover', () => {
        tooltip.style.opacity = '1';
        tooltip.innerText = image.alt;
    });

    wrapper.addEventListener('mouseout', () => {
        tooltip.style.opacity = '0';
    });
});

document.addEventListener('mousemove', fn, false);
function fn(e) {
    tooltip.style.left = 'calc(' + e.pageX + 'px - ' + tooltip.offsetWidth + 'px)';
    tooltip.style.top = e.pageY + 'px';
}