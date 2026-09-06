// ==================================
// Greek Piano - Ρυθμίσεις Άσκησης 2
// ==================================

// ----------------------------------
// Στοιχεία σελίδας
// ----------------------------------

const noteSlider = document.getElementById("noteSlider");
const noteCount = document.getElementById("noteCount");
const startExercise = document.getElementById("startExercise");
const unlimitedExercise = document.getElementById("unlimitedExercise");


// ----------------------------------
// Φόρτωση προηγούμενων ρυθμίσεων
// ----------------------------------

const αποθηκευμενεςΡυθμισεις =
    JSON.parse(
        localStorage.getItem("exercise2Settings")
    );

if (αποθηκευμενεςΡυθμισεις) {

    noteSlider.value =
        αποθηκευμενεςΡυθμισεις.noteCount;

    noteCount.textContent =
        αποθηκευμενεςΡυθμισεις.noteCount;


    const octaveCheckboxes =
        document.querySelectorAll(
            'input[name="octave"]'
        );

    octaveCheckboxes.forEach(function (checkbox) {

        checkbox.checked =
            αποθηκευμενεςΡυθμισεις.octaveRange.includes(
                Number(checkbox.value)
            );

    });


    document.getElementById("showNoteNames").checked =
        αποθηκευμενεςΡυθμισεις.showNoteNames;


    if (
        αποθηκευμενεςΡυθμισεις.unlimited !== undefined
    ) {

        unlimitedExercise.checked =
            αποθηκευμενεςΡυθμισεις.unlimited;

    }

}


// ----------------------------------
// Ενημέρωση πλήθους νοτών
// ----------------------------------

noteSlider.addEventListener(
    "input",
    function () {

        noteCount.textContent =
            noteSlider.value;

    }
);


// ----------------------------------
// Έναρξη Άσκησης
// ----------------------------------

startExercise.addEventListener(
    "click",
    function () {

        const octaveCheckboxes =
            document.querySelectorAll(
                'input[name="octave"]:checked'
            );


        const octaveRange =
            Array.from(octaveCheckboxes).map(
                function (checkbox) {

                    return Number(checkbox.value);

                }
            );


        if (octaveRange.length === 0) {

            alert(
                "Επίλεξε τουλάχιστον μία οκτάβα."
            );

            return;

        }


        const settings = {

            noteCount:
                Number(noteSlider.value),

            octaveRange:
                octaveRange,

            showNoteNames:
                document.getElementById(
                    "showNoteNames"
                ).checked,

            unlimited:
                unlimitedExercise.checked

        };


        localStorage.setItem(
            "exercise2Settings",
            JSON.stringify(settings)
        );


        window.location.href =
            "askisi2.html";

    }
);