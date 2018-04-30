<!DOCTYPE html>
<html lang="en">
<head>
    <title>Mediation Process Animation</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- favicons -->
    <link rel="Shortcut Icon" type="image/x-icon" href="img/able-favicon.ico">
    <link rel="apple-touch-icon" sizes="" href="img/able-apple-touch-icon.png">

    <!-- css -->
    <link type="text/css" href="css/animation.css" media="all" rel="stylesheet">

    <!-- fonts -->
    <link href="https://fonts.googleapis.com/css?family=Asap:400,400i,700,700i" rel="stylesheet">

    <!-- scrollmagic -->
    <script src="js/lib/TweenMax.min.js"></script>
	<script src="js/lib//ScrollMagic.js"></script>
	<script src="js/lib//plugins/animation.gsap.js"></script>
	<script src="js/lib//plugins/debug.addIndicators.js"></script>



</head>
<body>

    <?php
    $puzzle = 'svg/puzzle.svg';
    $clipboard = 'svg/clipboard.svg';
    $signpost = 'svg/signpost.svg';
    $document = 'svg/document.svg';
    ?>

    
    
    <div class="header">
        <div class="container">
            <a href="#" class="logo">
                <img src="img/AM-mini-logo.png" alt="able mediation">
                <h3><span>Able</span> Mediation</h3>
            </a>
            <ul class="share">
                <li>share</li>
                <li>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=http%3A//what-is.ablemediation.com/" target="_blank" class="facebook">
                        <i class="fa fa-facebook" aria-hidden="true"></i>
                        <span class="hidden">Share on Facebook</span>
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/home?status=http%3A//what-is.ablemediation.com/" target="_blank" class="twitter">
                        <i class="fa fa-twitter" aria-hidden="true"></i>
                        <span class="hidden">Share on Twitter</span>
                    </a>
                </li>
                <li>
                    <a href="https://plus.google.com/share?url=http%3A//what-is.ablemediation.com/" target="_blank" class="google">
                        <i class="fa fa-google-plus" aria-hidden="true"></i>
                        <span class="hidden">Share on Google Plus</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>


    
    
    <div class="animation">

        
        <!-- title -->
        <div class="title">
            <div class="container middle center">
                <h1></h1>
                <h3></h3>
                <div class="scroll-down">
                    <i class="fa fa-chevron-down" aria-hidden="true"></i>
                    <span>Scroll Down</span>
                </div>
            </div>
        </div><!-- end title -->


        
        <!-- overview -->
        <div class="overview">
            <div class="container">
                <div class="six columns paragraph green">
                    <p></p>
                </div>
            </div>
            <div class="graphic right-graphic">
                <?php
                // puzzle svg
                include $puzzle;
                ?>
            </div>
        </div>



        <!-- stages title -->
        <div class="stages-title">
            <div class="container middle center">
                <h3></h3>
            </div>
        </div>


        
        <!-- stage one: MIAM -->
        <div class="stage-one">
            <div class="container right">
                <div class="six columns paragraph orange">
                    <h3>Stage One</h3>
                    <p></p>
                </div>
            </div>
            <div class="graphic left-graphic">
                <?php
                // clipboard svg
                include $clipboard;
                ?>
            </div>
        </div>
    
    

        <!-- stage two: Mediation Sessions -->
        <div class="stage-two"> 
            <div class="container left">
                <div class="six columns paragraph blue">
                    <h3>Stage Two</h3>
                    <p></p>
                </div>
            </div>
            <div class="graphic right-graphic">
                <?php
                // signpost svg
                include $signpost;
                ?>
            </div>
        </div>


    
        <!-- stage three: End of Mediation -->
        <div class="stage-three">
            <div class="container right">
                <div class="six columns paragraph red">
                    <h3>Stage Three</h3>
                    <p></p>
                </div>
                <div class="graphic left-graphic">
                    <?php
                    // document svg
                    include $document;
                    ?>
                </div>
            </div>
        </div>


        
        <!-- end cta -->
        <div class="end-cta">
            <div class="container middle center">
                <!-- <div> -->
                <h2></h2>
                <h3></h3>
                <div class="scroll-down">
                    <i class="fa fa-chevron-down" aria-hidden="true"></i>
                </div>
                <a href="" class="button" target="_blank" data-small="" data-big=""></a>
                <!-- </div> -->
            </div>
        </div>


    </div>


    <!--  load scripts after page html  -->
    <script src="js/animationSettings.js"></script>
    

    <!-- new scripts (broken up with es6 refactor) -->
    <script src="js/header.js"></script>
    <script src="js/addContent.js"></script>



    <script src="js/animation.js"></script>


</body>
</html>