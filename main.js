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
    
    // --- Card Spotlight Effect ---
    const cards = document.querySelectorAll(".content-card");
    cards.forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);
        });
    });


    // --- Hero Section Animation ---
    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTimeline
        .from(".hero-title, .hero-subtitle", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
        })
        .from(".hero .cta-button", { y: 20, opacity: 0, duration: 0.6 }, "-=0.5");

    // --- Immersive Canvas Animation on Scroll ---
    const mainColumnCards = document.querySelectorAll(".main-column .content-card");
    const sideColumnCards = document.querySelectorAll(".side-column .content-card");

    const canvasTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".immersive-canvas",
            start: "top 80%",
            toggleActions: "play none none none",
        },
        defaults: {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
        }
    });

    canvasTimeline
        .from(mainColumnCards)
        .from(sideColumnCards, {}, "-=0.5"); // Animate side column slightly after main


    // --- Modern Modal Functionality with GSAP ---
    const modalOverlay = document.querySelector(".modal-overlay");
    const modal = document.querySelector(".modal");
    const modalTriggers = document.querySelectorAll(".modal-trigger");
    const modalCloseBtn = document.querySelector(".modal-close-btn");

    const modalTimeline = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out" },
    });

    modalTimeline
        .to(modalOverlay, { duration: 0.3, autoAlpha: 1 })
        .from(modal, { duration: 0.4, y: 50, opacity: 0 }, "-=0.2")
        .from(".modal > *", { duration: 0.3, y: 20, opacity: 0, stagger: 0.1 });

    const openModal = () => modalTimeline.play();
    const closeModal = () => modalTimeline.reverse();

    modalTriggers.forEach(trigger => trigger.addEventListener("click", e => {
        e.preventDefault();
        openModal();
    }));

    modalCloseBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", e => {
        if (e.target === modalOverlay) closeModal();
    });
});
