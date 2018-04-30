"use strict";
const headerOffset = animationSettings.headerOffset;



// ____________________________
// header - scroll page to hide
let didScroll;
let lastScrollTop = 0;
const header = document.querySelector('.header'); // header element
const delta = headerOffset; // no. of pixels to scroll up to activate header. previously set to 5
const navbarHeight  = header.offsetHeight;

// get the height of the document element. This is not particularly straightforward...
// https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
const body = document.body,
      html = document.documentElement;
const height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );


// $(window).scroll(function(event){
//     didScroll = true;
// });

window.addEventListener('scroll', function(e) {
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    let st = window.scrollY;
    
    // make sure the user scrolls more than delta (offset)
    if (Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // if scrolled down past the navbar, add class .nav-up
    if (st > lastScrollTop && st > navbarHeight){
        // scroll down
        header.classList.remove('down');
        header.classList.add('up');
    } else {
        // scroll up
        if (st + window.innerHeight < height) {
            header.classList.remove('up');
            header.classList.add('down');
        }
    }
    
    lastScrollTop = st;
}