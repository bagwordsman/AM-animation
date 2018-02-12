

var titleH1 = animationSettings.headingH1,
     titleP = animationSettings.headingP,
     smallP = animationSettings.smallMsg,
      overP = animationSettings.paraOverview,
       whyP = animationSettings.paraWhy,
   stagesH2 = animationSettings.headingStages,
  stageOneP = animationSettings.paraOne,
  stageTwoP = animationSettings.paraTwo,
stageThreeP = animationSettings.paraThree,
      ctaH2 = animationSettings.endCtaHeading,
       ctaP = animationSettings.endCtaText,
 ctaBtnText = animationSettings.endCtaLinkText,
 ctaBtnLink = animationSettings.endCtaLink ;


         
// ____________________________  
// add all the content
$('.title .container > h1').html(titleH1);
$('.title .container > p').html(titleP);
$('.small-msg p').html(smallP);

$('.overview p').html(overP);

$('.stages-title h2').html(stagesH2);

$('.stage-one p').html(stageOneP);
$('.stage-two p').html(stageTwoP);
$('.stage-three p').html(stageThreeP);

// cta
$('.end-cta h2').html(ctaH2);
$('.end-cta p').html(ctaP);
$('.end-cta a').html(ctaBtnText).attr('href', ctaBtnLink);






// ____________________________
// svg gradients
// - signpost
// - chrome bug causes gradient to not work on the pole
// - workaround: https://stackoverflow.com/questions/10894377/dynamically-adding-a-svg-gradient
createGradient($('.stage-two svg')[0],'PoleGradient',[
    // add colour stops here
    {offset:'0', 'stop-color':'#c0c0c0', 'stop-opacity':1},
    {offset:'100%','stop-color':'#c0c0c0', 'stop-opacity':0}
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





// ____________________________
// header - scroll page to hide
var didScroll;
var lastScrollTop = 0;
var delta = 5;
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
// scrollmagic animations

// 1 - title
$(function() {

    
    // ___________
    // overView
    var overViewController = new ScrollMagic.Controller();

    // create a timeline to add tweens to
    // - note: this makes tweens occur sequentially
    var overViewTween = new TimelineMax();

    overViewTween.add(
        TweenMax.to('.overview .container')
    );

    // paragraph 
    overViewTween.add(
        TweenMax.fromTo(".overview .paragraph", 0.25, {
            opacity: 0,
            transform: "translatex(-500px)"
        },
        {
            opacity: 1,
            transform: "translate(0px)", ease: "ease-in-out"
        })
    );

    // puzzle svg
    overViewTween.add(
        TweenMax.staggerFromTo(".overview svg > g", 1.5, {
            transform: "translate(1000px, -1000px)"
        },
        {
            transform: "translate(0px)", ease: "ease-in-out"
        }, 0.15)
    );
    
    // Create the Scene and trigger when visible
    var overViewScene = new ScrollMagic.Scene({
      triggerElement: '.overview',
      duration: "600%", // How many pixels / % to scroll / animate
      triggerHook: 0
    })
    .setTween(overViewTween)
    // .addIndicators({name: "staggering"}) - debug staggering puzzle
    .setPin(".overview")
    .addTo(overViewController);
    
    // Add debug indicators fixed on right side
    // overViewScene.addIndicators({name: 'overview'});
    


    











    // ___________
    // stages title
    var stageTitleController = new ScrollMagic.Controller();

    // create a timeline to add tweens to
    var stageTitleTween = new TimelineMax();

    // heading 
    stageTitleTween.fromTo(".stages-title h2", 0.5, {
        opacity: 0,
        transform: "translatex(-500px)"
    },
    {
        opacity: 1,
        transform: "translatex(0px)", ease: Power2.easeOut
    })

    // body colour
    .to("body", 1,  {
        backgroundColor: "rgb(221, 221, 221)", ease: Power1.easeOut
    }, 0) // add at a time of 0 seconds - i.e. at start trigger

    
    // Create the Scene and trigger when visible
    var stageTitleScene = new ScrollMagic.Scene({
      triggerElement: '.stages-title',
      duration: "150%", // How many pixels to scroll / animate
      triggerHook: 0
    })
    .setTween(stageTitleTween)
    .setPin(".stages-title") // adding ", {pushFollowers: false}" here makes the next html go through the pinned element
    .addTo(stageTitleController);
    
    // Add debug indicators fixed on right side
    // stageTitleScene.addIndicators({name: 'stages title'});












    // ___________
    // MIAMs
    var miamController = new ScrollMagic.Controller();

    // create a timeline to add tweens to
    var miamTween = new TimelineMax();

    // heading and content
    miamTween.fromTo(".stage-one .paragraph", 0.5, {
        opacity: 0,
        transform: "translatex(500px)"
    },
    {
        opacity: 1,
        transform: "translatex(0px)", ease: Power2.easeOut
    })

    // - - - - 
    // add clipboard
    miamTween.fromTo(".stage-one svg", 0.25, {
        transform: "translate(-500px, 500px)"
    },
    {
        transform: "translate(0px)", ease: Power2.easeOut
    }, 0.5)

    // add ticks
    // - active getting added to first item immediately, adding delay causes fadein
    // - empty item hack(s) added
    miamTween.staggerTo(["", ".stage-one .tick.one", ".stage-one .tick.two", ".stage-one .tick.three", "", ""], 0, {
        className:"+=active"
    }, 0.35)

    // - - - - 
    // body colour
    .to("body", 1,  {
        backgroundColor: "rgb(249, 203, 174)", ease: Power1.easeOut
    }, 0) // add at a time of 0 seconds - i.e. at start trigger

    // miamTween.shiftChildren(-1)
    // console.log(miamTween);


    // Create the Scene and trigger when visible
    var miamScene = new ScrollMagic.Scene({
        triggerElement: '.stage-one',
        duration: "600%", // How many pixels to scroll / animate
        triggerHook: 0
    })
    .setTween(miamTween)
    .setPin(".stage-one") // adding ", {pushFollowers: false}" here makes the next html go through the pinned element
    .addTo(miamController);
    // miamScene.addIndicators({name: 'miam'});










    
    
    // ___________
    // Mediation Sessions
    var mediationController = new ScrollMagic.Controller();

    // create a timeline to add tweens to
    var mediationTween = new TimelineMax();

    // heading and content
    mediationTween.fromTo(".stage-two .paragraph", 0.5, {
        opacity: 0,
        transform: "translatex(-500px)"
    },
    {
        opacity: 1,
        transform: "translatex(0px)", ease: Power2.easeOut
    })

    
    // - - - -
    // add signpost
    mediationTween.fromTo(".stage-two svg", 0.25, {
        transform: "translate(0, 600px)"
    },
    {
        transform: "translate(0px)", ease: Power2.easeOut
    }, 2)

    // reveal signs - fade in
    // - empty item hack(s) added - as above
    mediationTween.staggerTo(["", ".stage-two .one", ".stage-two .two", ".stage-two .three", "", ""], 0, {
        className:"+=opaque"
    }, 1)
    
    
    
    // - - - - 
    // body colour
    .to("body", 1,  {
        backgroundColor: "rgb(203, 230, 255)", ease: Power1.easeOut
    }, 0) // add at a time of 0 seconds - i.e. at start trigger



    // - - - -
    // Create the Scene and trigger when visible
    var mediationScene = new ScrollMagic.Scene({
        triggerElement: '.stage-two',
        duration: "600%", // How many pixels to scroll / animate
        triggerHook: 0
    })
    .setTween(mediationTween)
    .setPin(".stage-two") // adding ", {pushFollowers: false}" here makes the next html go through the pinned element
    .addTo(mediationController);








    
    
    // ___________
    // Mediation End
    var endController = new ScrollMagic.Controller();

    // create a timeline to add tweens to
    var endTween = new TimelineMax();

    // heading and content
    endTween.fromTo(".stage-three .paragraph", 0.5, {
        opacity: 0,
        transform: "translatex(500px)"
    },
    {
        opacity: 1,
        transform: "translatex(0px)", ease: Power2.easeOut
    })

    // - - - -
    // add document
    endTween.fromTo(".stage-three svg", 0.25, {
        transform: "translate(-750px, -500px)"
    },
    {
        transform: "translate(0px)", ease: Power2.easeOut
    }, 0.5)

    // add signatures
    endTween.staggerTo(["", ".stage-three .signature.one", ".stage-three .signature.two", ".stage-three .stamp.three", "", ""], 0, {
        className:"+=active"
    }, 0.35)
    
    
    // - - - - 
    // body colour
    .to("body", 1,  {
        backgroundColor: "rgb(245, 184, 179)", ease: Power1.easeOut
    }, 0) // add at a time of 0 seconds - i.e. at start trigger



    // - - - -
    // Create the Scene and trigger when visible
    var endScene = new ScrollMagic.Scene({
        triggerElement: '.stage-three',
        duration: "600%", // How many pixels to scroll / animate
        triggerHook: 0
    })
    .setTween(endTween)
    .setPin(".stage-three") // adding ", {pushFollowers: false}" here makes the next html go through the pinned element
    .addTo(endController);











    // ___________
    // CTA
    var ctaController = new ScrollMagic.Controller();

    // create a timeline to add tweens to
    var ctaTween = new TimelineMax();

    // heading and content
    ctaTween.fromTo(".end-cta .container > div", 0.5, {
        opacity: 0,
        transform: "translatex(-500px)"
    },
    {
        opacity: 1,
        transform: "translatex(0px)", ease: Power2.easeOut
    })

    
    // - - - - 
    // body colour
    .to("body", 1,  {
        backgroundColor: "rgb(199, 230, 182)", ease: Power1.easeOut
    }, 0) // add at a time of 0 seconds - i.e. at start trigger



    // - - - -
    // Create the Scene and trigger when visible
    var ctaScene = new ScrollMagic.Scene({
        triggerElement: '.end-cta',
        duration: "150%", // How many pixels to scroll / animate
        triggerHook: 0
    })
    .setTween(ctaTween)
    .setPin(".end-cta") // adding ", {pushFollowers: false}" here makes the next html go through the pinned element
    .addTo(ctaController);















    
    
    
    // __________________________________________________________________


    // overViewTween.add(
    //     TweenMax.to(".overview .paragraph", 0.25, {
    //         opacity: '1',
    //         transform: 'translatex(0px)'
    //     })
    // );





    // stages
    // var stageTitleController = new ScrollMagic.Controller();
    
    // var stageTitleTween = TweenMax.to('.stages-title .container', 1 );
    
    
    // // Create the Scene and trigger when visible
    // var stageTitleScene = new ScrollMagic.Scene({
    //   triggerElement: '.stages-title',
    //   duration: "250%", // How many pixels to scroll / animate
    //   triggerHook: 0
    // })
    // .setTween(stageTitleTween)
    // .setPin(".stages-title") // adding ", {pushFollowers: false}" here makes the next html go through the pinned element
    // .addTo(stageTitleController);
    
    // // Add debug indicators fixed on right side
    // stageTitleScene .addIndicators();







    
  });