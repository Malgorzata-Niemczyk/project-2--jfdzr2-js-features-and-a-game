const slidesWrapper = document.querySelector('.slides-carousel');
const textElements = document.querySelectorAll('.content');

//background images 
const slideElements = document.querySelectorAll('.slide-item');

//buttons
const prevBtnElement = document.querySelector('.previous-btn');
const nextBtnElement = document.querySelector('.next-btn');

let counter = 1;
const slideWidth = 965;

//Functions
function nextSlide() {
    counter++;
    slidesWrapper.style.transform = `translateX(${-slideWidth * counter}px)`;
};

function prevSlide() {
    counter--;
    slidesWrapper.style.transform = `translateX(${-slideWidth * counter}px)`;
}

//Buttons events 
nextBtnElement.addEventListener('click', nextSlide);
prevBtnElement.addEventListener('click', prevSlide);
