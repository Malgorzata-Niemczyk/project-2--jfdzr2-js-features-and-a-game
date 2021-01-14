const accordionHeaderElements = document.querySelectorAll('.accordion-item-header');

accordionHeaderElements.forEach(accordionHeaderElement => {
    accordionHeaderElement.addEventListener('click', () => {

        /*to have one element with a class of accordion-item-body open at a time, and the other element with the same class closing, when clicking an element with a class of accordion-item-header*/
        const currentlyActiveAccordionHeaderElement = document.querySelector('.accordion-item-header.active');
        if (currentlyActiveAccordionHeaderElement && currentlyActiveAccordionHeaderElement !== accordionHeaderElement) {
            currentlyActiveAccordionHeaderElement.classList.remove('active');
            currentlyActiveAccordionHeaderElement.nextElementSibling.style.maxWidth = 0;
        }

        //to toggle an active class on an element with a class of accordion-item-header
        accordionHeaderElement.classList.toggle('active');

        //to hide next slibling, that is an element with a class of accordion-item-body, when the element with a class of acordion-item-header has also an active class
        const accordionBodyElements = accordionHeaderElement.nextElementSibling;

        if (accordionHeaderElement.classList.contains('active')) {
            accordionBodyElements.style.maxWidth = accordionBodyElements.scrollWidth + 'px';
        } else {
            accordionBodyElements.style.maxWidth = 0;
        }
    })
})
