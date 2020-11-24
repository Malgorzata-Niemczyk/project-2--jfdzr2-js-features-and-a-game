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

//Functions
function nextSlide() {
    if (counter >= slideElementsArr.length -1) return;
    slidesWrapper.classList.add('transition-effect');
    textElementsArr.forEach(el => {el.classList.add('animation-effect')});
    counter++;
    slidesWrapper.style.transform = `translateX(${-slideWidth * counter}px)`;
};

function prevSlide() {
    if (counter <= 0) return;
    slidesWrapper.classList.add('transition-effect');
    textElementsArr.forEach(el => {el.classList.add('animation-effect')});
    counter--;
    slidesWrapper.style.transform = `translateX(${-slideWidth * counter}px)`;
}

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