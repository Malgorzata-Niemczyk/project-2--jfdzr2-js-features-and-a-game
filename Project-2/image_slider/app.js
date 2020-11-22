const slidesWrapper = document.querySelector('.slides-carousel');

//background images 
const slideElements = document.querySelectorAll('.slide-item');

//buttons
const prevBtnElement = document.querySelector('.previous-bt');
const nextBtnElement = document.querySelector('.next-btn');

let counter = 0;
const slideWidth = 955;

//Functions
function nextSlide() {
    slidesWrapper.style.transition = 'transform 0.3 ease-in-out';
    counter++;
    slidesWrapper.style.transform = `translateX(-${slideWidth} * ${counter}px)`;
}

//function prevSlide() {

//}

//Buttons events 
nextBtnElement.addEventListener('click', nextSlide())
//prevBtnElement.addEventListener('click', prevSlide)
