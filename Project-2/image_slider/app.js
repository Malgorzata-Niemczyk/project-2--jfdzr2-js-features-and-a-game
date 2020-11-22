const slidesWrapper = document.querySelector('.slides-carousel');

//background images 
const slideElements = document.querySelectorAll('.slide-item');

//buttons
const prevBtnElement = document.querySelector('.previous-bt');
const nextBtnElement = document.querySelector('.next-btn');

//Functions



//Buttons events 
nextBtnElement.addEventListener('click', nextSlide)
prevBtnElement.addEventListener('click', prevSlide)
