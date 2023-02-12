'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll('.btn--show-modal-window');
const h1 = document.querySelector('h1');
const message = document.createElement('div');
const header = document.querySelector('.header');
const navlogo = document.querySelector('.nav__logo');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

const openModalWindow = function() {
    modalWindow.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModalWindow = function() {
    modalWindow.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(btn => btn.addEventListener('click', openModalWindow));

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
        closeModalWindow();
    }
});

///////////////////////////////////////

message.classList.add('cookie-message');
message.innerHTML = 'Используем куки для улучшения. <button class="btn btn--close-cookie">Ok</button>';
header.append(message);

document.querySelector('.btn--close-cookie').addEventListener('click', () => message.remove());

///////////////////////////////////////

message.style.backgroundColor = '#083c6d';
message.style.width = '106%';
message.style.height = parseFloat(getComputedStyle(message).height) + 10 + 'px';
console.log(getComputedStyle(message).height);

/* document.documentElement.style.setProperty('--color-first', 'yellow'); */

// attributes

navlogo.setAttribute('copyrigth', 'some');
console.log(navlogo.dataset.v);

///////////////////////////////////////

btnScrollTo.addEventListener('click', (e) => {
    const section1Coords = section1.getBoundingClientRect();
    console.log(section1Coords);

    /*  console.log(e.target.getBoundingClientRect());
        console.log('current scroll', window.pageXOffset, window.pageYOffset);
        console.log('width and height viewport', document.documentElement.clientWidth,
            document.documentElement.clientHeight);
    */

    /*  window.scrollTo({
        left: section1Coords.left + window.pageXOffset,
        top: section1Coords.top + window.pageYOffset,
        behavior: 'smooth'
    });
    */

    section1.scrollIntoView({
        behavior: 'smooth'
    });
});

/* window.addEventListener('scroll', () => console.log(window.pageYOffset)); */

// old method
// h1.onclick = () => console.log('click');

h1.addEventListener('mouseenter', (e) => {
    console.log('hover on h1');
}, { once: true });

///////////////////////////////////////
// event propagation

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomColor = () => `rgb(${getRandomIntInclusive(0, 255)},${getRandomIntInclusive(0, 255)},${getRandomIntInclusive(0, 255)})`;


///////////////////////////////////////
// smoth page navigation and delegation

document.querySelector('.nav__links').addEventListener('click', function(e) {
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
        const href = e.target.getAttribute('href');
        console.log(href);
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
});

///////////////////////////////////////
// DOM traversing

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.children);
console.log(h1.firstElementChild);

console.log(h1.parentNode);
console.log(h1.parentElement);

const h2 = document.querySelector('h2');

console.log(h1.parentElement.children);

///////////////////////////////////////
// tabs

const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function(e) {
    const clikedButton = e.target.closest('.operations__tab');
    if (!clikedButton) {
        return;
    }

    // active tab
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    clikedButton.classList.add('operations__tab--active');

    // active content
    tabContents.forEach(content => content.classList.remove('operations__content--active'));
    document.querySelector(`.operations__content--${clikedButton.dataset.tab}`).classList.add('operations__content--active');
});

///////////////////////////////////////
// fadeout

const navLinksHoverAnimation = function(e) {
    if (e.target.classList.contains('nav__link')) {
        const linkOver = e.target;
        const siblingLinks = linkOver.closest('.nav__links').querySelectorAll('.nav__link');
        const logo = linkOver.closest('.nav').querySelector('img');
        const logotext = linkOver.closest('.nav').querySelector('.nav__text');

        siblingLinks.forEach(el => {
            if (el !== linkOver) {
                el.style.opacity = this;
            }
        });
        logo.style.opacity = this;
        logotext.style.opacity = this;
    }
};

// work with arguments bind() / this
nav.addEventListener('mouseover', navLinksHoverAnimation.bind(0.4));

nav.addEventListener('mouseout', navLinksHoverAnimation.bind(1));

///////////////////////////////////////
// sticky nav

/* const section1Coords = section1.getBoundingClientRect();
window.addEventListener('scroll', function(e) {

    if (window.scrollY > section1Coords.top) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }

}); */

// sticky nav intersection observer API

/* const observerCallback = function(entries, observer) {
    entries.forEach(entry => {
        console.log(entry);
    });
};
const observerOptions = {
    root: null, // viewport
    threshold: [0, 0.2] // 0% 20%
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(section1); */

const navHeight = nav.getBoundingClientRect().height;

const getStickyNav = function(entrys) {
    const entry = entrys[0];
    /* console.log(entry); */
    if (!entry.isIntersecting) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }

};
const headerObserver = new IntersectionObserver(getStickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);


///////////////////////////////////////
// apearing section

const allSections = document.querySelectorAll('.section');

const apearingSection = function(entries, observer) {
    const entry = entries[0];
    /* console.log(entry); */
    if (!entry.isIntersecting) {
        return;
    }
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(apearingSection, {
    root: null,
    threshold: 0.2,
});

allSections.forEach(function(section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});



/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

/* document.querySelectorAll('.nav__link').forEach((htmlElement) => {
    htmlElement.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        console.log(href);
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    });
}); */

/* 
document.querySelector('.nav__link').addEventListener('click', function(e) {
    this.style.backgroundColor = getRandomColor();
    console.log('link', e.target, e.currentTarget);
    console.log(this === e.currentTarget);
    // stop propagation
    // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function(e) {
    this.style.backgroundColor = getRandomColor();
    console.log('links', e.target, e.currentTarget);
    console.log(this === e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function(e) {
    this.style.backgroundColor = getRandomColor();
    console.log('nav', e.target, e.currentTarget);
    console.log(this === e.currentTarget);
});
 */