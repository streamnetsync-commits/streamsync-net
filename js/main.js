 /* =========================================================
   STREAMSYNC NET
   MAIN.JS
========================================================= */


/* =========================================================
   SUPABASE CONFIGURATION
========================================================= */

/*
   IMPORTANT:
   Keep your REAL Supabase values here.

   Example:

   const SUPABASE_URL = "https://your-project.supabase.co";

   const SUPABASE_PUBLISHABLE_KEY = "your-publishable-key";
*/

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

            navContainer.appendChild(
                menuButton
            );

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


                        menuButton.innerHTML =
                            "☰";

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


                    /*
                     * IMPORTANT:
                     * Prevent href="#" from sending
                     * the page back to the top.
                     */

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        event.preventDefault();

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
       CUSTOMER LOGIN / REGISTER ELEMENTS
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
        type = "info"
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
            function (event) {

                /*
                 * THIS IS THE IMPORTANT FIX.
                 *
                 * Your original HTML has:
                 *
                 * <a href="#" id="auth-switch">
                 *
                 * Without preventDefault(), clicking
                 * Create Account can jump to the top
                 * of the page.
                 */

                event.preventDefault();


                registrationMode =
                    !registrationMode;


                if (authMessage) {

                    authMessage.style.display =
                        "none";

                }



                /* =========================================
                   REGISTER MODE
                ========================================= */

                if (registrationMode) {

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



                /* =========================================
                   LOGIN MODE
                ========================================= */

                else {

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

                /*
                 * Prevent the form from refreshing
                 * or navigating away from the page.
                 */

                event.preventDefault();


                const nameElement =
                    document.getElementById(
                        "register-name"
                    );


                const emailElement =
                    document.getElementById(
                        "register-email"
                    );


                const phoneElement =
                    document.getElementById(
                        "register-phone"
                    );


                const locationElement =
                    document.getElementById(
                        "register-location"
                    );


                const passwordElement =
                    document.getElementById(
                        "register-password"
                    );


                const packageSelect =
                    document.getElementById(
                        "register-package"
                    );


                if (
                    !nameElement ||
                    !emailElement ||
                    !phoneElement ||
                    !locationElement ||
                    !passwordElement ||
                    !packageSelect
                ) {

                    showAuthMessage(
                        "Registration form could not be loaded correctly.",
                        "error"
                    );

                    return;

                }


                const name =
                    nameElement.value.trim();


                const email =
                    emailElement.value.trim();


                const phone =
                    phoneElement.value.trim();


                const location =
                    locationElement.value.trim();


                const password =
                    passwordElement.value;


                if (
                    !name ||
                    !email ||
                    !phone ||
                    !location ||
                    !password ||
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

                            password: password,

                            options: {

                                data: {

                                    full_name: name,

                                    phone: phone,

                                    location: location,

                                    package_name:
                                        packageName,

                                    package_speed:
                                        speed,

                                    monthly_price:
                                        price

                                }

                            }

                        });


                    if (result.error) {

                        throw result.error;

                    }


                    const user =
                        result.data.user;


                    const session =
                        result.data.session;


                    if (!user) {

                        throw new Error(
                            "Account could not be created."
                        );

                    }



                    /* =====================================
                       SAVE CUSTOMER INFORMATION
                    ===================================== */

                    /*
                     * If email confirmation is enabled,
                     * Supabase may create the user without
                     * creating a session immediately.
                     *
                     * In that situation we do NOT attempt
                     * an unauthenticated database insert.
                     */

                    if (session) {

                        const customerData = {

                            id: user.id,

                            full_name: name,

                            phone: phone,

                            location: location,

                            package_name: packageName,

                            package_speed: speed,

                            monthly_price: price,

                            connection_status:
                                "pending"

                        };


                        const customerResult =
                            await supabaseClient
                                .from("customers")
                                .upsert(
                                    customerData
                                );


                        if (
                            customerResult.error
                        ) {

                            console.error(
                                "Customer database error:",
                                customerResult.error
                            );


                            showAuthMessage(
                                "Your account was created, but your customer information could not be saved. Please contact StreamSync Net.",
                                "error"
                            );

                            return;

                        }

                    }



                    /* =====================================
                       REGISTRATION SUCCESS
                    ===================================== */

                    registerForm.reset();


                    showAuthMessage(
                        session
                            ? "Account created successfully! You can now use your StreamSync Net account."
                            : "Account created successfully! Please check your email to confirm your account, then return here and log in.",
                        "success"
                    );


                    /*
                     * IMPORTANT:
                     * We DO NOT redirect the customer.
                     *
                     * The customer remains on the
                     * Customer Portal section.
                     */


                    if (session) {

                        registrationMode =
                            false;


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


                        if (authSwitch) {

                            authSwitch.textContent =
                                "Create Account";

                        }


                        if (authDescription) {

                            authDescription.textContent =
                                "Log in to your StreamSync Net account.";

                        }

                    }


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


                const emailElement =
                    document.getElementById(
                        "login-email"
                    );


                const passwordElement =
                    document.getElementById(
                        "login-password"
                    );


                if (
                    !emailElement ||
                    !passwordElement
                ) {

                    showAuthMessage(
                        "Login form could not be loaded correctly.",
                        "error"
                    );

                    return;

                }


                const email =
                    emailElement.value.trim();


                const password =
                    passwordElement.value;


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
       AUTH STATE CHANGE
    ===================================================== */

    supabaseClient.auth.onAuthStateChange(
        function (event, session) {

            console.log(
                "Authentication event:",
                event
            );


            if (session) {

                console.log(
                    "Customer session is active."
                );

            }

        }
    );



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
                    encodeURIComponent(
                        message
                    );


                window.open(
                    url,
                    "_blank"
                );

            }
        );

    }



    /* =====================================================
       CONTACT / INSTALLATION FORM
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


                const inputs =
                    contactForm.querySelectorAll(
                        "input"
                    );


                const name =
                    inputs[0]
                        ? inputs[0].value.trim()
                        : "";


                const phone =
                    inputs[1]
                        ? inputs[1].value.trim()
                        : "";


                const location =
                    inputs[2]
                        ? inputs[2].value.trim()
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
                        : "";


                if (
                    !name ||
                    !phone ||
                    !location ||
                    !packageSelect ||
                    !packageSelect.value
                ) {

                    alert(
                        "Please complete all required fields."
                    );

                    return;

                }


                let message =
                    "Hello StreamSync Net!%0A%0A" +

                    "I would like to request internet installation.%0A%0A" +

                    "Name: " +
                    encodeURIComponent(name) +

                    "%0APhone: " +
                    encodeURIComponent(phone) +

                    "%0ALocation: " +
                    encodeURIComponent(location) +

                    "%0APackage: " +
                    encodeURIComponent(packageName);


                if (additionalInfo) {

                    message +=
                        "%0AAdditional Information: " +
                        encodeURIComponent(
                            additionalInfo
                        );

                }


                const whatsappUrl =
                    "https://wa.me/254113916614?text=" +
                    message;


                window.open(
                    whatsappUrl,
                    "_blank"
                );

            }
        );

    }



    /* =====================================================
       LOG CURRENT PAGE
    ===================================================== */

    console.log(
        "StreamSync Net JavaScript loaded successfully."
    );

});
/* =========================================================
   CUSTOMER LOGIN / REGISTER TOGGLE
========================================================= */

function toggleCustomerAuth() {

    const loginForm = document.getElementById(
        "customer-login-form"
    );

    const registerForm = document.getElementById(
        "customer-register-form"
    );

    const authSwitch = document.getElementById(
        "auth-switch"
    );

    const authSwitchText = document.getElementById(
        "auth-switch-text"
    );

    const authDescription = document.getElementById(
        "auth-description"
    );

    const authMessage = document.getElementById(
        "auth-message"
    );


    if (!loginForm || !registerForm) {

        console.error(
            "Login or registration form was not found."
        );

        return;
    }


    const registrationOpen =
        registerForm.style.display !== "none";


    if (registrationOpen) {

        /* ==============================
           SHOW LOGIN
        ============================== */

        loginForm.style.display = "flex";

        registerForm.style.display = "none";


        if (authSwitchText) {

            authSwitchText.textContent =
                "Don't have an account?";

        }


        if (authSwitch) {

            authSwitch.textContent =
                "Create Account";

        }


        if (authDescription) {

            authDescription.textContent =
                "Log in to your StreamSync Net account.";

        }

    }

    else {

        /* ==============================
           SHOW REGISTRATION
        ============================== */

        loginForm.style.display = "none";

        registerForm.style.display = "flex";


        if (authSwitchText) {

            authSwitchText.textContent =
                "Already have an account?";

        }


        if (authSwitch) {

            authSwitch.textContent =
                "Login";

        }


        if (authDescription) {

            authDescription.textContent =
                "Create your StreamSync Net customer account.";

        }

    }


    /* Clear previous message */

    if (authMessage) {

        authMessage.style.display = "none";

        authMessage.textContent = "";

    }

}
