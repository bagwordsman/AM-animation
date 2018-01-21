

var titleH1 = animationSettings.headingH1,
     titleP = animationSettings.headingP,
      overP = animationSettings.paraOverview,
       whyP = animationSettings.paraWhy,
   stagesH2 = animationSettings.headingStages,
  stageOneP = animationSettings.paraOne,
  stageTwoP = animationSettings.paraTwo,
stageThreeP = animationSettings.paraThree;

         
         
// add all the content
$('.title h1').html(titleH1);
$('.title p').html(titleP);

$('.overview p').html(overP);

$('.stages-title h2').html(stagesH2);

$('.stage-one p').html(stageOneP);
$('.stage-two p').html(stageTwoP);
$('.stage-three p').html(stageThreeP);





// ____________________________
// do the animations
// - can do some with pure css


// titles
// setTimeout(function(){
//     $('#speech').addClass('active');
// }, 2000);

// setTimeout(function(){
//     $('#house').addClass('active');
// }, 2500);






// ____________________________
// scrollmagic

// 1 - title
$(function() {
    
    
    
    // ___________
    // title
    // - trying to get it to fadeout

    // var titleController = new ScrollMagic.Controller();
    
    // var tween0 = TweenMax.to('.title', 0.5, {
    //   opacity: '0'
    // });
    
    // // Create the Scene and trigger when visible
    // var scene0 = new ScrollMagic.Scene({
    //   triggerElement: '.title h1',
    //   duration: 200, // How many pixels to scroll / animate
    //   triggerHook: 0
    // })
    // .setTween(tween0)
    // .setPin(".title", {pushFollowers: false})
    // .addTo(titleController);
    
    // // Add debug indicators fixed on right side
    // scene0.addIndicators();
    
    
    
    
    
    
    
    
    
    
    
    
    
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

    // heading 
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
    miamTween.fromTo(".stage-one svg", 0.5, {
        transform: "translate(-500px, 500px)"
    },
    {
        transform: "translate(0px)", ease: Power2.easeOut
    }, 0.5)

    // add ticks
    // - active getting added to first item immediately, adding delay causes fadein
    // - empty item hack added
    miamTween.staggerTo(["", ".stage-one .tick.one", ".stage-one .tick.two", ".stage-one .tick.three"], 0, 
    {
        className:"+=active"
    }, 0.35)
    
    
    // - - - - 
    // body colour
    .to("body", 1,  {
        backgroundColor: "rgb(249, 203, 174)", ease: Power1.easeOut
    }, 0) // add at a time of 0 seconds - i.e. at start trigger


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