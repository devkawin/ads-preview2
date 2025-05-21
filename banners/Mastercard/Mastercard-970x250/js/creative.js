
// looping config vars
var _totalLoops     = 0;
var _endFrameDelay  = 4;
let _currTime = 0;

// content
var container = getById("container");
var loadingContent = getById("loading_content");

// copy
var copyHeadline = getById("headline1");
var copyHeadline1 = getById("headline2");
var copySubline = getById("subHeadline");

// images
var _csImgLoader;
var background = getById("background");

// end frame
var endFrame = getById("endframe");
var imgEndFrame = getById("img_endframe_pattern");
var circleEndFrame= getById("circle_endframe");

// logos
var logoProduct = getById("logo_product");


// exit
var exitBtn = getById("exit_btn");
var _exitURL = "https://www.hogarth.com";

// Create and provide timeline to Hoxton
var Creative = {

    tl: gsap.timeline({defaults: {ease:"none"}}),


    setExitURL: function( strURL )
    {
        _exitURL = strURL;
    },

    onExit: function( e ) 
    {
        hoxton.exit( "Exit" );
    },

    onBannerStart: function() 
    {
        console.log("Creative.onBannerStart()");
    },

    onBannerComplete: function() 
    {
        console.log("Creative.onBannerComplete()");
    },

    jumpToEndFrame: function() 
    {
        Creative.tl.pause();
        Creative.tl.seek( "end", false);
    },

    checkIsBackup: function() 
    {
        return ( window.location.href.indexOf( 'hoxtonBackup' ) >= 0 ) ? true : false;
    },

    startAd: function() 
    {
        console.log("startAd() ");

        Creative.createButtons();
        Creative.displayBanner();
        Creative.setUpTimeline();

        resetAd();

        Creative.init();
        
        Creative.tl.seek(_currTime, false);

        // Creative.checkIsBackup() ? Creative.jumpToEndFrame() : null;
        //Creative.checkIsBackup() ? Creative.jumpToEndFrame() : Creative.tl.seek(currTime, false);
    },

    createButtons: function()
    {
        exitBtn.addEventListener("click", Creative.onExit, false);
    },

    setUpTimeline: function()
    {
        Creative.tl.repeat(_totalLoops);
        Creative.tl.repeatDelay(_endFrameDelay);
        Creative.tl.eventCallback("onStart", Creative.onBannerStart);
        Creative.tl.eventCallback("onComplete", Creative.onBannerComplete);
    },

    displayBanner: function()
    {
        loadingContent.style.display = "none";
        container.style.display = "block";
    },

    init: function() 
    {
        var _dynamicData = hoxton.getState();
        updateElements(_dynamicData);
        Creative.tl.addLabel("reset", 0)

           
        Creative.tl
            // headline1
            .fromTo( ["#headline1 .character"] , { opacity:0 } , { opacity:1 , duration:0.6 , stagger:0.035 } , ">" )
            .from("#img_logo", { duration:1,opacity: 0}, ">-.2") 
            .to("#headline1,#img_logo", {opacity: 0}, ">+1")   
            
            

            // logo
            .fromTo("#logo" , { scale:0 } , { scale:1 , duration:0.6 ,ease: Power2.easeOut } , ">" )
            .to(".mastercardLogo",{x:-(getById("logo").offsetWidth/4),ease: Power1.easeOut},">")
            .to(".orange",{x:(getById("logo").offsetWidth/2),ease: Power1.easeOut },"<")

            // headline2
            .addLabel("frame2",">")
            .fromTo( ["#headline2 .copy .character"] , { opacity:0 } , { opacity:1 , duration:0.6 , stagger:0.035 } , ">" )
            .fromTo( ["#legal .character"] , { opacity:0 } , { opacity:1 , duration:0.6 , stagger:0.04 } , "<" )
            .from( ["#headline2 #copy3"], {  duration:0.5 , marginTop:getById("copy1").offsetHeight+"px",ease: Power1.easeOut } , "<+1.1" )
            
            if(_dynamicData.suffle_Txt.trim().length>0){
                Creative.tl
                .to(".color", {duration:0.3, y:-getById("suffle_Txt").offsetHeight}, "+=0") 
                .to("#suffle_Txt", {duration:0.3, y:-getById("suffle_Txt").offsetHeight}, "+=0") 
                .call(suffle,[],">")

            }
            console.log("offsetHeight",getById("suffle_Txt").offsetHeight)
             Creative.tl
             
            .from("#cta", { duration:0.5,y:10,opacity: 0,filter:"blur(1px)"}, "+=.5") 
            

            .from("#handHolder", { duration:1,y:_dynamicData.adSize.height,x:_dynamicData.adSize.width/2}, ">") 
            .from("#hand_spark", { scale:0,duration:0.2}, ">+.3")
            .to("#cta", { scale:0.9,duration:0.2}, "<")
            .to("#hand_spark", { scale:0,duration:0.2}, ">")
            .to("#cta", { scale:1,duration:0.2}, "<")
            .to("#handHolder", { duration:0.5,opacity: 0}, ">") 

        .addLabel("end", 6);
        console.log("totalDuration",Creative.tl.totalDuration())
    }
};


function suffle(){
    document.querySelector(".color").style.width = document.querySelector(".color").offsetWidth+"px";
    document.querySelector(".color").innerHTML=_dynamicData.suffle_Txt;
    document.querySelector(".color").style.width = document.querySelector("#suffle_Txt").offsetWidth+"px";
    
}


function getById(eleID) 
{
    return document.getElementById(eleID);
}



/**
 * function sets banner content to initial states
 */
function resetAd() {

    // gsap.set([copyHeadline, copySubline], {alpha:0, y:50});
    // gsap.set([imgProduct], {scale:1.05, transformOrigin: "50% 50%"});
    // gsap.set([endFrame], {alpha:0});

}
function splitline(str){
    var getText="";
    splitTexts = str.split('<br>');
    splitTexts.forEach(function(item,index){
        getText += `<div id=copy`+(index+1)+` class=copy>${splitTextWithSpans(splitTexts[index])}</div>`;
    })
    return getText;
}
function splitTextWithSpans(str) {
    const result = [];

    let i = 0;
    while (i < str.length) {
      if (str[i] === '<') {
        // Start of an HTML tag
        const tagEnd = str.indexOf('>', i);
        if (tagEnd === -1) break; // Invalid tag
        const tag = str.slice(i, tagEnd + 1);
        result.push(tag);
        i = tagEnd + 1;
      } else {
        // Regular character
        result.push(`<span class=character>${str[i]}</span>`);
        i++;
      }
    }

    return result.join('');


}
function updateElements(_dynamicData){
    
    state = _dynamicData;
   
    getById("headline1").innerHTML ="";
    getById("headline1").innerHTML = splitline(_dynamicData.headline1);

    getById("headline2").innerHTML ="";
    getById("headline2").innerHTML = splitline(_dynamicData.headline2)


    getById("legal").innerHTML ="";
    getById("legal").innerHTML = splitline(_dynamicData.legal)

    var color = document.getElementsByClassName("color")[0];
    var colorParant = color.parentElement;
    var newtxt = document.createElement("div");
    newtxt.setAttribute("id", "suffle_Txt");
   newtxt.innerHTML = _dynamicData.suffle_Txt;
    // newtxt.appendChild(colorParant);
    colorParant.appendChild(newtxt);
    // getByTaganm("copy3").innerHTML = splitline(_dynamicData.suffle_Txt)

    
}
