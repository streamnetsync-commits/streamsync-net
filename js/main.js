/* =========================================================
   STREAMSYNC NET
   MAIN.JS
========================================================= */


/* =========================================================
   SUPABASE CONFIGURATION
========================================================= */

const SUPABASE_URL = "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE";

const SUPABASE_PUBLISHABLE_KEY =
    "PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );



/* =========================================================
   PAGE READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const header =
        document.querySelector(".header");

    const navigation =
        document.querySelector(".navigation");

    const navActions =
        document.querySelector(".nav-actions");


    if (header && navigation) {

        const menuButton =
            document.createElement("button");

        menuButton.type = "button";

        menuButton.className =
            "mobile-menu-btn";

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


        menuButton.addEventListener(
            "click",
            function () {

                navigation.classList.toggle(
                    "mobile-active"
                );


                if (navActions) {

                    navActions.classList.toggle(
                        "mobile-active"
                    );

                }


                const menuOpen =
                    navigation.classList.contains(
                        "mobile-active"
                    );


                menuButton.innerHTML =
                    menuOpen ? "✕" : "☰";

            }
        );


        navigation
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navigation.classList.remove(
                            "mobile-active"
                        );


                        if (navActions) {

                            navActions.classList.remove(
                                "mobile-active"
                            );

                        }


                        menuButton.innerHTML = "☰";

                    }
                );

            });

    }



    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    function updateHeader() {

        const currentHeader =
            document.querySelector(".header");


        if (!currentHeader) {
            return;
        }


        if (window.scrollY > 30) {

            currentHeader.classList.add(
                "scrolled"
            );

        } else {

            currentHeader.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader
    );


    updateHeader();



    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });



    /* =====================================================
       CUSTOMER LOGIN / REGISTER SWITCH
    ===================================================== */

    const loginForm =
        document.getElementById(
            "customer-login-form"
        );


    const registerForm =
        document.getElementById(
            "customer-register-form"
        );


    const authSwitch =
        document.getElementById(
            "auth-switch"
        );


    const authSwitchText =
        document.getElementById(
            "auth-switch-text"
        );


    const authDescription =
        document.getElementById(
            "auth-description"
        );


    const authMessage =
        document.getElementById(
            "auth-message"
        );


    let registrationMode = false;



    /* =====================================================
       AUTH MESSAGE
    ===================================================== */

    function showAuthMessage(
        message,
        type
    ) {

        if (!authMessage) {
            return;
        }


        authMessage.textContent =
            message;


        authMessage.style.display =
            "block";


        authMessage.style.padding =
            "12px";


        authMessage.style.marginTop =
            "15px";


        authMessage.style.borderRadius =
            "8px";


        if (type === "error") {

            authMessage.style.background =
                "#fee2e2";

            authMessage.style.color =
                "#991b1b";

        }

        else if (type === "success") {

            authMessage.style.background =
                "#dcfce7";

            authMessage.style.color =
                "#166534";

        }

        else {

            authMessage.style.background =
                "#e0f2fe";

            authMessage.style.color =
                "#075985";

        }

    }



    /* =====================================================
       SWITCH LOGIN / REGISTER
    ===================================================== */

    if (authSwitch) {

        authSwitch.addEventListener(
            "click",
            function () {

                registrationMode =
                    !registrationMode;


                if (authMessage) {

                    authMessage.style.display =
                        "none";

                }


                if (registrationMode) {

                    /* SHOW REGISTER */

                    if (loginForm) {

                        loginForm.style.display =
                            "none";

                    }


                    if (registerForm) {

                        registerForm.style.display =
                            "flex";

                    }


                    if (authSwitchText) {

                        authSwitchText.textContent =
                            "Already have an account?";

                    }


                    authSwitch.textContent =
                        "Login";


                    if (authDescription) {

                        authDescription.textContent =
                            "Create your StreamSync Net customer account.";

                    }

                }

                else {

                    /* SHOW LOGIN */

                    if (loginForm) {

                        loginForm.style.display =
                            "flex";

                    }


                    if (registerForm) {

                        registerForm.style.display =
                            "none";

                    }


                    if (authSwitchText) {

                        authSwitchText.textContent =
                            "Don't have an account?";

                    }


                    authSwitch.textContent =
                        "Create Account";


                    if (authDescription) {

                        authDescription.textContent =
                            "Log in to your StreamSync Net account.";

                    }

                }

            }
        );

    }



    /* =====================================================
       CUSTOMER REGISTRATION
    ===================================================== */

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById(
                            "register-name"
                        )
                        .value
                        .trim();


                const email =
                    document
                        .getElementById(
                            "register-email"
                        )
                        .value
                        .trim();


                const phone =
                    document
                        .getElementById(
                            "register-phone"
                        )
                        .value
                        .trim();


                const location =
                    document
                        .getElementById(
                            "register-location"
                        )
                        .value
                        .trim();


                const password =
                    document
                        .getElementById(
                            "register-password"
                        )
                        .value;


                const packageSelect =
                    document.getElementById(
                        "register-package"
                    );


                if (
                    !name ||
                    !email ||
                    !phone ||
                    !location ||
                    !password ||
                    !packageSelect ||
                    !packageSelect.value
                ) {

                    showAuthMessage(
                        "Please complete all fields.",
                        "error"
                    );

                    return;

                }


                if (password.length < 6) {

                    showAuthMessage(
                        "Password must contain at least 6 characters.",
                        "error"
                    );

                    return;

                }


                const selectedOption =
                    packageSelect.options[
                        packageSelect.selectedIndex
                    ];


                const packageName =
                    selectedOption.value;


                const speed =
                    Number(
                        selectedOption.dataset.speed
                    );


                const price =
                    Number(
                        selectedOption.dataset.price
                    );


                showAuthMessage(
                    "Creating your account...",
                    "info"
                );


                try {


                    /* =====================================
                       CREATE SUPABASE AUTH ACCOUNT
                    ===================================== */

                    const result =
                        await supabaseClient.auth.signUp({

                            email: email,

                            password: password

                        });


                    if (result.error) {

                        throw result.error;

                    }


                    const user =
                        result.data.user;


                    if (!user) {

                        throw new Error(
                            "Account could not be created."
                        );

                    }



                    /* =====================================
                       SAVE CUSTOMER INFORMATION
                    ===================================== */

                    const customerData = {

                        id: user.id,

                        full_name: name,

                        phone: phone,

                        location: location,

                        package_name: packageName,

                        package_speed: speed,

                        monthly_price: price,

                        connection_status: "pending"

                    };


                    const customerResult =
                        await supabaseClient
                            .from("customers")
                            .insert(
                                customerData
                            );


                    if (customerResult.error) {

                        console.error(
                            "Customer database error:",
                            customerResult.error
                        );


                        showAuthMessage(
                            "Your login account was created, but your customer information could not be saved. Please contact StreamSync Net.",
                            "error"
                        );

                        return;

                    }



                    /* =====================================
                       SUCCESS
                    ===================================== */

                    showAuthMessage(
                        "Account created successfully! Check your email if confirmation is required, then log in.",
                        "success"
                    );


                    registerForm.reset();


                }

                catch (error) {

                    console.error(
                        "Registration error:",
                        error
                    );


                    showAuthMessage(
                        error.message ||
                        "Unable to create your account. Please try again.",
                        "error"
                    );

                }

            }
        );

    }



    /* =====================================================
       CUSTOMER LOGIN
    ===================================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const email =
                    document
                        .getElementById(
                            "login-email"
                        )
                        .value
                        .trim();


                const password =
                    document
                        .getElementById(
                            "login-password"
                        )
                        .value;


                if (!email || !password) {

                    showAuthMessage(
                        "Please enter your email and password.",
                        "error"
                    );

                    return;

                }


                showAuthMessage(
                    "Logging in...",
                    "info"
                );


                try {

                    const result =
                        await supabaseClient.auth
                            .signInWithPassword({

                                email: email,

                                password: password

                            });


                    if (result.error) {

                        throw result.error;

                    }


                    showAuthMessage(
                        "Login successful!",
                        "success"
                    );


                    loginForm.reset();


                }

                catch (error) {

                    console.error(
                        "Login error:",
                        error
                    );


                    showAuthMessage(
                        error.message ||
                        "Login failed. Please check your email and password.",
                        "error"
                    );

                }

            }
        );

    }



    /* =====================================================
       CHECK LOGIN SESSION
    ===================================================== */

    async function checkSession() {

        try {

            const result =
                await supabaseClient.auth
                    .getSession();


            if (
                result.data &&
                result.data.session
            ) {

                console.log(
                    "StreamSync Net customer is logged in."
                );

            }

        }

        catch (error) {

            console.error(
                "Session check failed:",
                error
            );

        }

    }


    checkSession();



    /* =====================================================
       COVERAGE FORM
    ===================================================== */

    const coverageForm =
        document.querySelector(
            ".coverage-form"
        );


    if (coverageForm) {

        coverageForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const input =
                    coverageForm.querySelector(
                        "input"
                    );


                if (!input) {
                    return;
                }


                const area =
                    input.value.trim();


                if (!area) {
                    return;
                }


                const message =
                    "Hello StreamSync Net, I would like to check internet coverage in " +
                    area +
                    ".";


                const url =
                    "https://wa.me/254113916614?text=" +
                    encodeURIComponent(message);


                window.open(
                    url,
                    "_blank"
                );

            }
        );

    }



    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.querySelector(
            ".contact-form"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const fields =
                    contactForm.querySelectorAll(
                        "input"
                    );


                const name =
                    fields[0]
                        ? fields[0].value.trim()
                        : "";


                const phone =
                    fields[1]
                        ? fields[1].value.trim()
                        : "";


                const location =
                    fields[2]
                        ? fields[2].value.trim()
                        : "";


                const packageSelect =
                    contactForm.querySelector(
                        "select"
                    );


                const packageName =
                    packageSelect &&
                    packageSelect.selectedIndex >= 0
                        ? packageSelect.options[
                            packageSelect.selectedIndex
                        ].text
                        : "";


                const textarea =
                    contactForm.querySelector(
                        "textarea"
                    );


                const additionalInfo =
                    textarea
                        ? textarea.value.trim() 
