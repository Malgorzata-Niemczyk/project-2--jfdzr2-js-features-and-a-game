const accordionHeaderElements = document.querySelectorAll('.accordion-item-header');

accordionHeaderElements.forEach(accordionHeaderElement => {
    accordionHeaderElement.addEventListener('click', () => {
        accordionHeaderElement.classList.toggle('active');

        const accordionBodyElements = accordionHeaderElement.nextElementSibling;

        if (accordionHeaderElement.classList.contains('active')) {
            accordionBodyElements.style.maxHeight = accordionBodyElements.scrollHeight + 'px';
        } else {
            accordionBodyElements.style.maxHeight = 0;
        }
    })
})
