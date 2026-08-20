/* =========================================================
   STREAMSYNC NET
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const header = document.querySelector(".header");
    const navigation = document.querySelector(".navigation");
    const navActions = document.querySelector(".nav-actions");

    if (header && navigation) {

        const menuButton = document.createElement("button");

        menuButton.className = "mobile-menu-btn";

        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuButton.innerHTML = "☰";

        const navContainer =
            header.querySelector(".nav-container");

        if (navContainer) {
            navContainer.appendChild(menuButton);
        }

        menuButton.addEventListener("click", function () {

            navigation.classList.toggle("mobile-active");

            if (navActions) {
                navActions.classList.toggle("mobile-active");
            }

            const menuOpen =
                navigation.classList.contains("mobile-active");

            menuButton.innerHTML =
                menuOpen ? "✕" : "☰";

        });


        /* Close menu after clicking a navigation link */

        const navigationLinks =
            navigation.querySelectorAll("a");

        navigationLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove(
                    "mobile-active"
                );

                if (navActions) {
                    navActions.classList.remove(
                        "mobile-active"
                    );
                }

                menuButton.innerHTML = "☰";

            });

        });

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const handleHeaderScroll = function () {

        const currentHeader =
            document.querySelector(".header");

        if (!currentHeader) return;

        if (window.scrollY > 30) {

            currentHeader.classList.add("scrolled");

        } else {

            currentHeader.classList.remove("scrolled");

        }

    };

    window.addEventListener(
        "scroll",
        handleHeaderScroll
    );

    handleHeaderScroll();


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".package-card, .service-card, .benefit-card, .step"
        );

    const revealObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =====================================================
       COVERAGE FORM
    ===================================================== */

    const coverageForm =
        document.querySelector(".coverage-form");

    if (coverageForm) {

        coverageForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const input =
                    coverageForm.querySelector(
                        "input"
                    );

                const area =
                    input ? input.value.trim() : "";

                if (!area) {
                    return;
                }

                const message =
                    "Hello StreamSync Net, I would like to check internet coverage in " +
                    area +
                    ".";

                const whatsappURL =
                    "https://wa.me/254113916614?text=" +
                    encodeURIComponent(message);

                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const name =
                    contactForm
                        .querySelector(
                            'input[placeholder="Full Name"]'
                        )?.value.trim() || "";

                const phone =
                    contactForm
                        .querySelector(
                            'input[placeholder="Phone Number"]'
                        )?.value.trim() || "";

                const location =
                    contactForm
                        .querySelector(
                            'input[placeholder="Your Location"]'
                        )?.value.trim() || "";

                const packageSelect =
                    contactForm.querySelector(
                        "select"
                    );

                const selectedPackage =
                    packageSelect
                        ? packageSelect.options[
                            packageSelect.selectedIndex
                          ].text
                        : "";

                const textarea =
                    contactForm.querySelector(
                        "textarea"
                    );

                const messageText =
                    textarea
                        ? textarea.value.trim()
                        : "";


                const message =
                    "Hello StreamSync Net,%0A%0A" +

                    "I would like to get connected.%0A%0A" +

                    "Name: " +
                    encodeURIComponent(name) +
                    "%0A" +

                    "Phone: " +
                    encodeURIComponent(phone) +
                    "%0A" +

                    "Location: " +
                    encodeURIComponent(location) +
                    "%0A" +

                    "Package: " +
                    encodeURIComponent(selectedPackage) +
                    "%0A" +

                    "Message: " +
                    encodeURIComponent(messageText);


                const whatsappURL =
                    "https://wa.me/254113916614?text=" +
                    message;

                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }

}); 
