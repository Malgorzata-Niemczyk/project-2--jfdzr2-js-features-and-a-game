const accordionHeaderElements = document.querySelectorAll('.accordion-item-header');

accordionHeaderElements.forEach(accordionHeaderElement => {
    accordionHeaderElement.addEventListener('click', () => {
        accordionHeaderElement.classList.toggle('active')
    })
})
