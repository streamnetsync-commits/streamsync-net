// =========================================================
// STREAMSYNC NET
// Main JavaScript
// =========================================================


// =========================
// MOBILE MENU
// =========================

const navigation = document.querySelector(".navigation");
const navActions = document.querySelector(".nav-actions");
const header = document.querySelector(".header");


// Create mobile menu button
const menuButton = document.createElement("button");

menuButton.className = "mobile-menu-btn";
menuButton.innerHTML = "☰";
menuButton.setAttribute("aria-label", "Open menu");


// Add menu button to header
const navContainer = document.querySelector(".nav-container");

if (navContainer) {
    navContainer.insertBefore(menuButton, navigation);
}


// Toggle mobile menu
menuButton.addEventListener("click", () => {

    navigation.classList.toggle("mobile-active");
    navActions.classList.toggle("mobile-active");

    menuButton.innerHTML =
        navigation.classList.contains("mobile-active")
            ? "✕"
            : "☰";

});


// Close menu after clicking a link
const navigationLinks =
    document.querySelectorAll(".navigation a");

navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

        navigation.classList.remove("mobile-active");
        navActions.classList.remove("mobile-active");

        menuButton.innerHTML = "☰";

    });

});


// =========================
// HEADER SCROLL EFFECT
// =========================

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


// =========================
// PACKAGE BUTTONS
// =========================

const packageButtons =
    document.querySelectorAll(".package-btn");

const packageSelect =
    document.querySelector(".contact-form select");

packageButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const packages = [
            "3mbps",
            "5mbps",
            "7mbps"
        ];

        if (packageSelect) {
            packageSelect.value = packages[index];
        }

    });

});


// =========================
// CONTACT FORM
// =========================

const contactForm =
    document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            this.querySelector('input[type="text"]').value;

        alert(
            `Thank you ${name}! Your StreamSync Net request has been received. We will contact you soon.`
        );

        this.reset();

    });

}


// =========================
// COVERAGE FORM
// =========================

const coverageForm =
    document.querySelector(".coverage-form");

if (coverageForm) {

    coverageForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const location =
            this.querySelector("input").value.trim();

        if (!location) {

            alert("Please enter your location.");

            return;

        }

        alert(
            `Thanks! We received your coverage request for ${location}. Please contact StreamSync Net to confirm availability.`
        );

        this.reset();

    });

}


// =========================
// SMOOTH SCROLL
// =========================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// =========================
// SIMPLE REVEAL ANIMATION
// =========================

const revealElements =
    document.querySelectorAll(
        ".package-card, .service-card, .step, .benefit-card"
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});
