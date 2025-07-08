document.addEventListener("DOMContentLoaded", () => {
    // --- GSAP & ScrollTrigger Registration ---
    gsap.registerPlugin(ScrollTrigger);

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector(".navbar");
    ScrollTrigger.create({
        trigger: "body",
        start: "top -50px",
        end: "bottom bottom",
        onUpdate: (self) => {
            if (self.direction === 1) {
                navbar.classList.add("scrolled");
            } else if (window.scrollY < 50) {
                navbar.classList.remove("scrolled");
            }
        },
    });

    // --- Hero Section Animation ---
    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTimeline
        .from(".hero-title span, .hero-title", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
        })
        .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero .cta-button", { y: 20, opacity: 0, duration: 0.6 }, "-=0.5");

    // --- Staggered Section Animations on Scroll ---
    const sections = document.querySelectorAll(
        ".content-section, .emotional-section, .feature-section"
    );

    sections.forEach((section) => {
        const elementsToAnimate = section.querySelectorAll("h2, p, .quote-container, .steps-container, .feature-use-cases, .feature-tagline");
        
        gsap.from(elementsToAnimate, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        });
    });

    // --- Parallax Effect on Cards ---
    const cards = document.querySelectorAll(".step, .use-case");
    cards.forEach(card => {
        gsap.to(card, {
            y: -20,
            ease: "none",
            scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
            }
        });
    });

    // --- Modern Modal Functionality with GSAP ---
    const modalOverlay = document.querySelector(".modal-overlay");
    const modal = document.querySelector(".modal");
    const modalTriggers = document.querySelectorAll(".modal-trigger");
    const modalCloseBtn = document.querySelector(".modal-close-btn");

    // Create a GSAP timeline for the modal animation
    const modalTimeline = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
    });

    modalTimeline
        .to(modalOverlay, { duration: 0.3, autoAlpha: 1 })
        .from(modal, { duration: 0.4, y: 50, opacity: 0 }, "-=0.2")
        .from(".modal > *", { duration: 0.3, y: 20, opacity: 0, stagger: 0.1 });

    const openModal = () => {
        modalTimeline.play();
    };

    const closeModal = () => {
        modalTimeline.reverse();
    };

    modalTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            openModal();
        });
    });

    modalCloseBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
});
