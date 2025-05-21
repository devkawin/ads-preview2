function initAnimation() {
    // GSDevTools.create();
    const tl = gsap.timeline({ repeat: 1, repeatDelay: 2 });
    var intro = 0;
    var frame1 = 2;

    tl

        .to("#mainContainer", 0, { opacity: 1, ease: Power1.easeIn }, intro)

    //IntroFrame//
    .to("#introLogo", 0.3, { opacity: 1, ease: Power1.easeIn ,translateZ:0.01, force3D: false}, intro)
        .to("#introLogo", 0.4, { opacity: 0, ease: Power1.easeIn ,translateZ:0.01, force3D: false}, intro + 1.4)
        .to("#intro", 0.5, { opacity: 0, ease: Power1.easeIn,translateZ:0.01, force3D: false }, intro + 1.5)

    //Frame1//
    .to("#frame1Bg", { duration: 0.6, opacity: 0, ease: "power1.in",translateZ:0.01, force3D: false }, frame1 + 0.8)


    .to("#spriteContainer1", { duration: 0, opacity: 1, ease: Power1.easeIn,translateZ:0.01, force3D: false }, frame1 + 0.8)

    .to("#copy1", { duration: 0.3, opacity: 1, ease: "power1.in",translateZ:0.01, force3D: false }, frame1 + 0.8)
        .to("#spriteContainer1", { duration: 0.25, backgroundPosition: "-1515px", ease: SteppedEase.config(5), repeat: 18,translateZ:0.01, force3D: false }, frame1 + 0.8)
        .to("#copy1", { duration: 0.3, opacity: 0, ease: "power1.in" ,translateZ:0.01, force3D: false}, frame1 + 3.8)
        .to("#fc1", { duration: 0.6, opacity: 0, ease: "power1.in",translateZ:0.01, force3D: false }, frame1 + 4)


    .to("#framesLogo", { duration: 0.3, opacity: 0, ease: "power1.in",translateZ:0.01, force3D: false }, frame1 + 4.1)
        .to("#framesLogo2", { duration: 0.3, opacity: 1, ease: "power1.in",translateZ:0.01, force3D: false }, frame1 + 4.2)
        //Frame2//
        .to("#fc2", { duration: 0.5, opacity: 1, ease: "power1.in",translateZ:0.01, force3D: false }, frame1 + 4.3)
        .to("#fc2", { duration: 4, scale: 1.08, y: -5, x: 5, ease: "power1.in",translateZ:0.01, force3D: false }, frame1 + 2.5)
        .to("#frame2Bg", { duration: 0.5, opacity: 1, ease: "power1.in",translateZ:0.01, force3D: false }, frame1 + 3.5)
        .to("#copy2", { duration: 0.5, opacity: 1, ease: "power1.in",translateZ:0.01, force3D: false }, frame1 + 4.5)
        .to("#fc2", { duration: 0.3, opacity: 0, ease: "power1.in",translateZ:0.01, force3D: false }, frame1 + 7.3)
        .to("#copy2", { duration: 0.3, opacity: 0, ease: "power1.in" ,translateZ:0.01, force3D: false}, frame1 + 7.3)

    //Frame3//
    .to("#copy3", { duration: 0.5, opacity: 1, ease: "power1.in",translateZ:0.01, force3D: false }, frame1 + 7.6)
        .to("#miniCopy1", { duration: 0.5, opacity: 1, ease: "power1.in",translateZ:0.01, force3D: false }, frame1 + 7.6)
        .to("#frame3Bg", { duration: 0.5, opacity: 1, ease: "power1.in",translateZ:0.01, force3D: false }, frame1 + 7.6)

    //CTA//

    .to("#ctaHolder", { duration: 0.4, opacity: 1, y: 5, ease: Power2.easeOut,translateZ:0.01, force3D: false }, frame1 + 8.2)
        .set("#arrow", { x: 0 })
        .to('#arrow', { duration: .4, x: 30 })
        .from('#arrow', { duration: .4, x: -30, delay: .2 })


    console.log(tl.totalDuration());

}

function startBanner() {
    mainContainer.style.display = "block";
    initAnimation();


}

mainContainer.addEventListener("mouseenter", arrowEnter);
mainContainer.addEventListener("mouseleave", arrowLeave);




function arrowEnter() {
    gsap.set("#arrow", { x: 0 })
    gsap.to('#arrow', { duration: .5, x: 30 })
    gsap.from('#arrow', { duration: .5, x: -30, delay: .2 })
}

function arrowLeave() {
    gsap.set("#arrow", { x: 0 })
    gsap.to('#arrow', { duration: .5, x: 30 })
    gsap.from('#arrow', { duration: .5, x: -30, delay: .2 })
}

//  GSDevTools.create(); 
window.addEventListener("load", startBanner, arrowEnter, arrowLeave);