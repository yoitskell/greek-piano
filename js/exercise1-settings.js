const startButton = document.getElementById("startExercise");

// Φόρτωση προηγούμενων ρυθμίσεων

const αποθηκευμενεςΡυθμισεις =
    JSON.parse(localStorage.getItem("exercise1Settings"));

if (αποθηκευμενεςΡυθμισεις) {

    const noteIds = ["c", "d", "e", "f", "g", "a", "b"];

    noteIds.forEach(function (note) {

        document.getElementById("note" + note.toUpperCase()).checked =
            αποθηκευμενεςΡυθμισεις.notes[note];

    });

    [2, 3, 4, 5, 6].forEach(function (octave) {

        document.getElementById("octave" + octave).checked =
            αποθηκευμενεςΡυθμισεις.octaves[octave];

    });

    document.getElementById("questions").value =
        αποθηκευμενεςΡυθμισεις.questions;

    document.getElementById("showName").checked =
        αποθηκευμενεςΡυθμισεις.showName;
}


// Έναρξη Άσκησης

startButton.addEventListener("click", function () {

    const settings = {

        notes: {
            c: document.getElementById("noteC").checked,
            d: document.getElementById("noteD").checked,
            e: document.getElementById("noteE").checked,
            f: document.getElementById("noteF").checked,
            g: document.getElementById("noteG").checked,
            a: document.getElementById("noteA").checked,
            b: document.getElementById("noteB").checked
        },

        octaves: {
            2: document.getElementById("octave2").checked,
            3: document.getElementById("octave3").checked,
            4: document.getElementById("octave4").checked,
            5: document.getElementById("octave5").checked,
            6: document.getElementById("octave6").checked
        },

        questions:
            Number(document.getElementById("questions").value),

        forever:
            document.getElementById("forever").checked,

        showName:
            document.getElementById("showName").checked
    };

    localStorage.setItem(
        "exercise1Settings",
        JSON.stringify(settings)
    );

    window.location.href = "askisi1.html";

});