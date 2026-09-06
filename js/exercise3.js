// ================================
// Άσκηση 3 - Εξάσκηση στα Λάθη
// ================================

// --------------------------------
// Στοιχεία σελίδας
// --------------------------------

const exitButton = document.getElementById("exitButton");
const exitModal = document.getElementById("exitModal");
const confirmExit = document.getElementById("confirmExit");
const cancelExit = document.getElementById("cancelExit");


// --------------------------------
// Έξοδος
// --------------------------------

exitButton.addEventListener("click", function () {
    exitModal.style.display = "flex";
});

cancelExit.addEventListener("click", function () {
    exitModal.style.display = "none";
});

confirmExit.addEventListener("click", function () {
    window.location.href = "index.html";
});


// --------------------------------
// VexFlow
// --------------------------------

const VF = Vex.Flow;


// --------------------------------
// Λάθη από Άσκηση 1 + Άσκηση 2
// --------------------------------

const λαθηΝοτων =
    JSON.parse(
        localStorage.getItem("noteMistakes")
    ) || {};


// --------------------------------
// Αν δεν υπάρχουν λάθη
// --------------------------------

const εχειΛαθη =
    Object.keys(λαθηΝοτων).length > 0;


// --------------------------------
// Δημιουργία λίστας διαθέσιμων νοτών
// --------------------------------

const διαθέσιμεςΝοτες =
    νοτες.filter(function (νοτα) {

        return (
            ["Ντο", "Ρε", "Μι", "Φα", "Σολ", "Λα", "Σι"]
                .includes(νοτα.ονομα)
        );

    });


// --------------------------------
// Βάρη νοτών
// --------------------------------

function βαροςΝοτας(νοτα) {

    const λαθη =
        λαθηΝοτων[νοτα.ονομα] || 0;

    return 1 + λαθη * 3;

}


// --------------------------------
// Ρυθμίσεις Άσκησης 3
// --------------------------------

const settings =
    JSON.parse(
        localStorage.getItem("exercise3Settings")
    ) || {

        noteCount: 10,

        unlimited: false

    };

    // --------------------------------
// Ρύθμιση αχρωματοψίας
// --------------------------------

const colorBlindMode =
    localStorage.getItem("colorBlindSetting") === "true";

const συνολοΝοτων =
    settings.noteCount;

const απεριοριστηΑσκηση =
    settings.unlimited === true;


// --------------------------------
// Κατάσταση άσκησης
// --------------------------------

let τρεχουσαΝοτα = 0;

let σωστεςΑπαντησεις = 0;

let λαθοςΑπαντησεις = 0;

let επεξεργαζεταιΑπαντηση = false;

const αποτελεσματαΝοτων = [];

let λαθοςΝοτα = null;

// --------------------------------
// Δημιουργία φυσικής μελωδίας
// --------------------------------

const μελωδια = [];


// --------------------------------
// Πρώτη νότα
// --------------------------------

let προηγουμενηΝοτα =
    διαθέσιμεςΝοτες[
        Math.floor(
            Math.random() *
            διαθέσιμεςΝοτες.length
        )
    ];

μελωδια.push(
    προηγουμενηΝοτα
);


// --------------------------------
// Υπόλοιπες νότες
// --------------------------------

for (
    let i = 1;
    i < συνολοΝοτων;
    i++
) {

    const υποψηφιες = [];

    for (
        let j = 0;
        j < διαθέσιμεςΝοτες.length;
        j++
    ) {

        const υποψηφια =
            διαθέσιμεςΝοτες[j];


        const αποσταση =
            Math.abs(
                υποψηφια.midi -
                προηγουμενηΝοτα.midi
            );


        // Μικρές μουσικές αποστάσεις
        if (αποσταση <= 5) {

            // Αποφεύγουμε πολλές ίδιες
            // συνεχόμενες νότες

            const μηκος =
                μελωδια.length;

            if (
                μηκος >= 2 &&
                υποψηφια.midi ===
                    μελωδια[μηκος - 1].midi &&
                υποψηφια.midi ===
                    μελωδια[μηκος - 2].midi
            ) {

                continue;

            }


            υποψηφιες.push(
                υποψηφια
            );

        }

    }


    // --------------------------------
    // Αν δεν βρέθηκε κατάλληλη
    // --------------------------------

    if (υποψηφιες.length === 0) {

        υποψηφιες.push(
            ...διαθέσιμεςΝοτες
        );

    }


    // --------------------------------
    // Weighted επιλογή
    // --------------------------------

    let συνολικοΒαρος = 0;

    υποψηφιες.forEach(function (νοτα) {

        συνολικοΒαρος +=
            βαροςΝοτας(νοτα);

    });


    let τυχαιοςΑριθμος =
        Math.random() *
        συνολικοΒαρος;


    let επομενηΝοτα =
        υποψηφιες[0];


    for (
        let j = 0;
        j < υποψηφιες.length;
        j++
    ) {

        τυχαιοςΑριθμος -=
            βαροςΝοτας(
                υποψηφιες[j]
            );


        if (τυχαιοςΑριθμος <= 0) {

            επομενηΝοτα =
                υποψηφιες[j];

            break;

        }

    }


    μελωδια.push(
        επομενηΝοτα
    );


    προηγουμενηΝοτα =
        επομενηΝοτα;

}


// --------------------------------
// MIDI
// --------------------------------



const midiStatus =
    document.getElementById("midiStatus");


function λαβηMIDI(noteData) {

    if (
        τρεχουσαΝοτα >=
        συνολοΝοτων
    ) {

        return;

    }


    if (επεξεργαζεταιΑπαντηση) {

        return;

    }


    επεξεργαζεταιΑπαντηση = true;


    const midiNote =
        noteData.midiNote;


    const πατημενηΝοτα =
        νοτες.find(function (νοτα) {

            return (
                νοτα.midi === midiNote
            );

        });


    if (!πατημενηΝοτα) {

        επεξεργαζεταιΑπαντηση = false;

        return;

    }


    const σωστηΝοτα =
        μελωδια[τρεχουσαΝοτα];


    // --------------------------------
    // ΣΩΣΤΟ
    // --------------------------------

    if (
        πατημενηΝοτα.midi ===
        σωστηΝοτα.midi
    ) {

        σωστεςΑπαντησεις++;

        αποτελεσματαΝοτων[
            τρεχουσαΝοτα
        ] = true;

        λαθοςΝοτα = null;


        τρεχουσαΝοτα++;


        ενημερωσεΠροοδο();

        σχεδιασεΜελωδια();


        document.getElementById(
            "feedback"
        ).textContent =
            "✅ Σωστό!";


    }


    // --------------------------------
    // ΛΑΘΟΣ
    // --------------------------------

    else {

        λαθοςΑπαντησεις++;

        αποτελεσματαΝοτων[
            τρεχουσαΝοτα
        ] = false;


        // Αποθηκεύουμε τη λάθος νότα
        // που πάτησε ο μαθητής

        λαθοςΝοτα =
            πατημενηΝοτα;


        // Αποθηκεύουμε και αυτό
        // το νέο λάθος

        const νεαΛαθη =
            JSON.parse(
                localStorage.getItem(
                    "noteMistakes"
                )
            ) || {};


        νεαΛαθη[
            σωστηΝοτα.ονομα
        ] =
            (
                νεαΛαθη[
                    σωστηΝοτα.ονομα
                ] || 0
            ) + 1;


        localStorage.setItem(
            "noteMistakes",
            JSON.stringify(
                νεαΛαθη
            )
        );


        τρεχουσαΝοτα++;


        ενημερωσεΠροοδο();

        σχεδιασεΜελωδια();


        document.getElementById(
            "feedback"
        ).textContent =
            "❌ Λάθος! Ήταν " +
            σωστηΝοτα.ονομα;

    }


    // --------------------------------
    // Τέλος
    // --------------------------------

    if (
        τρεχουσαΝοτα >=
        συνολοΝοτων
    ) {

        setTimeout(
            ολοκληρωσεΑσκηση,
            1500
        );

        return;

    }


    setTimeout(function () {

        επεξεργαζεταιΑπαντηση =
            false;

    }, 300);

}


// --------------------------------
// Πρόοδος
// --------------------------------

function ενημερωσεΠροοδο() {

    document.getElementById(
        "progress"
    ).textContent =
        τρεχουσαΝοτα +
        " / " +
        συνολοΝοτων;

}


// --------------------------------
// Ολοκλήρωση
// --------------------------------

function ολοκληρωσεΑσκηση() {

    const stats =
        JSON.parse(
            localStorage.getItem(
                "exerciseStats"
            )
        ) || {

            exercise1: {
                attempts: 0,
                notes: 0,
                correct: 0,
                wrong: 0
            },

            exercise2: {
                attempts: 0,
                notes: 0,
                correct: 0,
                wrong: 0
            },

            exercise3: {
                attempts: 0,
                notes: 0,
                correct: 0,
                wrong: 0
            }

        };


    if (!stats.exercise3) {

        stats.exercise3 = {
            attempts: 0,
            notes: 0,
            correct: 0,
            wrong: 0
        };

    }


    stats.exercise3.attempts++;

    stats.exercise3.notes +=
        συνολοΝοτων;

    stats.exercise3.correct +=
        σωστεςΑπαντησεις;

    stats.exercise3.wrong +=
        λαθοςΑπαντησεις;


    localStorage.setItem(
        "exerciseStats",
        JSON.stringify(stats)
    );


    localStorage.setItem(
        "exerciseResults",
        JSON.stringify({

            total: συνολοΝοτων,

            correct:
                σωστεςΑπαντησεις,

            wrong:
                λαθοςΑπαντησεις

        })
    );


    localStorage.setItem(
        "exerciseType",
        "exercise3"
    );


    window.location.href =
        "pages/results.html";

}


// --------------------------------
// MIDI σύνδεση
// --------------------------------
async function συνδεσηMIDI() {

    if (!inputManager.isMIDI()) {

        midiStatus.textContent =
            "🎤 Μικρόφωνο: Επιλεγμένο";

        return;
    }


    try {

        const inputs =
            await inputManager.start(
                λαβηMIDI
            );


        if (inputs && inputs.length > 0) {

            midiStatus.textContent =
                "🟢 MIDI: Συνδεδεμένο";

        } else {

            midiStatus.textContent =
                "🔴 MIDI: Μη συνδεδεμένο";

        }

    } catch (error) {

        console.error(
            "Σφάλμα MIDI:",
            error
        );

        midiStatus.textContent =
            "🔴 MIDI: Μη συνδεδεμένο";

    }

}

// --------------------------------
// VexFlow
// --------------------------------

const div =
    document.getElementById("staff");


const renderer =
    new VF.Renderer(
        div,
        VF.Renderer.Backends.SVG
    );


renderer.resize(
    Math.min(
        500,
        window.innerWidth - 20
    ),
        300
);


const context =
    renderer.getContext();


// --------------------------------
// VexFlow νότες
// --------------------------------

let νοτεςΜελωδιας = [];

let σειρες = [];

const νοτεςΑναΣειρα = 10;


// --------------------------------
// Δημιουργία VexFlow νοτών
// --------------------------------

function ανανεωσεΝοτεςΜελωδιας() {

    νοτεςΜελωδιας =
        μελωδια.map(function (νοτα) {

            const staveNote =
                new VF.StaveNote({

                    keys: [νοτα.vex],

                    duration: "q"

                });

            staveNote.setStyle({

                fillStyle: "black",

                strokeStyle: "black"

            });

            return staveNote;

        });


    // --------------------------------
    // Χωρισμός σε σειρές
    // --------------------------------

    σειρες = [];

    for (
        let i = 0;
        i < νοτεςΜελωδιας.length;
        i += νοτεςΑναΣειρα
    ) {

        σειρες.push(
            νοτεςΜελωδιας.slice(
                i,
                i + νοτεςΑναΣειρα
            )
        );

    }

}


// --------------------------------
// Δημιουργία
// --------------------------------

ανανεωσεΝοτεςΜελωδιας();


// --------------------------------
// Renderer
// --------------------------------

const υψοςΑναΣειρα = 240;

const συνολικοΥψος =
    σειρες.length * υψοςΑναΣειρα + 100;

    renderer.resize(
    Math.min(
        500,
        window.innerWidth - 20
    ),
    συνολικοΥψος
);

// --------------------------------
// Σχεδίαση μελωδίας
// --------------------------------

function σχεδιασεΜελωδια() {

    // --------------------------------
    // Καθαρισμός
    // --------------------------------

    context.clearRect(
        0,
        0,
        500,
        συνολικοΥψος 

    );


    // --------------------------------
    // Σχεδιάζουμε κάθε σειρά
    // --------------------------------

    σειρες.forEach(function (
        σειρα,
        index
    ) {

        const y =
            80 +
            index *
            υψοςΑναΣειρα;


        // --------------------------------
        // Πεντάγραμμο
        // --------------------------------

        const stave =
            new VF.Stave(
                80,
                y,
                320
            );


        stave.addClef(
            "treble"
        );


        stave.setContext(
            context
        ).draw();


        // --------------------------------
        // Χρωματισμός
        // --------------------------------

        σειρα.forEach(function (
            note,
            localIndex
        ) {

            const globalIndex =
                index *
                νοτεςΑναΣειρα +
                localIndex;


            if (
                globalIndex <
                τρεχουσαΝοτα
            ) {

               if (
    αποτελεσματαΝοτων[
        globalIndex
    ] === true
) {

    const χρωμα =
        colorBlindMode
            ? "#0066FF"
            : "green";

    note.setStyle({

        fillStyle: χρωμα,

        strokeStyle: χρωμα

    });

}

                else {

                    note.setStyle({

                        fillStyle:
                            "black",

                        strokeStyle:
                            "black"

                    });

                }

            }

            else {

                note.setStyle({

                    fillStyle:
                        "black",

                    strokeStyle:
                        "black"

                });

            }

        });


        // --------------------------------
        // Κανονικό Voice
        // --------------------------------

        const voice =
            new VF.Voice({

                num_beats:
                    σειρα.length,

                beat_value: 4

            });


        voice.addTickables(
            σειρα
        );


        // --------------------------------
        // Λάθος νότα
        // --------------------------------

        let λαθοςVoice = null;


        const τελευταιαΑπαντηση =
            τρεχουσαΝοτα - 1;


        const αρχηΣειρας =
            index *
            νοτεςΑναΣειρα;


        const τελοςΣειρας =
            αρχηΣειρας +
            σειρα.length;


        const εχειΛαθοςΝοτα =
            λαθοςΝοτα &&
            τελευταιαΑπαντηση >= αρχηΣειρας &&
            τελευταιαΑπαντηση < τελοςΣειρας;


        if (εχειΛαθοςΝοτα) {

            const τοπικηΘεση =
                τελευταιαΑπαντηση -
                αρχηΣειρας;


            const tickables = [];


            for (
                let i = 0;
                i < σειρα.length;
                i++
            ) {

                if (
                    i === τοπικηΘεση
                ) {

                    const λαθος =
                        new VF.StaveNote({

                            keys: [
                                λαθοςΝοτα.vex
                            ],

                            duration: "q"

                        });


                    const χρωμαΛαθους =
    colorBlindMode
        ? "rgba(255, 140, 0, 0.75)"
        : "rgba(220, 0, 0, 0.81)";

λαθος.setStyle({

    fillStyle:
        χρωμαΛαθους,

    strokeStyle:
        χρωμαΛαθους

});


                    tickables.push(
                        λαθος
                    );

                }

                else {

                    tickables.push(
                        new VF.GhostNote({

                            duration: "q"

                        })
                    );

                }

            }


            λαθοςVoice =
                new VF.Voice({

                    num_beats:
                        σειρα.length,

                    beat_value: 4

                });


            λαθοςVoice.addTickables(
                tickables
            );

        }


        // --------------------------------
        // Formatter
        // --------------------------------

        const formatter =
            new VF.Formatter();


        if (λαθοςVoice) {

            formatter
                .joinVoices([
                    voice,
                    λαθοςVoice
                ])
                .format(
                    [
                        voice,
                        λαθοςVoice
                    ],
                    250
                );

        }

        else {

            formatter
                .joinVoices([
                    voice
                ])
                .format(
                    [voice],
                    250
                );

        }


        // --------------------------------
        // Κανονική μελωδία
        // --------------------------------

        voice.draw(
            context,
            stave
        );


        // --------------------------------
        // Λάθος νότα από πάνω
        // --------------------------------

        if (λαθοςVoice) {

            λαθοςVoice.draw(
                context,
                stave
            );

        }

    });

}


// --------------------------------
// Εκκίνηση
// --------------------------------

ενημερωσεΠροοδο();

συνδεσηMIDI();

σχεδιασεΜελωδια();