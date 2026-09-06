const backButton = document.getElementById("backButton");

if (backButton) {

    backButton.addEventListener("click", function () {

        window.location.href = "../index.html";

    });

}

    // ================================
// Greek Piano - Στατιστικά
// ================================


// --------------------------------
// Φόρτωση στατιστικών
// --------------------------------

const αποθηκευμεναStats =
    JSON.parse(
        localStorage.getItem("exerciseStats")
    ) || {};


// --------------------------------
// Στατιστικά Άσκησης 1
// --------------------------------

const exercise1 =
    αποθηκευμεναStats.exercise1 || {

        attempts: 0,
        notes: 0,
        correct: 0,
        wrong: 0

    };


// --------------------------------
// Στατιστικά Άσκησης 2
// --------------------------------

const exercise2 =
    αποθηκευμεναStats.exercise2 || {

        attempts: 0,
        notes: 0,
        correct: 0,
        wrong: 0

    };

    // --------------------------------
// Στατιστικά Άσκησης 3
// --------------------------------

const exercise3 =
    αποθηκευμεναStats.exercise3 || {

        attempts: 0,
        notes: 0,
        correct: 0,
        wrong: 0

    };


// --------------------------------
// Συνολικά στατιστικά
// --------------------------------

const συνολικεςΠροσπαθειες =
    exercise1.attempts +
    exercise2.attempts +
    exercise3.attempts;


const συνολικεςΝοτες =
    exercise1.notes +
    exercise2.notes +
    exercise3.notes;


const συνολικεςΣωστες =
    exercise1.correct +
    exercise2.correct +
    exercise3.correct;


const συνολικεςΛαθος =
    exercise1.wrong +
    exercise2.wrong +
    exercise3.wrong;


// --------------------------------
// Ποσοστό
// --------------------------------

function υπολογισεΠοσοστο(correct, notes) {

    if (notes === 0) {
        return 0;
    }

    return Math.round(
        (correct / notes) * 100
    );

}


// --------------------------------
// Εμφάνιση συνολικών
// --------------------------------

document.getElementById("totalAttempts")
    .textContent = συνολικεςΠροσπαθειες;

document.getElementById("totalNotes")
    .textContent = συνολικεςΝοτες;

document.getElementById("totalCorrect")
    .textContent = συνολικεςΣωστες;

document.getElementById("totalWrong")
    .textContent = συνολικεςΛαθος;

document.getElementById("totalPercentage")
    .textContent =
        υπολογισεΠοσοστο(
            συνολικεςΣωστες,
            συνολικεςΝοτες
        ) + "%";


// --------------------------------
// Εμφάνιση Άσκησης 1
// --------------------------------

document.getElementById("exercise1Attempts")
    .textContent = exercise1.attempts;

document.getElementById("exercise1Notes")
    .textContent = exercise1.notes;

document.getElementById("exercise1Correct")
    .textContent = exercise1.correct;

document.getElementById("exercise1Wrong")
    .textContent = exercise1.wrong;

document.getElementById("exercise1Percentage")
    .textContent =
        υπολογισεΠοσοστο(
            exercise1.correct,
            exercise1.notes
        ) + "%";


// --------------------------------
// Εμφάνιση Άσκησης 2
// --------------------------------

document.getElementById("exercise2Attempts")
    .textContent = exercise2.attempts;

document.getElementById("exercise2Notes")
    .textContent = exercise2.notes;

document.getElementById("exercise2Correct")
    .textContent = exercise2.correct;

document.getElementById("exercise2Wrong")
    .textContent = exercise2.wrong;

document.getElementById("exercise2Percentage")
    .textContent =
        υπολογισεΠοσοστο(
            exercise2.correct,
            exercise2.notes
        ) + "%";

// --------------------------------
// Εμφάνιση Άσκησης 3
// --------------------------------

document.getElementById("exercise3Attempts")
    .textContent = exercise3.attempts;

document.getElementById("exercise3Notes")
    .textContent = exercise3.notes;

document.getElementById("exercise3Correct")
    .textContent = exercise3.correct;

document.getElementById("exercise3Wrong")
    .textContent = exercise3.wrong;

document.getElementById("exercise3Percentage")
    .textContent =
        υπολογισεΠοσοστο(
            exercise3.correct,
            exercise3.notes
        ) + "%";


// --------------------------------
// Επαναφορά στατιστικών
// --------------------------------

const resetStatsButton =
    document.getElementById("resetStatsButton");

if (resetStatsButton) {

    resetStatsButton.addEventListener(
        "click",
        function () {

            const επιβεβαιωση =
                confirm(
                    "Είσαι σίγουρος ότι θέλεις να διαγράψεις όλα τα στατιστικά και τα λάθη;"
                );

            if (!επιβεβαιωση) {
                return;
            }

            // Στατιστικά ασκήσεων
            localStorage.removeItem(
                "exerciseStats"
            );

            // Σωστά / λάθη ανά νότα
            localStorage.removeItem(
                "noteStats"
            );

            // Λάθη για την Άσκηση 3
            localStorage.removeItem(
                "noteMistakes"
            );

            // Παλιά δεδομένα στατιστικών
            localStorage.removeItem(
                "noteData"
            );

            // Ανανέωση σελίδας
            location.reload();

        }
    );

}