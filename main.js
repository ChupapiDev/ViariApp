document.addEventListener("DOMContentLoaded", () => {
    // --- GSAP & ScrollTrigger Registration ---
    gsap.registerPlugin(ScrollTrigger);

    // --- General Animation Function ---
    const animateFrom = (element, y = 50, stagger = 0.1) => {
        gsap.from(element, {
            y,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger,
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });
    };

    // --- Hero Section Animation ---
    gsap.timeline({ defaults: { ease: "power2.out" } })
        .from(".hero-title, .hero-subtitle", { y: 40, opacity: 0, duration: 1, stagger: 0.15 })
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5");

    // --- Content Sections Animations ---
    document.querySelectorAll(".content-section").forEach(section => {
        animateFrom(section, 60, 0);
    });
    
    // --- Staggered Quote Animation ---
    const quotes = document.querySelectorAll(".quote-container blockquote");
    if(quotes.length > 0) {
        animateFrom(quotes, 30, 0.15);
    }

    // --- Animated Divider ---
    document.querySelectorAll(".section-divider").forEach(divider => {
        gsap.fromTo(divider, 
            { scaleX: 0 },
            { 
                scaleX: 1,
                duration: 1.2,
                ease: "power2.out",
                transformOrigin: "center",
                scrollTrigger: {
                    trigger: divider,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // --- Footer Animation ---
    animateFrom(".footer > *", 50, 0.1);
});
