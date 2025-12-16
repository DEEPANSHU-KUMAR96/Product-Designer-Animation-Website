
//  LOCOMOTIVE 
const scroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true
});

//  FIRST PAGE ANIMATION 
function firstPageAnimation() {
  const tl = gsap.timeline();

  tl.from("nav", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    ease: "expo.inOut"
  })
    .to(".boundingelem", {
      y: 0,
      duration: 1.8,
      ease: "expo.inOut",
      stagger: 0.2,
      delay: -1
    })
    .from(".herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      ease: "expo.inOut",
      delay: -1
    });
}

// CURSOR FOLLOWER 
const circle = document.querySelector(".minicircle");

let xprev = 0;
let yprev = 0;
let timeout;

window.addEventListener("mousemove", (e) => {
  clearTimeout(timeout);

  const xdiff = e.clientX - xprev;
  const ydiff = e.clientY - yprev;

  xprev = e.clientX;
  yprev = e.clientY;

  const xscale = gsap.utils.clamp(0.8, 1.2, Math.abs(xdiff) * 0.01);
  const yscale = gsap.utils.clamp(0.8, 1.2, Math.abs(ydiff) * 0.01);

  gsap.to(circle, {
    x: e.clientX,
    y: e.clientY,
    scaleX: xscale,
    scaleY: yscale,
    duration: 0.2,
    ease: "power3.out"
  });

  timeout = setTimeout(() => {
    gsap.to(circle, {
      scaleX: 1,
      scaleY: 1,
      duration: 0.2
    });
  }, 100);
});

// PAGE TWO IMAGE FOLLOW 
function pageTwoImages() {
  document.querySelectorAll(".elem").forEach((elem) => {
    let rotate = 0;

    const img = elem.querySelector("img");

    elem.addEventListener("mousemove", (e) => {
      const bounds = elem.getBoundingClientRect();

      const diffY = e.clientY - bounds.top;
      const diffX = e.clientX - rotate;
      rotate = e.clientX;

      gsap.to(img, {
        opacity: 1,
        top: diffY,
        left: e.clientX - bounds.left,
        rotate: gsap.utils.clamp(-20, 20, diffX * 0.5),
        duration: 0.5,
        ease: "power3.out"
      });
    });

    elem.addEventListener("mouseleave", () => {
      gsap.to(img, {
        opacity: 0,
        duration: 0.5,
        ease: "power3.out"
      });
    });
  });
}


firstPageAnimation();
pageTwoImages();
