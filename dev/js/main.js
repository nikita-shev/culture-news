'use strict';

const burgerBtn = document.querySelector('.menu-burger__btn'),
      closeBtn = document.querySelector('.menu-close__btn'),
      navMenu = document.querySelector('.menu'),
      body = document.querySelector('body'),
      menuBtn = document.querySelectorAll('.menu-btn'),
      ua = navigator.userAgent.toLowerCase();

let offsetPosition;

menuBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
        if (item.classList[1] === 'menu-burger__btn') {
            styleBtnMenu('none', 'block', 'flex');
            body.style.overflowY = 'hidden';

            offsetPosition = window.scrollY;

            if (ua.indexOf('safari') != -1) {
                if (ua.indexOf('chrome') > -1) {}
                else {
                    body.style.height = '100%';
                    body.style.position = 'relative';

                    document.querySelector('html').style.overflow = 'hidden';
                    document.querySelector('html').style.height = '100%';
                    document.querySelector('html').style.position = 'relative';
                }
            }
        }
        else if (item.classList[1] === 'menu-close__btn') {
            styleBtnMenu('', '', '');
            body.removeAttribute('style');

            document.querySelector('html').removeAttribute('style');

            if (ua.indexOf('safari') != -1) {
                if (ua.indexOf('chrome') > -1) {}
                else {

                    window.scrollBy({
                        top: offsetPosition,
                        behavior: 'auto'
                    });

                }
            }
        }
    })
});

const styleBtnMenu = (burger, close, menu) => {
    burgerBtn.style.display = `${burger}`;
    closeBtn.style.display = `${close}`;
    navMenu.style.display = `${menu}`;
};


//slider
const btnSlider = document.querySelectorAll('.btn'),
      allSlide = document.querySelectorAll('.slide-head'),
      countSlide = allSlide.length-1;
let count = 0;

btnSlider.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.classList[2] === 'slide-head__btn--prev' || btn.classList[2] === 'slide-head__btn--border-left') { leftSlide(); }
        else if (btn.classList[2] === 'slide-head__btn--next' || btn.classList[2] === 'slide-head__btn--border-right') { rightSlide(); }
        else if (btn.classList[1] === 'btn--arrow-left') { prevSlide(); }
        else if (btn.classList[1] === 'btn--arrow-right') { nextSlide(); }
    })
});

const leftSlide = () => {
    if (countSlide > count) {
        allSlide[count].style.opacity = 0;
        count--;
        if (count < 0) {
            count = allSlide.length-1;
            allSlide[count].style.opacity = 1;
        } else { allSlide[count].style.opacity = 1; }
    } else {
        count -= 1;
        allSlide[count].style.opacity = 1;
        allSlide[countSlide].style.opacity = 0;
    }
};

const rightSlide = () => {
    if (countSlide > count) {
        allSlide[count].style.opacity = 0;
        count++;
        allSlide[count].style.opacity = 1;
    } else {
        count = 0;
        allSlide[count].style.opacity = 1;
        allSlide[countSlide].style.opacity = 0;
    }
};


//slider footer
const sliderWrap = document.querySelector('.slider-container'),
      countSlides = document.querySelectorAll('.slide').length-1;

const prevSlide = () => {
    const allSlides = document.querySelectorAll('.slide');
    sliderWrap.insertBefore(allSlides[countSlides], allSlides[0]);
};

const nextSlide = () => {
    const allSlides = document.querySelectorAll('.slide');
    sliderWrap.insertBefore(allSlides[0], null);
};


//autoplay slider-header
const autoPlay = () => {
    const widthWindow = screen.width;

    // if (widthWindow > 1024) {
        setInterval(rightSlide, 5000)
    // }
};
autoPlay();


//move slide-footer in main
const sizeWindow = () => {
    const widthWindow = screen.width,
          main = document.querySelector('.main .container'),
          sidebar = document.querySelector('.sidebar'),
          slideFooter = document.querySelector('.slider-footer');

    if (widthWindow <= 992) { main.insertBefore(slideFooter, sidebar); }
};

sizeWindow();



//btn up animate
const btnUp = document.querySelector('.btn-up'),
      block = document.querySelector('.header');

let idAnimate,
    scrollStepAnimate;

const animateScrollSafari = (time) => {
    if (window.scrollY > 0) {
        let top = -scrollStepAnimate;
        if (window.scrollY < scrollStepAnimate) { top = -window.scrollY; }

        window.scrollBy({top: top})
    } else if (window.scrollY <= 0) {
        clearTimeout(idAnimate);
        return;
    }

    idAnimate = setTimeout(animateScrollSafari, time/60);
};

const animateScroll = (time, scrollStep) => {
    scrollStepAnimate = scrollStep;

    if (ua.indexOf('safari') != -1) {
        if (ua.indexOf('chrome') > -1) {
            // animateScrollSafari(time);
        }
        else { animateScrollSafari(time); } //if Safari
    }

    block.scrollIntoView({block: "start", behavior: "smooth"});
};

btnUp.addEventListener('click', () => { animateScroll(1000, 100); });

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) { btnUp.style.display = 'block'; }
    else { btnUp.style.display = 'none'; }
});
