"use strict";

var titleHead = animationSettings.titleHeading,
    titleSub = animationSettings.titleSubheading,

// overview
overP = animationSettings.paraOverview,
    whyP = animationSettings.paraWhy,

//stages intro
stagesHead = animationSettings.headingStages,

// sections
stageOneP = animationSettings.paraOne,
    stageTwoP = animationSettings.paraTwo,
    stageThreeP = animationSettings.paraThree,

// end cta
ctaHead = animationSettings.endCtaHeading,
    ctaSub = animationSettings.endCtaSub,
    ctaBtnText = animationSettings.endCtaLinkText,
    ctaBtnTextSm = animationSettings.endCtaLinkTextSmall,
    ctaBtnLink = animationSettings.endCtaLink;

// ____________________________
// add the text
// - use innerHTML to include the html tags
document.querySelector('.title .container > h1').innerHTML = titleHead;
document.querySelector('.title .container > h3').innerHTML = titleSub;

document.querySelector('.overview p').innerHTML = overP;
document.querySelector('.stages-title h3').innerHTML = stagesHead;

document.querySelector('.stage-one p').innerHTML = stageOneP;
document.querySelector('.stage-two p').innerHTML = stageTwoP;
document.querySelector('.stage-three p').innerHTML = stageThreeP;

document.querySelector('.end-cta h2').innerHTML = ctaHead;
document.querySelector('.end-cta h3').innerHTML = ctaSub;

// add attributes to button (a function determines button text based on screen size)
var ctaBtn = document.querySelector('.end-cta a');
ctaBtn.setAttribute('href', ctaBtnLink);
ctaBtn.setAttribute('data-small', ctaBtnTextSm);
ctaBtn.setAttribute('data-big', ctaBtnText);

// ____________________________
// cta button function
// - swaps text based on screen size
// - similar to safari mobile message
window.onresize = btnText;

// breakpoint for small text = 660px
function btnText(resize) {

    // small text substitute
    if (window.innerWidth < 660) {
        var smText = document.querySelector('.end-cta a').getAttribute('data-small');
        var currentText = document.querySelector('.end-cta a').textContent;

        // only run once per resize:
        if (smText !== currentText) {
            document.querySelector('.end-cta a').textContent = smText;
        }
    }

    // large text
    else {
            var lgText = document.querySelector('.end-cta a').getAttribute('data-big');
            var _currentText = document.querySelector('.end-cta a').textContent;
            // only run once per resize:
            if (lgText !== _currentText) {
                document.querySelector('.end-cta a').textContent = lgText;
            }
        }
}
// run on load
btnText();