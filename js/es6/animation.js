// file contents:

// - debug setting - add indicators
// - add svg gradient code
// - add safari mobile caveat
// - add tweens (animations for each stage)

"use strict";
// debug toggle - settings
const debug = animationSettings.debug;
// safari message - settings
const safariCaveat = animationSettings.safariCaveat;


// for use in background tweens
// - make sure there is no white space
const greenBg = getComputedStyle(document.body).getPropertyValue('--bg_green');
const greyBg = getComputedStyle(document.body).getPropertyValue('--bg_grey');
const orangeBg = getComputedStyle(document.body).getPropertyValue('--bg_orange');
const blueBg = getComputedStyle(document.body).getPropertyValue('--bg_blue');
const redBg = getComputedStyle(document.body).getPropertyValue('--bg_red');
const signpostBg = getComputedStyle(document.body).getPropertyValue('--sign_grey');






// ____________________________________________________________________________________
// svg gradients
// - signpost
// - chrome bug causes gradient to not work on the pole
// - workaround: https://stackoverflow.com/questions/10894377/dynamically-adding-a-svg-gradient


const signSvg = document.querySelector('.stage-two svg');

createGradient(signSvg, 'PoleGradient',[
    // add colour stops here
    {offset:'0', 'stop-color':signpostBg, 'stop-opacity':1},
    {offset:'100%','stop-color':signpostBg, 'stop-opacity':0}
]);

signSvg.setAttribute('fill', 'url(#PoleGradient)');





// this makes the gradient vertical for svg:
// x1="0" x2="0" y1="0" y2="1"

// svg:   the owning <svg> element
// id:    an id="..." attribute for the gradient
// stops: an array of objects with <stop> attributes
function createGradient(svg,id,stops){
    const svgNS = svg.namespaceURI;
    const grad  = document.createElementNS(svgNS,'linearGradient');
    grad.setAttribute('id',id);
    // make gradient vertical:
    grad.setAttribute('x1',0);
    grad.setAttribute('x2',0);
    grad.setAttribute('y1',0);
    grad.setAttribute('y2',1);

    // es6 version
    stops.forEach(function (value) {
        const attributes = value;
        const stops = document.createElementNS(svgNS,'stop');
        // console.log(stops); note: html is added by the below code
        for (const attr in attributes){
            if (attributes.hasOwnProperty(attr))
            stops.setAttribute(attr,attributes[attr]);
        }
        grad.appendChild(stops);

    });

    // apply the gradient:
    const defs = svg.querySelector('defs') ||
    svg.insertBefore( document.createElementNS(svgNS,'defs'), svg.firstChild);
    return defs.appendChild(grad);
}






// ____________________________________________________________________________________
// safari mobile caveat
// https://stackoverflow.com/questions/3007480/determine-if-user-navigated-from-mobile-safari
const userAgent = window.navigator.userAgent;

if (userAgent.match(/iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i)) {
    
    let safariMobMsg = document.createElement('div');
    safariMobMsg.classList.add('safariMobile');
    safariMobMsg.innerHTML = `<div class="container">${safariCaveat}<i class="fa fa-2x fa-times"></i></div>`;
    
    body.appendChild(safariMobMsg);
    
    const removeBtn = document.querySelector('.safariMobile .fa-times');
    safariMobMsg.addEventListener("click", function(e){
        if (e.target == removeBtn) {
            safariMobMsg.style.height = '0px';
        }
    });
}








// ____________________________________________________________________________________
// scrollmagic animations

// execute the following when the document has loaded:
if (window.addEventListener)
    window.addEventListener("load", scrollMagic, false);
else if (window.attachEvent)
    window.attachEvent("onload", scrollMagic);
else window.onload = scrollMagic;



function scrollMagic() {

    // css animated elements
    const miamTicks = Array.from(document.querySelectorAll(".stage-one .tick"));
    const mediationSigns = Array.from(document.querySelectorAll(".stage-two svg > g"));
    const documentElements = Array.from(document.querySelectorAll(".stage-three svg > g.signature, .stage-three svg > g.stamp"));



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
      duration: "2000px", // was 600%
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
      duration: "1000px", // was 200%
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
        transform: "translatex(0px)",
        ease: Power2.easeOut
    })
    // add clipboard
    .fromTo(".stage-one svg", 0.25, {
        transform: "translate(-600px, 500px)"
    },
    {
        transform: "translate(0px)",
        ease: Power2.easeOut
    }, 0.5)

    // add ticks
    // - active getting added to first item immediately, adding delay causes fadein
    .staggerTo(miamTicks, 0.5, {
        className:"+=active",
        ease: Power2.easeOut
    }, 0.5)


    // body colour
    .to("body", 1,  {
        backgroundColor: orangeBg,
        ease: Power1.easeOut
    }, 0) // add at a time of 0 seconds - i.e. at start trigger


    // Create the Scene and trigger when visible
    var miamScene = new ScrollMagic.Scene({
        triggerElement: '.stage-one',
        duration: "2000px", // was 600%
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
    .staggerTo(mediationSigns, 0.5, {
        className:"+=opaque"
    }, 0.5)
    

    // body colour
    .to("body", 1,  {
        backgroundColor: blueBg,
        ease: Power1.easeOut
    }, 0) // add at a time of 0 seconds - i.e. at start trigger


    // Create the Scene and trigger when visible
    var mediationScene = new ScrollMagic.Scene({
        triggerElement: '.stage-two',
        duration: "2000px", // was 600%
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

    // add signatures and stamp
    .staggerTo(documentElements, 0.5, {
        className:"+=active"
    }, 0.5) 

    // body colour
    .to("body", 1,  {
        backgroundColor: redBg,
        ease: Power1.easeOut
    }, 0) // add at a time of 0 seconds - i.e. at start trigger

    // Create the Scene and trigger when visible
    var endScene = new ScrollMagic.Scene({
        triggerElement: '.stage-three',
        duration: "2000px", // was 600%
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
        duration: "2000px", // How many pixels to scroll / animate
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





    
  };