gsap.registerPlugin(ScrollTrigger);

// 1. Entrada Dinâmica
const tl = gsap.timeline();
tl.to(".reveal-text", { y: 0, duration: 0.8, stagger: 0.15, ease: "power4.out" })
  .from(".branding-top, .logo-apparition, .hero-quote, .static-scroll-indicator", {
      opacity: 0, y: 15, duration: 1.2, stagger: 0.1, ease: "power3.out"
  }, "-=0.4");

// 2. Revelação no Scroll
gsap.utils.toArray(".stagger").forEach(item => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 92%",
        },
        y: 25,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});

// 3. Sistema de Chuvisco Magenta (FX)
const fxLayer = document.getElementById('fx-layer');
const isMobile = window.innerWidth < 768;
const dotCount = isMobile ? 15 : 40; // Suave

for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'static-dot';
    fxLayer.appendChild(dot);
    
    gsap.set(dot, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
    });

    animateDot(dot);
}

function animateDot(el) {
    gsap.to(el, {
        opacity: Math.random() * 0.4,
        duration: Math.random() * 2 + 1,
        onComplete: () => {
            gsap.to(el, {
                opacity: 0,
                duration: Math.random() * 2 + 1,
                onComplete: () => {
                    gsap.set(el, {
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight
                    });
                    animateDot(el);
                }
            });
        }
    });
}

// 4. Flicker suave no logo
gsap.to(".img-sjon", {
    opacity: 0.7,
    duration: 0.05,
    repeat: -1,
    yoyo: true,
    repeatDelay: 6,
    ease: "none"
});