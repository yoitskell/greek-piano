// ================================
// Άσκηση 2 - Μικρές Μελωδίες
// ================================




// --------------------------------
// Στοιχεία σελίδας
// --------------------------------

const exitButton = document.getElementById("exitButton");
const exitModal = document.getElementById("exitModal");
const confirmExit = document.getElementById("confirmExit");
const cancelExit = document.getElementById("cancelExit");


// --------------------------------
// Κουμπί εξόδου
// --------------------------------

exitButton.addEventListener("click", function () {

    exitModal.style.display = "flex";

});


// --------------------------------
// Ακύρωση εξόδου
// --------------------------------

cancelExit.addEventListener("click", function () {

    exitModal.style.display = "none";

});


// --------------------------------
// Επιβεβαίωση εξόδου
// --------------------------------

confirmExit.addEventListener("click", function () {

    // --------------------------------
    // Αποθήκευση συνολικών στατιστικών συνεδρίας
    // --------------------------------

    αποθηκευσεΣτατιστικαΣυνεδριας();


    // --------------------------------
    // Επιστροφή στο κεντρικό μενού
    // --------------------------------

    window.location.href = "index.html";

});

// --------------------------------
// Αποθήκευση στατιστικών συνεδρίας
// --------------------------------

function αποθηκευσεΣτατιστικαΣυνεδριας() {

    if (συνολικεςΝοτεςΣυνεδριας === 0) {
        return;
    }

    const stats =
        JSON.parse(
            localStorage.getItem("exerciseStats")
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
            }

        };


    if (!stats.exercise2) {

        stats.exercise2 = {
            attempts: 0,
            notes: 0,
            correct: 0,
            wrong: 0
        };

    }


    // Μία νέα συνεδρία
    stats.exercise2.attempts++;


    // Όλες οι νότες της συνεδρίας
    stats.exercise2.notes +=
        συνολικεςΝοτεςΣυνεδριας;


    // Όλες οι σωστές απαντήσεις
    stats.exercise2.correct +=
        συνολικεςΣωστεςΣυνεδριας;


    // Όλα τα λάθη
    stats.exercise2.wrong +=
        συνολικαΛαθηΣυνεδριας;


    localStorage.setItem(
        "exerciseStats",
        JSON.stringify(stats)
    );

}

// --------------------------------
// VexFlow
// --------------------------------

const VF = Vex.Flow;

const colorBlindMode = appSettings.colorBlindMode;
// --------------------------------
// Ρυθμίσεις Άσκησης 2
// --------------------------------

const settings = JSON.parse(
    localStorage.getItem("exercise2Settings")
);

const συνολοΝοτων = settings
    ? settings.noteCount
    : 10;

const απεριοριστηΑσκηση =
    settings && settings.unlimited === true;

// --------------------------------
// Πρόοδος άσκησης
// --------------------------------

let ολοκληρωμενεςΝοτες = 0;
const αποτελεσματαΝοτων = [];

function ενημερωσεΠροοδο() {

    document.getElementById("topProgress").textContent =
        ολοκληρωμενεςΝοτες + " / " + συνολοΝοτων;

    document.getElementById("progress").textContent =
        ολοκληρωμενεςΝοτες + " / " + συνολοΝοτων;
}

ενημερωσεΠροοδο();

// --------------------------------
// Δημιουργία τυχαίας μελωδίας
// --------------------------------

// --------------------------------
// Διαθέσιμες νότες
// --------------------------------

const επιτρεπομενεςΟκταβες = settings
    ? settings.octaveRange
    : [4];


const διαθεσιμεςΝοτες = νοτες.filter(function (νοτα) {

    const οκταβα =
        Number(νοτα.vex.split("/")[1]);

    return (
        επιτρεπομενεςΟκταβες.includes(οκταβα) &&
        ["c", "d", "e", "f", "g"].includes(
            νοτα.vex.split("/")[0]
        )
    );

});

δημιουργησεΜελωδια();



// --------------------------------
// Δημιουργία τυχαίας μελωδίας
// --------------------------------

function δημιουργησεΜελωδια() {

    μελωδια = [];

    // --------------------------------
    // Πρώτη νότα
    // --------------------------------

    let τρεχουσαΘεση =
        Math.floor(
            Math.random() * διαθεσιμεςΝοτες.length
        );

    μελωδια.push(
        διαθεσιμεςΝοτες[τρεχουσαΘεση]
    );


    // --------------------------------
    // Επόμενες νότες
    // --------------------------------

    for (let i = 1; i < συνολοΝοτων; i++) {

        const τρεχουσαΝοτα =
            διαθεσιμεςΝοτες[τρεχουσαΘεση];

        const πιθανεςΘεσεις = [];


        // --------------------------------
        // Βρίσκουμε μουσικά κοντινές νότες
        // --------------------------------

        for (
            let index = 0;
            index < διαθεσιμεςΝοτες.length;
            index++
        ) {

            const υποψηφιαΝοτα =
                διαθεσιμεςΝοτες[index];


            const αποσταση =
                Math.abs(
                    υποψηφιαΝοτα.midi -
                    τρεχουσαΝοτα.midi
                );


            // --------------------------------
            // Κρατάμε μόνο λογικές αποστάσεις
            // --------------------------------

            if (αποσταση <= 5) {

                // Έλεγχος για 4 ίδιες συνεχόμενες
                const μηκος = μελωδια.length;

                if (
                    αποσταση === 0 &&
                    μηκος >= 3 &&
                    μελωδια[μηκος - 1].vex === υποψηφιαΝοτα.vex &&
                    μελωδια[μηκος - 2].vex === υποψηφιαΝοτα.vex &&
                    μελωδια[μηκος - 3].vex === υποψηφιαΝοτα.vex
                ) {

                    continue;

                }

                πιθανεςΘεσεις.push(index);

            }

        }


        // --------------------------------
        // Αν υπάρχουν κοντινές νότες
        // --------------------------------

        if (πιθανεςΘεσεις.length > 0) {

            const τυχαιαΘεση =
                πιθανεςΘεσεις[
                    Math.floor(
                        Math.random() *
                        πιθανεςΘεσεις.length
                    )
                ];

            τρεχουσαΘεση = τυχαιαΘεση;

        }


        // --------------------------------
        // Αν δεν υπάρχει κοντινή νότα
        // --------------------------------

        else {

            let κοντινοτερηΘεση = 0;
            let μικροτερηΑποσταση = Infinity;


            for (
                let index = 0;
                index < διαθεσιμεςΝοτες.length;
                index++
            ) {

                const υποψηφιαΝοτα =
                    διαθεσιμεςΝοτες[index];


                const αποσταση =
                    Math.abs(
                        υποψηφιαΝοτα.midi -
                        τρεχουσαΝοτα.midi
                    );


                if (αποσταση < μικροτερηΑποσταση) {

                    μικροτερηΑποσταση =
                        αποσταση;

                    κοντινοτερηΘεση =
                        index;

                }

            }


            τρεχουσαΘεση =
                κοντινοτερηΘεση;

        }


        μελωδια.push(
            διαθεσιμεςΝοτες[τρεχουσαΘεση]
        );

    }

}

// --------------------------------
// Κατάσταση άσκησης
// --------------------------------

// Ποια νότα περιμένουμε να παίξει ο μαθητής
let τρεχουσαΝοτα = 0;

// Σωστές και λάθος απαντήσεις
let σωστεςΑπαντησεις = 0;
let λαθοςΑπαντησεις = 0;

// --------------------------------
// Συνολικά δεδομένα συνεδρίας
// --------------------------------

let συνολικεςΝοτεςΣυνεδριας = 0;
let συνολικεςΣωστεςΣυνεδριας = 0;
let συνολικαΛαθηΣυνεδριας = 0;

// Λάθος νότα που εμφανίζεται προσωρινά
let λαθοςΝοτα = null;
let επεξεργαζεταιΑπαντηση = false;


// --------------------------------
// MIDI
// --------------------------------


const midiStatus =
    document.getElementById("midiStatus");


// --------------------------------
// Λήψη MIDI μηνύματος
// --------------------------------

function λαβηMIDI(noteData) {

    if (τρεχουσαΝοτα >= συνολοΝοτων) {
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

            return νοτα.midi === midiNote;

        });

    if (!πατημενηΝοτα) {

        επεξεργαζεταιΑπαντηση = false;

        return;

    }

    const σωστηΝοτα =
        μελωδια[τρεχουσαΝοτα];

    if (πατημενηΝοτα.midi === σωστηΝοτα.midi) {

        σωστεςΑπαντησεις++;
        συνολικεςΝοτεςΣυνεδριας++;
        συνολικεςΣωστεςΣυνεδριας++;

        αποτελεσματαΝοτων[τρεχουσαΝοτα] = true;

        const noteStats =
            JSON.parse(
                localStorage.getItem("noteStats")
            ) || {};

        const midi =
            String(σωστηΝοτα.midi);

        if (!noteStats[midi]) {
            noteStats[midi] = {
                name: σωστηΝοτα.ονομα,
                vex: σωστηΝοτα.vex,
                played: 0,
                correct: 0,
                wrong: 0
            };
        }

        noteStats[midi].played++;
        noteStats[midi].correct++;

        localStorage.setItem(
            "noteStats",
            JSON.stringify(noteStats)
        );

        λαθοςΝοτα = null;

        τρεχουσαΝοτα++;

        ολοκληρωμενεςΝοτες++;

        ενημερωσεΠροοδο();

        σχεδιασεΜελωδια();

        console.log("ΣΩΣΤΟ!");

        if (τρεχουσαΝοτα >= συνολοΝοτων) {

            επεξεργαζεταιΑπαντηση = false;

            if (απεριοριστηΑσκηση) {

                setTimeout(function () {

                    δημιουργησεΜελωδια();

                    τρεχουσαΝοτα = 0;

                    ολοκληρωμενεςΝοτες = 0;

                    σωστεςΑπαντησεις = 0;
                    λαθοςΑπαντησεις = 0;

                    αποτελεσματαΝοτων.length = 0;

                    λαθοςΝοτα = null;

                    ανανεωσεΝοτεςΜελωδιας();

                    σχεδιασεΜελωδια();

                    ενημερωσεΠροοδο();

                    επεξεργαζεταιΑπαντηση = false;

                }, 1500);

                return;
            }

            setTimeout(function () {

                ολοκληρωσεΑσκηση();

            }, 2100);

            return;
        }

    } else {

        λαθοςΑπαντησεις++;
        συνολικεςΝοτεςΣυνεδριας++;
        συνολικαΛαθηΣυνεδριας++;

        const noteStats =
            JSON.parse(
                localStorage.getItem("noteStats")
            ) || {};

        const midi =
            String(σωστηΝοτα.midi);

        if (!noteStats[midi]) {
            noteStats[midi] = {
                name: σωστηΝοτα.ονομα,
                vex: σωστηΝοτα.vex,
                played: 0,
                correct: 0,
                wrong: 0
            };
        }

        noteStats[midi].played++;
        noteStats[midi].wrong++;

        localStorage.setItem(
            "noteStats",
            JSON.stringify(noteStats)
        );

        const noteMistakes =
            JSON.parse(
                localStorage.getItem("noteMistakes")
            ) || {};

        const ονομαΝοτας =
            σωστηΝοτα.ονομα;

        if (!noteMistakes[ονομαΝοτας]) {
            noteMistakes[ονομαΝοτας] = {
                wrong: 0
            };
        }

        noteMistakes[ονομαΝοτας].wrong++;

        localStorage.setItem(
            "noteMistakes",
            JSON.stringify(noteMistakes)
        );

        αποτελεσματαΝοτων[τρεχουσαΝοτα] = false;

        λαθοςΝοτα = πατημενηΝοτα;

        τρεχουσαΝοτα++;

        ολοκληρωμενεςΝοτες++;

        ενημερωσεΠροοδο();

        σχεδιασεΜελωδια();

        console.log("ΛΑΘΟΣ!");

        if (τρεχουσαΝοτα >= συνολοΝοτων) {

            επεξεργαζεταιΑπαντηση = false;

            if (απεριοριστηΑσκηση) {

                setTimeout(function () {

                    δημιουργησεΜελωδια();

                    τρεχουσαΝοτα = 0;

                    ολοκληρωμενεςΝοτες = 0;

                    σωστεςΑπαντησεις = 0;
                    λαθοςΑπαντησεις = 0;

                    αποτελεσματαΝοτων.length = 0;

                    λαθοςΝοτα = null;

                    ανανεωσεΝοτεςΜελωδιας();

                    σχεδιασεΜελωδια();

                    ενημερωσεΠροοδο();

                    επεξεργαζεταιΑπαντηση = false;

                }, 1500);

                return;
            }

            setTimeout(function () {

                localStorage.setItem(
                    "exerciseResults",
                    JSON.stringify({
                        total: συνολοΝοτων,
                        correct: σωστεςΑπαντησεις,
                        wrong: λαθοςΑπαντησεις
                    })
                );

                const stats =
                    JSON.parse(
                        localStorage.getItem("exerciseStats")
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
                        }

                    };

                if (!stats.exercise2) {
                    stats.exercise2 = {
                        attempts: 0,
                        notes: 0,
                        correct: 0,
                        wrong: 0
                    };
                }

                stats.exercise2.attempts++;
                stats.exercise2.notes += συνολοΝοτων;
                stats.exercise2.correct += σωστεςΑπαντησεις;
                stats.exercise2.wrong += λαθοςΑπαντησεις;

                localStorage.setItem(
                    "exerciseStats",
                    JSON.stringify(stats)
                );

                localStorage.setItem(
                    "exerciseType",
                    "exercise2"
                );

                window.location.href =
                    "pages/results.html";

            }, 2100);

            return;
        }

    }

    επεξεργαζεταιΑπαντηση = false;
}



// --------------------------------
// Σύνδεση MIDI
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


συνδεσηMIDI();


// --------------------------------
// Δημιουργία VexFlow νοτών
// --------------------------------

let νοτεςΜελωδιας = [];

let σειρες = [];

const νοτεςΑναΣειρα = 10;


function ανανεωσεΝοτεςΜελωδιας() {

    // --------------------------------
    // Δημιουργία VexFlow νοτών
    // --------------------------------

    νοτεςΜελωδιας = μελωδια.map(function (νοτα) {

        const staveNote = new VF.StaveNote({

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
    // Χωρισμός μελωδίας σε σειρές
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

ανανεωσεΝοτεςΜελωδιας();


// --------------------------------
// VexFlow
// --------------------------------


const div = document.getElementById("staff");


// Ύψος ανάλογα με τον αριθμό σειρών

const υψοςΑναΣειρα =
    settings && settings.showNoteNames
        ? 260
        : 240;

const συνολικοΥψος =
    σειρες.length * υψοςΑναΣειρα + 100;


const renderer = new VF.Renderer(
    div,
    VF.Renderer.Backends.SVG
);


const πλατοςRenderer =
    Math.min(
        500,
        window.innerWidth - 20
    );


renderer.resize(
    πλατοςRenderer,
    συνολικοΥψος
);


const context = renderer.getContext();


// --------------------------------
// Σχεδίαση μελωδίας
// --------------------------------

function σχεδιασεΜελωδια() {

    // Καθαρίζουμε το προηγούμενο πεντάγραμμο
    context.clearRect(
        0,
        0,
        500,
        συνολικοΥψος
    );

    σειρες.forEach(function (σειρα, index) {

        const y =
            80 + index * υψοςΑναΣειρα;

        const πλατοςΠενταγραμμου =
            settings && settings.showNoteNames
                ? 400
                : 320;

        const stave = new VF.Stave(
            80,
            y,
            πλατοςΠενταγραμμου
        );

        stave.addClef("treble");

        stave.setContext(context).draw();


        // --------------------------------
        // Χρωματισμός κανονικών νοτών
        // --------------------------------

        σειρα.forEach(function (note, localIndex) {

            const globalIndex =
                index * νοτεςΑναΣειρα + localIndex;

            // Ήδη παιγμένη νότα
            if (globalIndex < τρεχουσαΝοτα) {

                // Σωστή απάντηση
if (
    αποτελεσματαΝοτων[globalIndex] === true
) {

    if (colorBlindMode) {

        note.setStyle({
            fillStyle: "#0072B2",
            strokeStyle: "#0072B2"
        });

    } else {

        note.setStyle({
            fillStyle: "#008000",
            strokeStyle: "#008000"
        });

    }

}

                // Λάθος απάντηση
                else {

                    note.setStyle({
                        fillStyle: "black",
                        strokeStyle: "black"
                    });

                }

            }

            // Νότα που δεν έχει παιχτεί ακόμα
            else {

                note.setStyle({
                    fillStyle: "black",
                    strokeStyle: "black"
                });

            }

        });


        // --------------------------------
        // Κανονικό Voice
        // --------------------------------

        const voice = new VF.Voice({

            num_beats: σειρα.length,

            beat_value: 4

        });

        voice.addTickables(σειρα);


        // --------------------------------
        // Voice για τη λάθος νότα
        // --------------------------------

        let λαθοςVoice = null;

        const εχειΛαθοςΝοταΣεΑυτηΤηΣειρα =
            λαθοςΝοτα &&
            τρεχουσαΝοτα - 1 >=
                index * νοτεςΑναΣειρα &&
            τρεχουσαΝοτα - 1 <
                index * νοτεςΑναΣειρα + σειρα.length;


        if (εχειΛαθοςΝοταΣεΑυτηΤηΣειρα) {

            const τοπικηΘεση =
                (τρεχουσαΝοτα - 1) -
                (index * νοτεςΑναΣειρα);


            const tickables = [];


            for (
                let i = 0;
                i < σειρα.length;
                i++
            ) {

                // Στη συγκεκριμένη θέση βάζουμε
                // την πραγματική λάθος νότα.
                if (i === τοπικηΘεση) {

                    const λαθος =
                        new VF.StaveNote({

                            keys: [
                                λαθοςΝοτα.vex
                            ],

                            duration: "q"

                        });


               if (colorBlindMode) {

    λαθος.setStyle({

        fillStyle:
            "rgba(213, 94, 0, 0.75)",

        strokeStyle:
            "rgba(213, 94, 0, 0.75)"

    });

} else {

    λαθος.setStyle({

        fillStyle:
            "rgba(220, 0, 0, 0.55)",

        strokeStyle:
            "rgba(220, 0, 0, 0.55)"

    });

}


                    tickables.push(λαθος);

                }

                // Όλες οι υπόλοιπες θέσεις
                // είναι αόρατες.
                else {

                    tickables.push(
                        new VF.GhostNote({

                            duration: "q"

                        })
                    );

                }

            }


            λαθοςVoice = new VF.Voice({

                num_beats: σειρα.length,

                beat_value: 4

            });


            λαθοςVoice.addTickables(
                tickables
            );

        }


        // --------------------------------
        // Μορφοποίηση
        // --------------------------------

        const πλατοςΝοτων =
            settings && settings.showNoteNames
                ? 350
                : 250;


        const formatter =
            new VF.Formatter();


        if (λαθοςVoice) {

            // Πολύ σημαντικό:
            // Μορφοποιούμε και τα δύο voices
            // μαζί ώστε οι νότες να έχουν
            // ακριβώς τις ίδιες θέσεις.

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
                    πλατοςΝοτων
                );

        } else {

            formatter
                .joinVoices([voice])
                .format(
                    [voice],
                    πλατοςΝοτων
                );

        }


        // --------------------------------
        // Σχεδιάζουμε την κανονική μελωδία
        // --------------------------------

        voice.draw(
            context,
            stave
        );


        // --------------------------------
        // Σχεδιάζουμε τη λάθος νότα
        // ΠΑΝΩ από την κανονική
        // --------------------------------

        if (λαθοςVoice) {

            λαθοςVoice.draw(
                context,
                stave
            );

        }


        // --------------------------------
        // Εμφάνιση ονομάτων νοτών
        // --------------------------------

        if (settings && settings.showNoteNames) {

            σειρα.forEach(function (note) {

                const x =
                    note.getAbsoluteX();

                const y =
                    note.getYs()[0];


                const globalIndex =
                    index * νοτεςΑναΣειρα +
                    σειρα.indexOf(note);


                const νοτα =
                    μελωδια[globalIndex];


                context.setFont(
                    "12px Arial",
                    "normal",
                    "normal"
                );


                context.fillText(
                    νοτα.ονομα,
                    x - 8,
                    y - 45
                );

            });

        }

    });

}

// --------------------------------
// Αρχική εμφάνιση
// --------------------------------

σχεδιασεΜελωδια();

