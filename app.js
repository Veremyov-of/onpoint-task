const slider = document.querySelector('.slider-container'),
    slides = Array.from(document.querySelectorAll('.slide'));

let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    currentIndex = 0;

slides.forEach((slide, index) => {
    // const slideImage = slide.querySelector('.img');
    // slideImage.addEventListener('dragstart', (e) => e.preventDefault());

    //Touch events
    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd);
    slide.addEventListener('touchmove', touchMove);

    //Mouse events
    slide.addEventListener('mousedown', touchStart(index));
    slide.addEventListener('mouseup', touchEnd);
    slide.addEventListener('mouseleave', touchEnd );
    slide.addEventListener('mousemove', touchMove);
});

//Disable context menu
window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
}

function touchStart(index) {
    
    return function(event) {
        currentIndex = index;
        startPos = getPositionX(event);
        isDragging = true;

        animationID = requestAnimationFrame(animation);
        slider.classList.add('grabbing');
    }
    
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    
    const moveBy = currentTranslate - prevTranslate;
    
    if(moveBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;
    if(moveBy > 100 && currentIndex > 0) currentIndex -= 1;
    animationAbout()
    

    setPositionByIndex();
    slider.classList.remove('grabbing');
}

function touchMove(event) {
    if(isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
    
}

function getPositionX(event) {
 return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setSliderPosition();
    if(isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
}




const homeBtn = document.querySelector('.home');
homeBtn.addEventListener('click', () => {
    slider.style.transform = `translateX(${0}px)`;
    currentIndex = 0;
    currentTranslate = 0;
    prevTranslate = 0;
});


const nextBtn = document.querySelector('.next-btn');
nextBtn.addEventListener('click', () => {
    currentIndex = 1;
    touchEnd();
});


let about = document.querySelectorAll('.about-animation');

function animationAbout() {
    if(currentIndex === 1) {
        about.forEach(item => {
            item.classList.add('active_about');
        })
    } else {
        about.forEach(item => {
            item.classList.remove('active_about');
        })
    }
}


//* pop-up
const detailedBtn = document.querySelector('.product-btn');
const popup = document.querySelector('.product_wrapp');
const closeBtn = document.querySelector('.close');

detailedBtn.addEventListener('click', () => {
    popup.classList.add('product_wrapp-active');
});

closeBtn.addEventListener('click', () => {
    popup.classList.remove('product_wrapp-active');
});

const popupContainer = document.querySelectorAll('.popup_container');
const popupNav = document.querySelectorAll('.pagination-nav');
const paginationBackBtn = document.getElementById('back');
const paginationNextBtn = document.getElementById('next');


paginationNextBtn.addEventListener('click', () => {
    popupContainer[1].classList.add('popup_container-active');
    popupContainer[0].classList.remove('popup_container-active');

    popupNav[1].classList.add('pagination-nav-active');
    popupNav[0].classList.remove('pagination-nav-active');

})


paginationBackBtn.addEventListener('click', () => {
    popupContainer[0].classList.add('popup_container-active');
    popupContainer[1].classList.remove('popup_container-active');

    popupNav[0].classList.add('pagination-nav-active');
    popupNav[1].classList.remove('pagination-nav-active');
});

//! pop-up
