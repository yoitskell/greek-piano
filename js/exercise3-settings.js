// ================================
// Greek Piano - Ρυθμίσεις Άσκησης 3
// ================================


// --------------------------------
// Στοιχεία σελίδας
// --------------------------------

const noteSlider =
    document.getElementById("noteSlider");

const noteCount =
    document.getElementById("noteCount");

const unlimitedExercise =
    document.getElementById("unlimitedExercise");

const startExercise =
    document.getElementById("startExercise");


// --------------------------------
// Εμφάνιση πλήθους νοτών
// --------------------------------

noteSlider.addEventListener("input", function () {

    noteCount.textContent =
        noteSlider.value;

});


// --------------------------------
// Έναρξη Άσκησης
// --------------------------------

startExercise.addEventListener("click", function () {

    const settings = {

        noteCount:
            Number(noteSlider.value),

        unlimited:
            unlimitedExercise.checked

    };


    // --------------------------------
    // Αποθήκευση ρυθμίσεων
    // --------------------------------

    localStorage.setItem(
        "exercise3Settings",
        JSON.stringify(settings)
    );


    // --------------------------------
    // Μετάβαση στην Άσκηση 3
    // --------------------------------

window.location.href =
    "askisi3.html";

});