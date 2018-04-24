// file contents:
// - import text from animationSettings.js
// - import svg files from svg folder
// - add tweens (animations for each stage)
// - debug setting - add indicators
// - add svg gradient code
// - constructor functions


// text settings
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
ctaBtnLink = animationSettings.endCtaLink,



// general settings
debug = animationSettings.debug,
headerOffset = animationSettings.headerOffset;



 
// ____________________________
// add the text
$('.title .container > h1').html(titleHead);
$('.title .container > h3').html(titleSub);
// $('.title .small-msg p').html(titleTip);

$('.overview p').html(overP);

$('.stages-title h3').html(stagesHead);

$('.stage-one p').html(stageOneP);
$('.stage-two p').html(stageTwoP);
$('.stage-three p').html(stageThreeP);

// cta
$('.end-cta h2').html(ctaHead);
$('.end-cta h3').html(ctaSub);
$('.end-cta a').html(ctaBtnText).attr('href', ctaBtnLink);
$('.end-cta a').attr('data-small', ctaBtnTextSm).attr('data-big', ctaBtnText);


// add the svgs
$('.overview .graphic').load('svg/puzzle.svg');
$('.stage-one .graphic').load('svg/clipboard.svg');
$('.stage-two .graphic').load('svg/signpost.svg');
$('.stage-three .graphic').load('svg/document.svg');









// ____________________________
// header - scroll page to hide
var didScroll;
var lastScrollTop = 0;
var delta = headerOffset; // no. of pixels to scroll up to activate header. previously set to 5
var navbarHeight = $('.header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.header').removeClass('down').addClass('up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.header').removeClass('up').addClass('down');
        }
    }
    
    lastScrollTop = st;
}






// ____________________________
// cta button - swap out text under 660px;

// resize function
$( window ).resize(function() {
    var resize = true;
    // cta button - text swap
    btnText(resize);
});


// breakpoint for small text = 660px
function btnText(resize) {

    // small text substitute
    if ($('body').innerWidth() < 660) {
        var smText = $('.end-cta a').attr('data-small');
        var currentText = $('.end-cta a').text();
        // only run once per resize:
        if (smText !== currentText) {
            $('.end-cta a').text(smText);
        }               
    }

    // large text
    else {
        var lgText = $('.end-cta a').attr('data-big');
        var currentText = $('.end-cta a').text();
        // only run once per resize:
        if (lgText !== currentText) {
            $('.end-cta a').text(lgText);
        }

    }
}
// run on load
btnText();









// for use in background tweens
// - make sure there is no white space
var greenBg = getComputedStyle(document.body).getPropertyValue('--bg_green');
var greyBg = getComputedStyle(document.body).getPropertyValue('--bg_grey');
var orangeBg = getComputedStyle(document.body).getPropertyValue('--bg_orange');
var blueBg = getComputedStyle(document.body).getPropertyValue('--bg_blue');
var redBg = getComputedStyle(document.body).getPropertyValue('--bg_red');
var signpostBg = getComputedStyle(document.body).getPropertyValue('--sign_grey');



// convert hex to rgb (not required):
// function hexToRgb(hex) {
//     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     return result ? {
//         r: parseInt(result[1], 16),
//         g: parseInt(result[2], 16),
//         b: parseInt(result[3], 16)
//     } : null;
// }






// ____________________________________________________________________________________
// scrollmagic animations

// 1 - title
$(function() {

    
    // ____________________________
    // overView
    var overViewController = new ScrollMagic.Controller();

    // create a timeline to add tweens to
    // - note: this makes tweens occur sequentially
    var overViewTween = new TimelineMax();

    overViewTween

    // paragraph
    .fromTo(".overview .paragraph", 0.25, {
        opacity: 0,
        transform: "translatex(-500px)"
    },
    {
        opacity: 1,
        transform: "translate(0px)",
        ease: "ease-in-out"
    })

    // puzzle svg
    .staggerFromTo(".overview svg > g", 1.5, {
        transform: "translate(1000px, -1000px)"
    },
    {
        transform: "translate(0px)",
        ease: "ease-in-out"
    }, 0.15)

    
    
    // Create the Scene and trigger when visible
    var overViewScene = new ScrollMagic.Scene({
      triggerElement: ".overview",
      duration: "600%", // How many pixels / % to scroll / animate
      triggerHook: 0,
      
    })
    .setTween(overViewTween)
    .setPin(".overview") // set animation to this section
    .addTo(overViewController);

    // using the folling just after the element is selected makes the next section overlap:
    // .setPin(".stages-title") // adding ", {pushFollowers: false}"

    


    


    
    
    // ____________________________
    // stages title
    var stageTitleController = new ScrollMagic.Controller();

    // create a timeline to add tweens to
    var stageTitleTween = new TimelineMax();

    // heading 
    stageTitleTween
    .fromTo(".stages-title h3", 0.5, {
        opacity: 0,
        transform: "translatex(-500px)"
    },
    {
        opacity: 1,
        transform: "translatex(0px)",
        ease: Power2.easeOut
    })

    // body colour
    .to("body", 1,  {
        backgroundColor: greyBg,
        ease: Power1.easeOut // 
    }, 0)


    
    // Create the Scene and trigger when visible
    var stageTitleScene = new ScrollMagic.Scene({
      triggerElement: '.stages-title',
      duration: "200%", // How many pixels to scroll / animate
      triggerHook: 0
    })
    .setTween(stageTitleTween)
    .setPin(".stages-title")
    .addTo(stageTitleController);
    











    // ____________________________
    // MIAMs
    var miamController = new ScrollMagic.Controller();

    // create a timeline to add tweens to
    var miamTween = new TimelineMax();

    miamTween
    // heading and content
    .fromTo(".stage-one .paragraph", 0.5, {
        opacity: 0,
        transform: "translatex(500px)"
    },
    {
        opacity: 1,
        transform: "translatex(0px)", ease: Power2.easeOut
    })
    // add clipboard
    .fromTo(".stage-one svg", 0.25, {
        transform: "translate(-600px, 500px)"
    },
    {
        transform: "translate(0px)", ease: Power2.easeOut
    }, 0.5)

    // add ticks
    // - active getting added to first item immediately, adding delay causes fadein
    // - empty item hack(s) added
    .staggerTo(["", ".stage-one .tick.one", ".stage-one .tick.two", ".stage-one .tick.three", "", ""], 0, {
        className:"+=active"
    }, 0.35)


    // body colour
    .to("body", 1,  {
        backgroundColor: orangeBg,
        ease: Power1.easeOut
    }, 0) // add at a time of 0 seconds - i.e. at start trigger


    // Create the Scene and trigger when visible
    var miamScene = new ScrollMagic.Scene({
        triggerElement: '.stage-one',
        duration: "600%", // How many pixels to scroll / animate
        triggerHook: 0
    })
    .setTween(miamTween)
    .setPin(".stage-one")
    .addTo(miamController);









    
    
    // ____________________________
    // Mediation Sessions
    var mediationController = new ScrollMagic.Controller();

    // create a timeline to add tweens to
    var mediationTween = new TimelineMax();

    mediationTween
    // heading and content
    .fromTo(".stage-two .paragraph", 0.5, {
        opacity: 0,
        transform: "translatex(-500px)"
    },
    {
        opacity: 1,
        transform: "translatex(0px)", ease: Power2.easeOut
    })

    // add signpost
    .fromTo(".stage-two svg", 0.25, {
        transform: "translate(0, 600px)"
    },
    {
        transform: "translate(0px)", ease: Power2.easeOut
    }, 2)

    // reveal signs - fade in
    // - empty item hack(s) added - as above
    .staggerTo(["", ".stage-two .one", ".stage-two .two", ".stage-two .three", "", ""], 0, {
        className:"+=opaque"
    }, 1)
    

    // body colour
    .to("body", 1,  {
        backgroundColor: blueBg,
        ease: Power1.easeOut
    }, 0) // add at a time of 0 seconds - i.e. at start trigger


    // Create the Scene and trigger when visible
    var mediationScene = new ScrollMagic.Scene({
        triggerElement: '.stage-two',
        duration: "600%", // How many pixels to scroll / animate
        triggerHook: 0
    })
    .setTween(mediationTween)
    .setPin(".stage-two")
    .addTo(mediationController);









    
    
    // ____________________________
    // Mediation End
    var endController = new ScrollMagic.Controller();

    // create a timeline to add tweens to
    var endTween = new TimelineMax();

    endTween
    // heading and content
    .fromTo(".stage-three .paragraph", 0.5, {
        opacity: 0,
        transform: "translatex(500px)"
    },
    {
        opacity: 1,
        transform: "translatex(0px)", ease: Power2.easeOut
    })
    // add document svg
    .fromTo(".stage-three svg", 0.25, {
        transform: "translate(-750px, -500px)"
    },
    {
        transform: "translate(0px)", ease: Power2.easeOut
    }, 0.5)
    // add signatures
    .staggerTo(["", ".stage-three .signature.one", ".stage-three .signature.two", ".stage-three .stamp.three", "", ""], 0, {
        className:"+=active"
    }, 0.35) 

    // body colour
    .to("body", 1,  {
        backgroundColor: redBg,
        ease: Power1.easeOut
    }, 0) // add at a time of 0 seconds - i.e. at start trigger

    // Create the Scene and trigger when visible
    var endScene = new ScrollMagic.Scene({
        triggerElement: '.stage-three',
        duration: "600%", // How many pixels to scroll / animate
        triggerHook: 0
    })
    .setTween(endTween)
    .setPin(".stage-three")
    .addTo(endController);


    











    // ____________________________
    // CTA
    var ctaController = new ScrollMagic.Controller();

    // create a timeline to add tweens to
    var ctaTween = new TimelineMax();

    ctaTween
    // heading and content
    .fromTo(".end-cta .container", 0.5, {
        opacity: 0,
        transform: "translatex(-500px)"
    },
    {
        opacity: 1,
        transform: "translatex(0px)", ease: Power2.easeOut
    })
    // body colour
    .to("body", 1,  {
        backgroundColor: greenBg,
        ease: Power1.easeOut
    }, 0) // add at a time of 0 seconds - i.e. at start trigger

    // Create the Scene and trigger when visible
    var ctaScene = new ScrollMagic.Scene({
        triggerElement: '.end-cta',
        duration: "150%", // How many pixels to scroll / animate
        triggerHook: 0
    })
    .setTween(ctaTween)
    .setPin(".end-cta")
    .addTo(ctaController);




    
    
    
    // ____________________________
    // Add debug indicators fixed on right side
    // stageTitleScene.addIndicators({name: 'stages title'});
    if (debug == true) {
        overViewScene.addIndicators({name: 'overview', indent: 0});
        stageTitleScene.addIndicators({name: 'stages title', indent: 150});
        miamScene.addIndicators({name: 'miam', indent: 300});
        mediationScene.addIndicators({name: 'mediation', indent: 450});
        endScene.addIndicators({name: 'end', indent: 600});
        ctaScene.addIndicators({name: 'cta', indent: 750});
    }








    // ____________________________________________________________________________________
    // svg gradients
    // - signpost
    // - chrome bug causes gradient to not work on the pole
    // - workaround: https://stackoverflow.com/questions/10894377/dynamically-adding-a-svg-gradient
    createGradient($('.stage-two svg')[0],'PoleGradient',[
        // add colour stops here
        // '#c0c0c0'
        {offset:'0', 'stop-color':signpostBg, 'stop-opacity':1},
        {offset:'100%','stop-color':signpostBg, 'stop-opacity':0}
    ]);

    $('.stage-two svg path.pole').attr({
        fill : 'url(#PoleGradient)'
    });

    // this makes the gradient vertical for svg:
    // x1="0" x2="0" y1="0" y2="1"


    // svg:   the owning <svg> element
    // id:    an id="..." attribute for the gradient
    // stops: an array of objects with <stop> attributes
    function createGradient(svg,id,stops){
    var svgNS = svg.namespaceURI;
    var grad  = document.createElementNS(svgNS,'linearGradient');
    grad.setAttribute('id',id);
    // make gradient vertical:
    grad.setAttribute('x1',0);
    grad.setAttribute('x2',0);
    grad.setAttribute('y1',0);
    grad.setAttribute('y2',1);
    // add colour stops:
    for (var i=0;i<stops.length;i++){
        var attrs = stops[i];
        var stop = document.createElementNS(svgNS,'stop');
        for (var attr in attrs){
        if (attrs.hasOwnProperty(attr)) stop.setAttribute(attr,attrs[attr]);
        }
        grad.appendChild(stop);
    }

    var defs = svg.querySelector('defs') ||
        svg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);
    return defs.appendChild(grad);
    }







    
  });