// JavaScript Document
var ifOnHox = true;

gsap.registerPlugin(DrawSVGPlugin, SplitText); // Register plugins

// Create and provide timeline to Hoxton
var Creative = {};
Creative.tl = gsap.timeline({defaults: {duration:0, ease:"none"}});
var ctaTL = gsap.timeline({paused:true});

// Config vars
var maincopyColor;
var subcopyColor;
var ctacopyColor;
var ctaborderColor;


var _currentLoop = 0,
    _totalLoops = 1,
    _endFrameDelay = 3,
    _useReplayBtn = false,
    _copySpeed = 0.65,
    _copyEase = "expo.out",
    _frameWait = 1.25,
    _frameWaitImage = 0,
    _noVideo = true,
    _videoLength = 0;

// DOM elements
var container = getById("container");
var loadingContent = getById("loading_content");
var background = getById("background");
var arch = getById("arch");
var ctaContainer = getById("cta-position");
var copyHolder = getById("mainCopy");
var subCopy = getById("sub-copy");
var exitBtn = getById("exit_btn");

function getById(eleID) {
    return document.getElementById(eleID);
}

/* Function called when banner and its data/images have initially loaded.
 * Builds timeline and adds necessary listeners.
 */
function startAd() {
    exitBtn.addEventListener("click", exitBtn_clickHandler, false);

    // Hide loading content and initialize animation
    loadingContent.style.display = "none";

    // Set up CTA animation
    ctaTL.to([ctaContainer], 0.3, {y: "-=10", ease: "power2.inOut"}, 0)
         .to([ctaContainer], 0.75, {y: 0, ease: "bounce.out"}, ">.1");

    // Set up timeline
    Creative.tl.repeat(_totalLoops);
    Creative.tl.repeatDelay(_endFrameDelay);
    Creative.tl.eventCallback("onComplete", onBannerComplete);
    Creative.tl.eventCallback("onStart", onBannerStart);
    Creative.tl.eventCallback("onRepeat", onBannerRepeat);

    Creative.init();
    if (Creative.checkIsBackup()) {
        Creative.jumpToEndFrame();
    }
}

/* Backup generation */
Creative.jumpToEndFrame = function() {
    Creative.init();
    Creative.tl.duration(0);
};

Creative.checkIsBackup = function() {
    return (window.location.href.indexOf('hoxtonBackup') >= 0) ? true : false;
};

// Creative.init Function with SplitText Animation
Creative.init = function() {
    
    // var headlineSplit = new SplitText("#mainCopy", { type: "lines",reduceWhiteSpace:false, linesClass:"lines line++"});
    // var lines = headlineSplit.lines;
    updateElements(_dynamicData);
    Creative.tl
        .addLabel("reset", 0.01)
       
        .set([copyHolder], { opacity: 1, autoAlpha: 1 }, "reset")
        .set(".subcopycolor", {color: subcopyColor}, "reset")
        .set(".ctacopycolor", {color: ctacopyColor}, "reset")
        .set(".bordercolor", {"border-color": ctaborderColor}, "reset")
        .addLabel("frame1", ">")
        .from(".mainCopy", 0.4, {opacity:0, stagger:0.3, scale:1.2, y:-15, ease:"power0.Inout"}, "frame1")
        .fromTo(logo, 0.8, { y: "14%" }, { y: "0%", autoAlpha: 1,ease:"power2.out" }, "frame1")
        .fromTo(logo, 0.3, { webkitFilter: "blur(0.7%)" }, { webkitFilter: "blur(0px)" }, "frame1")
        .fromTo(arch, 0.6, { y: 0, scale: 0.3, webkitFilter: "blur(0.4%)" }, { y: 0, scale: 1, webkitFilter: "blur(0px)", autoAlpha: 1,ease:"power2.out"}, "<0.2")
        .to(subCopy, .8, { autoAlpha: 1 }, "+=0")
        .to([cta, ctaContainer], .8, { autoAlpha: 1}, "<0.4")
        .call(function() {
            ctaTL.seek(0).play();
        }, [], "+=0");

    Creative.tl.addLabel("end",">");

    console.log(maincopyColor);
};

// Exit button handler
function exitBtn_clickHandler() {
    hoxton.exit("Exit");
}

// Banner event handlers
function onBannerStart() {
    exitBtn.removeEventListener("mouseover", hoverBanner, false);
}

function onBannerRepeat() {
    _currentLoop++;
}

function onBannerComplete() {
    exitBtn.addEventListener("mouseover", hoverBanner, false);
}

function hoverBanner() {
    if (!Creative.tl.isActive() && !ctaTL.isActive()) {
        ctaTL.seek(0).play();
    }
}

function updateElements(_dynamicData){
    let checkbackground = getById('background').src.includes('noimage') || getById('background').src.includes('noImage');
    document.getElementById("container").classList.remove("gradiant");
    if(checkbackground){
        document.getElementById("container").classList.add("gradiant");
    }

    
    var splitText = _dynamicData.mainCopy.split("<br>");
    console.log(splitText,"++++++++")
    var splitcopy="";
    var mainCopy="";
    splitText.forEach((element,i) =>{
        splitcopy+='<div id="line'+i+'" class="lines line'+i+'">'+element+'</div>'
    });
    splitText.forEach((element,i) =>{
        mainCopy+='<div id="mainCopy'+i+'" class="mainCopy-holder mainCopy maincopycolor abs">'+splitcopy+'</div>'
    });
    console.log(splitcopy,"------------")
    
    getById('mainCopyContainer').innerHTML=mainCopy;
    
}