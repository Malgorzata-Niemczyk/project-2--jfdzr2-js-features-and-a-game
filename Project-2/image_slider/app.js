const slidesWrapper = document.querySelector('.slides-carousel');
const textElements = document.querySelectorAll('.content');
const textElementsArr = Array.from(textElements);

//background images 
const slideElements = document.querySelectorAll('.slide-item');
const slideElementsArr = Array.from(slideElements);

//buttons
const prevBtnElement = document.querySelector('.previous-btn');
const nextBtnElement = document.querySelector('.next-btn');

let counter = 0;
const slideWidth = 965;

//Functions to change images left and right when clicking on arrow buttons
function nextSlide() {
    if (counter === slideElementsArr.length) {
        counter = -1;
    };

    slidesWrapper.classList.add('transition-effect');

    slidesWrapper.animate([
        {opacity:'0.1'}, 
        {opacity:'1.0'}
    ], {
        duration:1000, 
        fill:'forwards'
    });

    //textElementsArr.forEach(el => {el.classList.add('animation-effect')});
    counter++;
    slidesWrapper.style.transform = `translateX(${-slideWidth * counter}px)`;
};

function prevSlide() {
    if (counter === 0) {
        counter = 7;
    };

    slidesWrapper.classList.add('transition-effect');
    
    slidesWrapper.animate([
        {opacity:'0.1'}, 
        {opacity:'1.0'}
    ], {
        duration:1000, 
        fill:'forwards'
    });

    //textElementsArr.forEach(el => {el.classList.add('animation-effect')});
    counter--;
    slidesWrapper.style.transform = `translateX(${-slideWidth * counter}px)`;
}

//function to change images in a loop
function transitionLoop() {
    if (slideElementsArr[counter].id === 'slide-last-copy') {
        slidesWrapper.classList.remove('transition-effect');
        counter = slideElementsArr.length -2;
        slidesWrapper.style.transform = `translateX(${-slideWidth * counter}px)`;
    }

    if (slideElementsArr[counter].id === 'slide-first-copy') {
        slidesWrapper.classList.remove('transition-effect');
        counter = slideElementsArr.length - counter;
        slidesWrapper.style.transform = `translateX(${-slideWidth * counter})`;
    }
}

//Buttons events 
nextBtnElement.addEventListener('click', nextSlide);
prevBtnElement.addEventListener('click', prevSlide);
slidesWrapper.addEventListener('transitionend', transitionLoop);