// looping config vars
var _totalLoops = 0;
var _endFrameDelay = 4;

// content
var container = getById("container");
var loadingContent = getById("loading_content");

// exit
var exitBtn = getById("exit_btn");
var _exitURL = "https://www.hogarth.com";

// Create and provide timeline to Hoxton
var Creative = {

    tl: gsap.timeline({ defaults: { ease: "none" } }),

    setExitURL: function(strURL) {
        _exitURL = strURL;
    },

    onExit: function(e) {
        hoxton.exit("Exit");
    },

    onBannerStart: function() {
        // console.log("Creative.onBannerStart()");
    },

    onBannerComplete: function() {
        // console.log("Creative.onBannerComplete()");
    },

    jumpToEndFrame: function() {
        Creative.tl.pause();
        Creative.tl.seek("end", false);
    },

    checkIsBackup: function() {
        return (window.location.href.indexOf('hoxtonBackup') >= 0) ? true : false;
    },

    startAd: function() {
        Creative.createButtons();
        Creative.displayBanner();
        Creative.setUpTimeline();

        Creative.init();
        Creative.checkIsBackup() ? Creative.jumpToEndFrame() : null;
    },

    createButtons: function() {
        exitBtn.addEventListener("click", Creative.onExit, false);
    },

    setUpTimeline: function() {
        Creative.tl.repeat(_totalLoops);
        Creative.tl.repeatDelay(_endFrameDelay);
        Creative.tl.eventCallback("onStart", Creative.onBannerStart);
        Creative.tl.eventCallback("onComplete", Creative.onBannerComplete);
    },

    displayBanner: function() {
        loadingContent.style.display = "none";
        container.style.display = "block";
    },

    init: function() {
        var bannerWidth = getById("container").offsetWidth;
        var bannerHeight = getById("container").offsetHeight;
        _dynamicData = hoxton.getState();
        Creative.updateChanges(_dynamicData);
        
        splitChar(_dynamicData.frame1Copy);
        splitCharCopy2(_dynamicData.frame2Copy);
        splitCharCopy3(_dynamicData.frame3Copy);
        
        //970x250 Animation
        if(bannerWidth == 970 && bannerHeight == 250){
        Creative.tl.addLabel("Frame1", "<")
        .to("#container", { duration: 0, opacity: 1 }, "Frame1")
        //frame 1 in
        .from(modelImg1Container, {duration: 1.5, x: bannerWidth, ease: Power1.easeOut }, "Frame1")
        .to(modelImg1Gradient, {duration: 1.5, backgroundImage: "linear-gradient(to left, rgba(255, 0, 0, 0), rgb(0 0 0 / 0%))", ease: Power1.easeOut }, "Frame1+=0.5")
        .to(modelImg1Container, {duration: 0, right: "auto", ease: Power1.easeOut }, "Frame1+=1.5")
        .to(modelImg1Container, {duration: 1, width: "50%", ease: Power1.easeOut }, "Frame1+=2")
        .to(modelImg1, {duration: 1, top: 7, width: "498px", left: -7, ease: Power1.easeOut }, "Frame1+=2")
        .from([frame1CopyContainer, frame2CopyContainer], {duration: 1, x: bannerWidth/2, ease: Power1.easeOut }, "Frame1+=2")
        .to([frame1CopyContainer, frame2CopyContainer], {duration: 1, opacity: 1, ease: Power1.easeOut }, "Frame1+=2.5")

        for (var i = 0; i < _dynamicData.frame1Copy.split("<br>").length; i++) {
            var lineParent = "#copy1line" + (i + 1) + "parent";
            var lineSpans = lineParent + " span";
            Creative.tl.from(lineParent, {duration: 1, opacity: 0, ease: Power1.easeOut }, "Frame1")
            .from(lineSpans, { duration: 0.8, opacity: 0, x: 200, letterSpacing: "15px", filter: "blur(20px)", stagger: 0.05, ease: Power1.easeOut }, "Frame1+=2");
        }

        Creative.tl.addLabel("Frame2", ">2")
            //frame 1 out
            .to([modelImg1Container], {duration: 2.6, x: -bannerWidth/1, ease: Power1.easeOut }, "Frame2")
            .to([modelImg2Container], {duration: 0.5, opacity: 1, ease: Power1.easeOut }, "Frame2-=0.5")
            
            //frame 2 in
            .from([modelImg2Container], {duration: 1, x: bannerWidth/2, ease: Power1.easeOut }, "Frame2")
            .to("#frame1CopyContainer span", { duration: 0.2, opacity: 1, y: -120, stagger: 0.05, ease: Power1.easeOut }, "Frame2")

            .from("#frame2CopyContainer span", { duration: 0.2, opacity: 1, y: 120, stagger: 0.05, ease: Power1.easeOut }, "Frame2+=0.5")

        Creative.tl.addLabel("Frame3", ">2")
            //frame 2 out
            .to("#frame2CopyContainer", { duration: 0.2, opacity: 0, y: -120, stagger: 0.05, ease: Power1.easeOut }, "Frame3")
            
        //frame 3 in
            // .to(frame3CopyContainer, { duration: 0.5, width: "50%", background: "#000000", ease: Power1.easeOut }, "Frame3")
            // .to([modelImg2], {duration: 0.5, scale: 0.45, x: -405, y: -61, ease: Power1.easeOut }, "Frame3")
            // .to([modelImg1Container], {duration: 0.5, x: -bannerWidth/2, ease: Power1.easeOut }, "Frame3")
            // .from(logoTopBg, {duration: 1, x: -bannerWidth/2, ease: Power1.easeOut }, "Frame3")
            // .to(logoTopBgGradient, {duration: 1, backgroundImage: "linear-gradient(to left, rgba(255, 0, 0, 0), rgb(0 0 0 / 0%))", ease: Power1.easeOut }, "Frame3+=0.2")
            .from(logoTop, {duration: 1, y: bannerHeight/4, opacity:0, ease: Power1.easeOut }, "Frame3+=0.3")
            // .from(logoBottomBg, {duration: 1, x: bannerWidth/2, y: bannerWidth/2, ease: Power1.easeOut }, "Frame3+=0.3")
            .from(logoBottom, {duration: 1, x: bannerWidth/2, y: bannerWidth/2, ease: Power1.easeOut }, "Frame3+=0.3")
            .to(logoBottomBgGradient, {duration: 1, backgroundImage: "linear-gradient(to right, rgba(255, 0, 0, 0), rgb(0 0 0 / 0%))", ease: Power1.easeOut }, "Frame3+=0.5")
            .from("#frame3CopyContainer span", { duration: 0.5, opacity: 0, y: 120, stagger: 0.05, ease: Power1.easeOut }, "Frame3+=1.5")
            .from("#legal", { duration: 0.5, opacity: 0,   ease: Power1.easeOut }, ">")
        }
        //300x250 Animation
        else if(bannerWidth == 300 && bannerHeight == 250){
            Creative.tl.addLabel("Frame1", "<")
        .to("#container", { duration: 0, opacity: 1 }, "Frame1")
        //frame 1 in
        .from(modelImg1Container, {duration: 1.5, x: bannerWidth, ease: Power1.easeOut, rotate:0.01 }, "Frame1")
        .to(modelImg1Gradient, {duration: 1.5, backgroundImage: "linear-gradient(to left, rgba(255, 0, 0, 0), rgb(0 0 0 / 0%))", ease: Power1.easeOut }, "Frame1+=0.5")
        .to(modelImg1Container, {duration: 0, right: "auto", ease: Power1.easeOut }, "Frame1+=1.5")
        .to(modelImg1Container, {duration: 1, height: "73%", border: "unset", ease: Power1.easeOut }, "Frame1+=2")
        .to(modelImg1, {duration: 1, scale: 1, x: 0, y: -6, ease: Power1.easeOut, rotate:0.01}, "Frame1+=2")
        .from([frame1CopyContainer, frame2CopyContainer], {duration: 1, y: bannerWidth/2, ease: Power1.easeOut }, "Frame1+=2")
        .to([frame1CopyContainer, frame2CopyContainer], {duration: 1, opacity: 1, ease: Power1.easeOut }, "Frame1+=2.5")

        for (var i = 0; i < _dynamicData.frame1Copy.split("<br>").length; i++) {
            var lineParent = "#copy1line" + (i + 1) + "parent";
            var lineSpans = lineParent + " span";
            Creative.tl.from(lineParent, {duration: 1, opacity: 0, ease: Power1.easeOut }, "Frame1")
            .from(lineSpans, { duration: 0.8, opacity: 0, x: 200, letterSpacing: "15px", filter: "blur(20px)", stagger: 0.05, ease: Power1.easeOut }, "Frame1+=2");
        }

        Creative.tl.addLabel("Frame2", ">2")
            //frame 1 out
            .to([modelImg1Container], {duration: 1, y: -bannerHeight, ease: Power1.easeOut }, "Frame2")
            .to([modelImg2Container], {duration: 0.5, opacity: 1, ease: Power1.easeOut }, "Frame2")
            
            //frame 2 in
            .from([modelImg2Container], {duration: 1, y: bannerWidth, ease: Power1.easeOut }, "Frame2")
            .to("#frame1CopyContainer span", { duration: 0.2, opacity: 1, y: -80, stagger: 0.05, ease: Power1.easeOut }, "Frame2")

            .from("#frame2CopyContainer span", { duration: 0.2, opacity: 1, y: 80, stagger: 0.05, ease: Power1.easeOut }, "Frame2+=0.5")

        Creative.tl.addLabel("Frame3", ">2")
            //frame 2 out
            .to("#frame2CopyContainer", { duration: 0.2, opacity: 0, y: -80, stagger: 0.05, ease: Power1.easeOut }, "Frame3")
            
        //frame 3 in
            .to("#frame1CopyContainer", { duration: 0, opacity: 0, ease: Power1.easeOut }, "Frame3")
            .to(frame3CopyContainer, { duration: 0.5, width: "100%", background: "#000000", ease: Power1.easeOut }, "Frame3")
            .to([modelImg2], {duration: 0.5, scale: 1.73, x: 43, y: 19, ease: Power1.easeOut }, "Frame3")
            // .to([modelImg2], {duration: 0.5, scale: 1.2, x: -48, y: 24, ease: Power1.easeOut }, "Frame3")
            .to([modelImg1Container], {duration: 0.5, y: -bannerWidth, ease: Power1.easeOut }, "Frame3")
            .from(logoTopBg, {duration: 1, x: -bannerWidth, ease: Power1.easeOut }, "Frame3")
            .to(logoTopBgGradient, {duration: 1, backgroundImage: "linear-gradient(to left, rgba(255, 0, 0, 0), rgb(0 0 0 / 0%))", ease: Power1.easeOut }, "Frame3+=0.2")
            .from(logoTop, {duration: 1, x: -bannerWidth, ease: Power1.easeOut }, "Frame3+=0.3")
            .from(logoBottomBg, {duration: 1, x: bannerWidth/2, y: bannerWidth/2, ease: Power1.easeOut }, "Frame3+=0.3")
            .from(logoBottom, {duration: 1, x: bannerWidth/2, y: bannerWidth/2, ease: Power1.easeOut }, "Frame3+=0.3")
            .to(logoBottomBgGradient, {duration: 1, backgroundImage: "linear-gradient(to right, rgba(255, 0, 0, 0), rgb(0 0 0 / 0%))", ease: Power1.easeOut }, "Frame3+=0.5")
            .from("#frame3CopyContainer span", { duration: 0.5, opacity: 0, y: 120, stagger: 0.05, ease: Power1.easeOut }, "Frame3+=2")
            .from("#legal", { duration: 0.5, opacity: 0,   ease: Power1.easeOut }, ">")
    } 
    //320x50 Animation
    else if(bannerWidth == 320 && bannerHeight == 50){
        Creative.tl.addLabel("Frame1", "<")
        .to("#container", { duration: 0, opacity: 1 }, "Frame1")
        //frame 1 in
        .from(modelImg1Container, {duration: 1.5, x: bannerWidth, ease: Power1.easeOut }, "Frame1")
        .to(modelImg1Gradient, {duration: 1.5, backgroundImage: "linear-gradient(to left, rgba(255, 0, 0, 0), rgb(0 0 0 / 0%))", ease: Power1.easeOut }, "Frame1+=0.5")
        .to(modelImg1Container, {duration: 0, right: "auto", ease: Power1.easeOut }, "Frame1+=1.5")
        .to(modelImg1Container, {duration: 1, width: "33%", ease: Power1.easeOut }, "Frame1+=2")
        .to(modelImg1, {duration: 1, y: -23, x:-1, ease: Power1.easeOut, rotate:0.01 }, "Frame1+=2")
        .from([frame1CopyContainer, frame2CopyContainer], {duration: 1, x: bannerWidth, ease: Power1.easeOut }, "Frame1+=2")
        .to([frame1CopyContainer, frame2CopyContainer], {duration: 1, opacity: 1, ease: Power1.easeOut }, "Frame1+=2.5")

        for (var i = 0; i < _dynamicData.frame1Copy.split("<br>").length; i++) {
            var lineParent = "#copy1line" + (i + 1) + "parent";
            var lineSpans = lineParent + " span";
            Creative.tl.from(lineParent, {duration: 1, opacity: 0, ease: Power1.easeOut }, "Frame1")
            .from(lineSpans, { duration: 0.8, opacity: 0, x: 200, letterSpacing: "15px", filter: "blur(20px)", stagger: 0.05, ease: Power1.easeOut }, "Frame1+=2");
        }

        Creative.tl.addLabel("Frame2", ">2")
            //frame 1 out
            .to([modelImg1Container], {duration: 2.6, x: -bannerWidth, ease: Power1.easeOut }, "Frame2")
            .to([modelImg2Container], {duration: 0.5, opacity: 1, ease: Power1.easeOut }, "Frame2-=0.5")
            
            //frame 2 in
            .from([modelImg2Container], {duration: 1, x: bannerWidth/2, ease: Power1.easeOut }, "Frame2")
            .to("#frame1CopyContainer span", { duration: 0.2, opacity: 1, y: -120, stagger: 0.05, ease: Power1.easeOut }, "Frame2")

            .from("#frame2CopyContainer span", { duration: 0.2, opacity: 1, y: 120, stagger: 0.05, ease: Power1.easeOut }, "Frame2+=0.5")

        Creative.tl.addLabel("Frame3", ">2")
            //frame 2 out
            .to("#frame2CopyContainer", { duration: 0.2, opacity: 0, y: -120, stagger: 0.05, ease: Power1.easeOut }, "Frame3")
            
        //frame 3 in
            .to(frame3CopyContainer, { duration: 0.5, width: "50%", background: "#000000", ease: Power1.easeOut }, "Frame3")
            .to([modelImg2], {duration: 0.5, scale: 0.5, x: -114, y: -5, ease: Power1.easeOut }, "Frame3")
            .to([modelImg1Container], {duration: 0.5, x: -bannerWidth/2, ease: Power1.easeOut }, "Frame3")
            .from(logoTopBg, {duration: 1, x: -bannerWidth/2, ease: Power1.easeOut }, "Frame3")
            .to(logoTopBgGradient, {duration: 1, backgroundImage: "linear-gradient(to left, rgba(255, 0, 0, 0), rgb(0 0 0 / 0%))", ease: Power1.easeOut }, "Frame3+=0.2")
            .from(logoTop, {duration: 1, y: bannerWidth/8, opacity:0, ease: Power1.easeOut }, "Frame3+=0.3")
            .from(logoBottomBg, {duration: 1, x: bannerWidth/2, y: bannerWidth/2, ease: Power1.easeOut }, "Frame3+=0.3")
            .from(logoBottom, {duration: 1, x: bannerWidth/2, y: bannerWidth/2, ease: Power1.easeOut }, "Frame3+=0.3")
            .to(logoBottomBgGradient, {duration: 1, backgroundImage: "linear-gradient(to right, rgba(255, 0, 0, 0), rgb(0 0 0 / 0%))", ease: Power1.easeOut }, "Frame3+=0.5")
            .from("#frame3CopyContainer span", { duration: 0.5, opacity: 0, y: 120, stagger: 0.05, ease: Power1.easeOut }, "Frame3+=1.5")
            .from("#legal", { duration: 0.5, opacity: 0,   ease: Power1.easeOut }, ">")
        }

        //160x600 Animation
        else if(bannerWidth == 160 && bannerHeight == 600){
            Creative.tl.addLabel("Frame1", "<")
        .to("#container", { duration: 0, opacity: 1 }, "Frame1")
        //frame 1 in
        .from(modelImg1Container, {duration: 1.5, x: bannerWidth, ease: Power1.easeOut, rotate:0.01 }, "Frame1")
        .to(modelImg1Gradient, {duration: 1.5, backgroundImage: "linear-gradient(to left, rgba(255, 0, 0, 0), rgb(0 0 0 / 0%))", ease: Power1.easeOut }, "Frame1+=0.5")
        .to(modelImg1Container, {duration: 0, right: "auto", ease: Power1.easeOut }, "Frame1+=1.5")
        .to(modelImg1Container, {duration: 1, height: "73%", border: "unset", ease: Power1.easeOut }, "Frame1+=2")
        .to(modelImg1, {duration: 1, scale: 0.88, x: 26, y: -46, ease: Power1.easeOut, rotate:0.01}, "Frame1+=2")
        .from([frame1CopyContainer, frame2CopyContainer], {duration: 1, y: bannerHeight/2, ease: Power1.easeOut }, "Frame1+=2")
        .to([frame1CopyContainer, frame2CopyContainer], {duration: 1, opacity: 1, ease: Power1.easeOut }, "Frame1+=2.5")

        for (var i = 0; i < _dynamicData.frame1Copy.split("<br>").length; i++) {
            var lineParent = "#copy1line" + (i + 1) + "parent";
            var lineSpans = lineParent + " span";
            Creative.tl.from(lineParent, {duration: 1, opacity: 0, ease: Power1.easeOut }, "Frame1")
            .from(lineSpans, { duration: 0.8, opacity: 0, x: 200, letterSpacing: "15px", filter: "blur(20px)", stagger: 0.05, ease: Power1.easeOut }, "Frame1+=2");
        }

        Creative.tl.addLabel("Frame2", ">2")
            //frame 1 out
            .to([modelImg1Container], {duration: 1, y: -bannerHeight, ease: Power1.easeOut }, "Frame2")
            .to([modelImg2Container], {duration: 0.5, opacity: 1, ease: Power1.easeOut }, "Frame2")
            
            //frame 2 in
            .from([modelImg2Container], {duration: 1, y: bannerWidth, ease: Power1.easeOut }, "Frame2")
            .to("#frame1CopyContainer span", { duration: 0.2, opacity: 1, y: -80, stagger: 0.05, ease: Power1.easeOut }, "Frame2")

            .from("#frame2CopyContainer span", { duration: 0.2, opacity: 1, y: 80, stagger: 0.05, ease: Power1.easeOut }, "Frame2+=0.5")

        Creative.tl.addLabel("Frame3", ">2")
            //frame 2 out
            .to("#frame2CopyContainer", { duration: 0.2, opacity: 0, y: -80, stagger: 0.05, ease: Power1.easeOut }, "Frame3")
            
        //frame 3 in
            .to("#frame1CopyContainer", { duration: 0, opacity: 0, ease: Power1.easeOut }, "Frame3")
            .to(frame3CopyContainer, { duration: 0.5, width: "100%", background: "#000000", ease: Power1.easeOut }, "Frame3")
            .to([modelImg2], {duration: 0.5, scale: 0.66, x: 39, y: -106, ease: Power1.easeOut }, "Frame3")
            // .to([modelImg2], {duration: 0.5, scale: 1.2, x: -48, y: 24, ease: Power1.easeOut }, "Frame3")
            .to([modelImg1Container], {duration: 0.5, y: -bannerHeight/1.5, ease: Power1.easeOut }, "Frame3")
            .from(logoTopBg, {duration: 1, x: -bannerWidth, ease: Power1.easeOut }, "Frame3")
            .to(logoTopBgGradient, {duration: 1, backgroundImage: "linear-gradient(to left, rgba(255, 0, 0, 0), rgb(0 0 0 / 0%))", ease: Power1.easeOut }, "Frame3+=0.2")
            .from(logoTop, {duration: 1, x: -bannerWidth, ease: Power1.easeOut }, "Frame3+=0.3")
            .from(logoBottomBg, {duration: 1, x: bannerWidth/1.2, y: bannerWidth/2, ease: Power1.easeOut }, "Frame3+=0.3")
            .from(logoBottom, {duration: 1, x: bannerWidth/1.2, y: bannerWidth/2, ease: Power1.easeOut }, "Frame3+=0.3")
            .to(logoBottomBgGradient, {duration: 1, backgroundImage: "linear-gradient(to right, rgba(255, 0, 0, 0), rgb(0 0 0 / 0%))", ease: Power1.easeOut }, "Frame3+=0.5")
            .from("#frame3CopyContainer span", { duration: 0.5, opacity: 0, y: 120, stagger: 0.05, ease: Power1.easeOut }, "Frame3+=2")
            .from("#legal", { duration: 0.5, opacity: 0,   ease: Power1.easeOut }, ">")
    } 
        Creative.tl.addLabel("end");
    },

    updateChanges: function(_dynamicData) {
    }
};


function getById(eleID) {
    return document.getElementById(eleID);
}

function splitChar(copy) {
    var copy = copy.split("<br>");
    // console.log(copy);
    
    for (var i = 0; i < copy.length; i++) {
        const lineDiv = document.createElement("div");
        lineDiv.id = "copy1line" + (i + 1) + "parent";
        lineDiv.className = "copy1";
        // console.log(lineDiv)

        lineDiv.innerHTML = copy[i].split("").map(char => 
            `<span class="copyline${i + 1}">${char === " " ? "&nbsp;" : char}</span>`
        ).join("");

        getById("frame1CopyContainer").appendChild(lineDiv);
    }
}

function splitCharCopy2(copy) {
    var copy = copy.split("<br>");
    // console.log(copy);

    for (var i = 0; i < copy.length; i++) {
        const lineDiv = document.createElement("div");
        lineDiv.id = "copy2line" + (i + 1) + "parent";
        lineDiv.className = "copy2";
        // console.log(lineDiv)

        lineDiv.innerHTML = copy[i].split("").map(char => 
            `<span class="copyline${i + 1}">${char === " " ? "&nbsp;" : char}</span>`
        ).join("");

        getById("frame2CopyContainer").appendChild(lineDiv);
    }
}

function splitCharCopy3(elem) {
    function getById(id) {
        return document.getElementById(id);
      }
 
      const span = getById("frame3Copy").querySelector("span");
    
      const words = span.innerHTML.trim().split(" ");

      span.innerHTML = "";

      words.forEach(word => {
        const wordSpan = document.createElement("span");
        wordSpan.textContent = "" + word.trim() + ""; 
        // console.log(wordSpan);
        span.appendChild(wordSpan);
        
      });

    //   console.log(span)
}


function splitText(elem) {
    const lineDiv = document.createElement("div");
    lineDiv.id = "copy3line" + (i + 1) + "parent";
    lineDiv.className = "copy3";

    var words = elem.split("<br>");
    words = words.slice(1, words.length);
   
    lineDiv.innerHTML = "<span>" + String(words).split(",").join("</span><br><span>") + "</span>";
    getById("frame3CopyContainer").appendChild(lineDiv);
}

//728x90, 320x50
function splitTextHorSizes(elem) {
    var headlineTxt = "<span>" + String(elem).split("<br>").join("</span><br><span>") + "</span>";
    getById("frame1Copy").innerHTML = headlineTxt;
}

function splitCharCopy2HorSizes(elem, f2subcopy) {
    // var word = elem.split("<br>")[0]
    var frame1CopyWord1 = "<span>" + String(elem).split("").map(function(x){ return x.replace(/ /g,"&nbsp") }).join("</span><span>") + "</span>";
    getById("frame2Copy").innerHTML = frame1CopyWord1 + "<spans>" + " " + "</spans>";

    getById("frame2Copy").lastChild.innerHTML = f2subcopy;
}