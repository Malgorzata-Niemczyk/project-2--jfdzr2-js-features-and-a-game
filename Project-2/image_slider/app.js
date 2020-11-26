const slidesCarouselWrapper = document.querySelector('.slides-carousel');

//background images 
const slideElements = document.querySelectorAll('.slide-item');

//buttons
const prevBtnElement = document.querySelector('.previous-btn');
const nextBtnElement = document.querySelector('.next-btn');

let counter = 0;
const slideWidth = slideElements[0].clientWidth;

//Functions to change images left and right when clicking on arrow buttons
function nextSlide() {
    if (counter === slideElements.length) {
        counter = -1;
    };

    slidesCarouselWrapper.classList.add('transition-effect');

    slidesCarouselWrapper.animate([
        {opacity:'0.1'}, 
        {opacity:'1.0'}
    ], {
        duration:1000, 
        fill:'forwards'
    });

    counter++;
    slidesCarouselWrapper.style.transform = `translateX(${-slideWidth * counter}px)`;
};

function prevSlide() {
    if (counter === 0) {
        counter = 7;
    };

    slidesCarouselWrapper.classList.add('transition-effect');
    
    slidesCarouselWrapper.animate([
        {opacity:'0.1'}, 
        {opacity:'1.0'}
    ], {
        duration:1000, 
        fill:'forwards'
    });

    counter--;
    slidesCarouselWrapper.style.transform = `translateX(${-slideWidth * counter}px)`;
}

//function to change images in a loop
function transitionLoop() {
    if (slideElements[counter].id === 'slide-last-copy') {
        slidesCarouselWrapper.classList.remove('transition-effect');
        counter = slideElements.length -2;
        slidesCarouselWrapper.style.transform = `translateX(${-slideWidth * counter}px)`;
    }

    if (slideElements[counter].id === 'slide-first-copy') {
        slidesCarouselWrapper.classList.remove('transition-effect');
        counter = slideElements.length - counter;
        slidesCarouselWrapper.style.transform = `translateX(${-slideWidth * counter})`;
    }
}

//Buttons events 
nextBtnElement.addEventListener('click', nextSlide);
prevBtnElement.addEventListener('click', prevSlide);
slidesCarouselWrapper.addEventListener('transitionend', transitionLoop);