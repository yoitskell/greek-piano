
// ================================
// Greek Piano - Λογαριασμός
// ================================


// --------------------------------
// Στοιχεία σελίδας
// --------------------------------

const createAccountButton = document.getElementById("createAccountButton");
const loginButton = document.getElementById("loginButton");

const loginForm = document.getElementById("loginForm");
const cancelLogin = document.getElementById("cancelLogin");
const submitLogin = document.getElementById("submitLogin");
const loginMessage = document.getElementById("loginMessage");

const accountOptions = document.getElementById("accountOptions");

const createAccountForm = document.getElementById("createAccountForm");
const cancelCreateAccount = document.getElementById("cancelCreateAccount");
const submitCreateAccount = document.getElementById("submitCreateAccount");
const createAccountMessage = document.getElementById("createAccountMessage");


// --------------------------------
// Δημιουργία λογαριασμού
// --------------------------------

createAccountButton.addEventListener("click", function () {

    accountOptions.style.display = "none";
    createAccountForm.style.display = "flex";

});


// --------------------------------
// Επιστροφή από δημιουργία λογαριασμού
// --------------------------------

cancelCreateAccount.addEventListener("click", function () {

    createAccountForm.style.display = "none";
    accountOptions.style.display = "grid";
    createAccountMessage.textContent = "";

});


// --------------------------------
// Δημιουργία λογαριασμού
// --------------------------------

submitCreateAccount.addEventListener("click", function () {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (!username) {

        createAccountMessage.textContent =
            "⚠️ Συμπλήρωσε όνομα χρήστη.";

        return;

    }


    if (!password) {

        createAccountMessage.textContent =
            "⚠️ Συμπλήρωσε κωδικό.";

        return;

    }


    if (password !== confirmPassword) {

        createAccountMessage.textContent =
            "❌ Οι κωδικοί δεν ταιριάζουν.";

        return;

    }


    createAccountMessage.textContent =
        "ℹ️ Η δημιουργία λογαριασμού θα συνδεθεί με το σύστημα λογαριασμών αργότερα.";

});


// --------------------------------
// Σύνδεση
// --------------------------------

loginButton.addEventListener("click", function () {

    accountOptions.style.display = "none";
    loginForm.style.display = "flex";

});


// --------------------------------
// Επιστροφή από σύνδεση
// --------------------------------

cancelLogin.addEventListener("click", function () {

    loginForm.style.display = "none";
    accountOptions.style.display = "grid";
    loginMessage.textContent = "";

});


// --------------------------------
// Σύνδεση λογαριασμού
// --------------------------------

submitLogin.addEventListener("click", function () {

    const username =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value;


    if (!username) {

        loginMessage.textContent =
            "⚠️ Συμπλήρωσε όνομα χρήστη.";

        return;

    }


    if (!password) {

        loginMessage.textContent =
            "⚠️ Συμπλήρωσε κωδικό.";

        return;

    }


    loginMessage.textContent =
        "ℹ️ Η σύνδεση θα συνδεθεί με το σύστημα λογαριασμών αργότερα.";

});
