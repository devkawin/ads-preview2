function initAnimation(){
    const tl = gsap.timeline({ repeat:1, repeatDelay:3});
    var intro = 0;
    var frame1 = 2;
   /*  var frame2 = 4.5; */
   /* var frame3 = 7;
    var frame4 = 9.5;
    var frame5 = 12.5;  */
   
  
    tl

.to("#mainContainer", 0, {opacity:1, ease:Power1.easeIn }, intro)
 //IntroFrame//
.to("#introLogo", 0.3, {opacity:1, ease:Power1.easeIn , translateZ:0.01, force3D: false }, intro)
.to("#introLogo", 0.4, {opacity:0, ease:Power1.easeIn , translateZ:0.01, force3D: false }, intro+1.4)
.to("#intro", 0.5, {opacity:0, ease:Power1.easeIn, translateZ:0.01, force3D: false  }, intro+1.5)

//Frame1//

.to("#fc1", { duration: 9,scale: 1.08,y:5, ease: Power1.in, translateZ:0.01, force3D: false }, frame1-0.5)

.from("#att1", { duration: 0.25,x:147,ease: Power2.out, translateZ:0.01, force3D: false }, frame1)
.to("#att1", { duration: 0.2,x:-10,ease: Power2.out, translateZ:0.01, force3D: false }, frame1+0.5)
/* .to("#minifc", { duration: 0.1,rotation:-1, transformOrigin:"25% 93%" }, frame1+0.6)
.to("#minifc", { duration: 0.1,rotation:0, transformOrigin:"25% 93%" }, frame1+0.7) */
.to("#spriteContainer1",{duration:0.4,width:109,opacity:1,ease:Power1.easeIn, translateZ:0.01, force3D: false },frame1+0.6)

.to("#spriteContainer1", {duration:2.6,backgroundPosition:"-2943px",  ease:SteppedEase.config(27), translateZ:0.01, force3D: false  },frame1+0.8)
.to("#copy1", { duration: 0.2, opacity: 0, ease: Power1.easeOut, translateZ:0.01, force3D: false  }, frame1 + 2.2)
.to("#copy2", { duration: 0.2, opacity: 1, ease: Power1.easeOut , translateZ:0.01, force3D: false }, frame1 + 2.3)


/* .to("#minifc", { duration: 0.1,rotation:-1, transformOrigin:"25% 93%" }, frame1+2.3) */
.to("#att1", { duration: 0,opacity:0,ease: Power2.out, translateZ:0.01, force3D: false }, frame1+2.4)
.to("#spriteContainer1", { duration: 0,opacity:0,ease: Power2.out, translateZ:0.01, force3D: false }, frame1+2.4)
/* .to("#minifc", { duration: 0.1,rotation:0, transformOrigin:"25% 93%" }, frame1+2.4) */
.to("#att2", { duration: 0,opacity:1,ease: Power2.out, translateZ:0.01, force3D: false }, frame1+2.4)
.set("#spriteContainer2", { duration: 0,opacity:1,ease: Power2.out}, frame1+2.4)
.to("#corrector2", { duration: 0,opacity:1,ease: Power2.out, translateZ:0.01, force3D: false }, frame1+2.4)
.to("#corrector3", { duration: 0,opacity:1,ease: Power2.out, translateZ:0.01, force3D: false }, frame1+2.4)
.to("#spriteContainer2", {duration:2.3,backgroundPosition:"-1939px",  ease:SteppedEase.config(27)/* ,repeat:,yoyo:true, */ , translateZ:0.01, force3D: false },frame1+2.6)

.to("#copy2", { duration: 0.2, opacity: 0, ease: Power1.easeOut , translateZ:0.01, force3D: false }, frame1+4.5) 
.to("#copy3", { duration: 0.2, opacity: 1, ease: Power1.easeOut , translateZ:0.01, force3D: false }, frame1+4.7) 

/* .to("#minifc", { duration: 0.1,rotation:-1, transformOrigin:"25% 93%" }, frame1+4.8) */
.to("#att2", { duration: 0,opacity:0,ease: Power2.out, translateZ:0.01, force3D: false }, frame1+4.9)
.set("#spriteContainer2", { duration: 0,opacity:0,ease: Power2.out, translateZ:0.01, force3D: false }, frame1+4.9)
/* .to("#minifc", { duration: 0.1,rotation:0, transformOrigin:"25% 93%" }, frame1+4.9) */

.to("#att3", { duration: 0,opacity:1,ease: Power2.out, translateZ:0.01, force3D: false }, frame1+4.9)
.to("#corrector6", { duration: 0,opacity:1,ease: Power2.out, translateZ:0.01, force3D: false }, frame1+4.9)
.to("#corrector7", { duration: 0,opacity:1,ease: Power2.out, translateZ:0.01, force3D: false }, frame1+4.9)
// .to("#corrector4", { duration: 0,opacity:1,ease: Power2.out}, frame1+4.9)
// .to("#corrector5", { duration: 0,opacity:1,ease: Power2.out}, frame1+4.9)
.set("#spriteContainer3", { duration: 0,opacity:1,ease: Power2.out, translateZ:0.01, force3D: false }, frame1+4.9)
.to("#spriteContainer3", {duration:2.3,backgroundPosition:"-2549px",  ease:SteppedEase.config(27)/* ,repeat:,yoyo:true, */ , translateZ:0.01, force3D: false },frame1+4.9)
.to("#minifc", { duration: 0.6,opacity:0, translateZ:0.01, force3D: false  }, frame1+7.2)

.to("#copy3", { duration: 0.2, opacity: 0, ease: Power1.easeOut, translateZ:0.01, force3D: false  }, frame1+7.2) 


//Frame5//
.to("#fc5", { duration: 0.5,opacity:1, ease: Power1.easeOut, translateZ:0.01, force3D: false }, frame1+7.5)
.to("#copy4", { duration: 0.3, opacity: 1, ease: Power1.easeOut , translateZ:0.01, force3D: false }, frame1+8)
.to("#miniCopy1", { duration: 0.3, opacity: 1, ease: Power1.easeOut , translateZ:0.01, force3D: false }, frame1+8) 


//CTA//

.to("#ctaHolder", {duration:0.4,opacity:1,y:5, ease:Power2.easeOut, translateZ:0.01, force3D: false  },frame1+8.8)
.set("#arrow", {x:0})
.to('#arrow', { duration: .4, x:30})
.from('#arrow', { duration: .4, x:-30, delay: .2})


console.log(tl.totalDuration());

}

function startBanner() {
    mainContainer.style.display = "block";
	initAnimation();

	
}

mainContainer.addEventListener("mouseenter", arrowEnter);
mainContainer.addEventListener("mouseleave", arrowLeave);




function arrowEnter(){
        gsap.set("#arrow", {x:0})
        gsap.to('#arrow', { duration: .5, x:30})
        gsap.from('#arrow', { duration: .5, x:-30, delay: .2})
    }
    
function arrowLeave(){
        gsap.set("#arrow", {x:0})
        gsap.to('#arrow', { duration: .5, x:30})
        gsap.from('#arrow', { duration: .5, x:-30, delay: .2})
    }

/* GSDevTools.create(); */
window.addEventListener("load", startBanner, arrowEnter, arrowLeave);