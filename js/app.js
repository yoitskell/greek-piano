
// ================================
// Greek Piano - Κεντρικό Μενού
// ================================


// --------------------------------
// Ρυθμίσεις Άσκησης 3
// --------------------------------

const ΟΡΙΟ_ΛΑΘΩΝ_ΑΣΚΗΣΗΣ_3 = 150;


// --------------------------------
// Στοιχεία Άσκησης 3
// --------------------------------

const exercise3Button =
    document.getElementById("exercise3Button");

const exercise3Message =
    document.getElementById("exercise3Message");

const closeExercise3Message =
    document.getElementById("closeExercise3Message");


// --------------------------------
// Υπολογισμός συνολικών λαθών
// --------------------------------

function συνολικαΛαθη() {

    const λαθηΝοτων =
        JSON.parse(
            localStorage.getItem("noteMistakes")
        ) || {};

    return Object.values(λαθηΝοτων).reduce(
        function (sum, note) {

            if (
                typeof note === "object" &&
                note !== null &&
                typeof note.wrong === "number"
            ) {
                return sum + note.wrong;
            }

            return sum;

        },
        0
    );

}


// --------------------------------
// Έλεγχος Άσκησης 3
// --------------------------------

function ενημερωσεΑσκηση3() {

    const συνολοΛαθων = συνολικαΛαθη();

    console.log(
        "Συνολικά λάθη:",
        συνολοΛαθων
    );


    // --------------------------------
    // Κουμπί Άσκησης 3
    // --------------------------------

    exercise3Button.disabled = false;

    if (συνολοΛαθων >= ΟΡΙΟ_ΛΑΘΩΝ_ΑΣΚΗΣΗΣ_3) {

        exercise3Button.onclick = function () {

            window.location.href =
                "askisi3-settings.html";

        };

    } else {

        exercise3Button.onclick = function () {

            exercise3Message.style.display = "flex";

        };

    }


    // --------------------------------
    // Κλείσιμο μηνύματος
    // --------------------------------

    closeExercise3Message.onclick = function () {

        exercise3Message.style.display = "none";

    };

}


// --------------------------------
// Εκκίνηση
// --------------------------------

ενημερωσεΑσκηση3();
