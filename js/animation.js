

var titleH1 = animationSettings.headingH1,
     titleP = animationSettings.headingP,
      overP = animationSettings.paraOverview,
       whyP = animationSettings.paraWhy,
   stagesH2 = animationSettings.headingStages,
         p1 = animationSettings.paraOne,
         p2 = animationSettings.paraTwo,
         p3 = animationSettings.paraThree;

         
         
// add all the content
$('.title h1').html(titleH1);
$('.title p').html(titleP);

$('.overview p').html(overP);

$('.stages-title h2').html(stagesH2);

$('.stage-one p').html(p1);
$('.stage-two p').html(p2);
$('.stage-three p').html(p3);





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