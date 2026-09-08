/* =========================================================
   UZAIR GHASWALA — PORTFOLIO JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.querySelector(".header");

    function handleHeaderScroll() {

        if (window.scrollY > 50) {

            header.style.background = "rgba(8, 8, 8, 0.94)";
            header.style.borderBottom =
                "1px solid rgba(255,255,255,0.10)";

        } else {

            header.style.background =
                "rgba(8, 8, 8, 0.78)";

            header.style.borderBottom =
                "1px solid rgba(255,255,255,0.05)";
        }
    }

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.style.color = "";

            const href = link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.style.color = "#ffffff";
            }

        });
    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    /* =====================================================
       SMOOTH NAVIGATION
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetID = this.getAttribute("href");

            if (targetID === "#") {
                return;
            }

            const target = document.querySelector(targetID);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section, .project-card, .skill-card, .info-box, .experience-item"
    );

    revealElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(25px)";
        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       PROJECT CARD STAGGER
    ===================================================== */

    const projectCards =
        document.querySelectorAll(".project-card");

    projectCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 80}ms`;

    });


    /* =====================================================
       SKILL CARD STAGGER
    ===================================================== */

    const skillCards =
        document.querySelectorAll(".skill-card");

    skillCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 100}ms`;

    });


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const profile =
        document.querySelector(".profile-frame");

    const floatingCards =
        document.querySelectorAll(".floating-card");

    window.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 900) {
            return;
        }

        const x =
            (event.clientX / window.innerWidth - 0.5);

        const y =
            (event.clientY / window.innerHeight - 0.5);


        if (profile) {

            profile.style.transform =
                `rotate(2deg)
                 translate(${x * 8}px, ${y * 8}px)`;
        }


        floatingCards.forEach((card, index) => {

            const multiplier =
                index === 0 ? 12 : -12;

            card.style.marginLeft =
                `${x * multiplier}px`;

            card.style.marginTop =
                `${y * multiplier}px`;

        });

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const footer =
        document.querySelector(".footer");

    if (footer) {

        const year =
            new Date().getFullYear();

        footer.innerHTML =
            footer.innerHTML.replace(
                "2026",
                year
            );
    }


    /* =====================================================
       EMAIL / WHATSAPP TRACKING
       (Console only for now)
    ===================================================== */

    const contactLinks =
        document.querySelectorAll(
            'a[href^="mailto:"], a[href*="wa.me"]'
        );

    contactLinks.forEach(link => {

        link.addEventListener("click", () => {

            console.log(
                "Contact clicked:",
                link.href
            );

        });

    });


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%cUzair Ghaswala Portfolio",
        "font-size:18px;font-weight:bold;"
    );

    console.log(
        "Web Development • Digital Marketing"
    );

});