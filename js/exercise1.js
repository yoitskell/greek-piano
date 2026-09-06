let σωστηΝοτα;
let midiΕτοιμο = false;
let λαθοςΝοτα = null;

window.onload = function () {

    const settings =
        JSON.parse(localStorage.getItem("exercise1Settings"));

    console.log(settings);

    const χρωματαFeedback =
        appSettings.colorBlindMode
            ? {
                σωστο: "#0057B8",
                λαθος: "#E65C00"
            }
            : {
                σωστο: "green",
                λαθος: "red"
            };

    let τρεχουσαΕρωτηση = 1;
    let ολοκληρωμενεςΑπαντησεις = 0;
    let συνολοΕρωτησεων = settings.questions;
    let απεριοριστηΑσκηση = settings.forever || false;
    let σωστεςΑπαντησεις = 0;
    let λαθοςΑπαντησεις = 0;

    let συνολικεςΝοτες = 0;
    let συνολικεςΣωστες = 0;
    let συνολικαΛαθη = 0;

    let note;
    let ερωτησηΟλοκληρωθηκε = false;

    const VF = Vex.Flow;
    const div = document.getElementById("staff");

    const renderer = new VF.Renderer(
        div,
        VF.Renderer.Backends.SVG
    );

    renderer.resize(500, 200);

    const context = renderer.getContext();

    const stave = new VF.Stave(120, 40, 260);

    stave.addClef("treble");
    stave.setContext(context).draw();

    const ενεργεςΝοτες = νοτες.filter(function (νοτα) {

        let επιλεγμενηΝοτα = false;

        switch (νοτα.vex[0]) {

            case "c":
                επιλεγμενηΝοτα = settings.notes.c;
                break;

            case "d":
                επιλεγμενηΝοτα = settings.notes.d;
                break;

            case "e":
                επιλεγμενηΝοτα = settings.notes.e;
                break;

            case "f":
                επιλεγμενηΝοτα = settings.notes.f;
                break;

            case "g":
                επιλεγμενηΝοτα = settings.notes.g;
                break;

            case "a":
                επιλεγμενηΝοτα = settings.notes.a;
                break;

            case "b":
                επιλεγμενηΝοτα = settings.notes.b;
                break;
        }

        const οκταβα =
            Number(νοτα.vex.split("/")[1]);

        const επιλεγμενηΟκταβα =
            settings.octaves[οκταβα];

        return επιλεγμενηΝοτα && επιλεγμενηΟκταβα;
    });

    function ενημερωσεΠροοδο() {

        document.getElementById("progress").textContent =
            ολοκληρωμενεςΑπαντησεις +
            " / " +
            συνολοΕρωτησεων;
    }

    function ελεγξεΑπαντηση(ειναιΣωστη) {

        ολοκληρωμενεςΑπαντησεις++;
        συνολικεςΝοτες++;

        ενημερωσεΠροοδο();

        καταγραψεΣτατιστικαΝοτας(
            σωστηΝοτα,
            ειναιΣωστη
        );

        if (ειναιΣωστη) {

            σωστεςΑπαντησεις++;
            συνολικεςΣωστες++;

            note.setStyle({
                fillStyle: χρωματαFeedback.σωστο,
                strokeStyle: χρωματαFeedback.σωστο
            });

            context.clearRect(0, 0, 500, 200);
            stave.setContext(context).draw();
            σχεδιασεΝοτα();

            document.getElementById("feedback").textContent =
                "✅ Σωστό!";

        } else {

            λαθοςΑπαντησεις++;
            συνολικαΛαθη++;

            const δεδομεναΝοτων =
                JSON.parse(
                    localStorage.getItem("noteData")
                ) || {};

            const midi = σωστηΝοτα.midi;

            if (!δεδομεναΝοτων[midi]) {

                δεδομεναΝοτων[midi] = {
                    name: σωστηΝοτα.ονομα,
                    vex: σωστηΝοτα.vex,
                    played: 0,
                    correct: 0,
                    wrong: 0
                };
            }

            δεδομεναΝοτων[midi].played++;
            δεδομεναΝοτων[midi].wrong++;

            localStorage.setItem(
                "noteData",
                JSON.stringify(δεδομεναΝοτων)
            );

            const οκταβα =
                σωστηΝοτα.vex.split("/")[1];

            note.setStyle({
                fillStyle: "black",
                strokeStyle: "black"
            });

            context.clearRect(0, 0, 500, 200);
            stave.setContext(context).draw();

            σχεδιασεΝοτα();
            σχεδιασεΛαθοςΝοτα();

            document.getElementById("feedback").textContent =
                "❌ Λάθος! Ήταν " +
                σωστηΝοτα.ονομα +
                " " +
                οκταβα;
        }

        setTimeout(function () {
            επομενηΕρωτηση();
        }, 1500);
    }

    window.ελεγξεΝοτα = function (πατημενηΝοτα) {

        if (ερωτησηΟλοκληρωθηκε) {
            return;
        }

        ερωτησηΟλοκληρωθηκε = true;

        if (πατημενηΝοτα.midi === σωστηΝοτα.midi) {

            λαθοςΝοτα = null;
            ελεγξεΑπαντηση(true);

        } else {

            λαθοςΝοτα = πατημενηΝοτα;
            ελεγξεΑπαντηση(false);
        }
    };

    function επομενηΕρωτηση() {

        if (τρεχουσαΕρωτηση >= συνολοΕρωτησεων) {

            if (απεριοριστηΑσκηση) {

                τρεχουσαΕρωτηση = 1;
                ολοκληρωμενεςΑπαντησεις = 0;
                σωστεςΑπαντησεις = 0;
                λαθοςΑπαντησεις = 0;
                ερωτησηΟλοκληρωθηκε = false;

                ενημερωσεΠροοδο();
                εμφανισεΝοτα();

                return;
            }

            localStorage.setItem(
                "exerciseResults",
                JSON.stringify({
                    total: συνολοΕρωτησεων,
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

            if (!stats.exercise1) {

                stats.exercise1 = {
                    attempts: 0,
                    notes: 0,
                    correct: 0,
                    wrong: 0
                };
            }

            stats.exercise1.attempts++;
            stats.exercise1.notes += συνολοΕρωτησεων;
            stats.exercise1.correct += σωστεςΑπαντησεις;
            stats.exercise1.wrong += λαθοςΑπαντησεις;

            localStorage.setItem(
                "exerciseStats",
                JSON.stringify(stats)
            );

            window.location.href = "pages/results.html";

            return;
        }

        τρεχουσαΕρωτηση++;
        ερωτησηΟλοκληρωθηκε = false;

        ενημερωσεΠροοδο();
        εμφανισεΝοτα();
    }

    function σχεδιασεΝοτα() {

        const voice = new VF.Voice({
            num_beats: 1,
            beat_value: 4
        });

        voice.addTickables([note]);

        new VF.Formatter()
            .joinVoices([voice])
            .format([voice], 80);

        voice.draw(context, stave);
    }

    function σχεδιασεΛαθοςΝοτα() {

        if (!λαθοςΝοτα) {
            return;
        }

        const λαθος = new VF.StaveNote({
            keys: [λαθοςΝοτα.vex],
            duration: "q"
        });

        const χρωμαΛαθους =
            appSettings.colorBlindMode
                ? "rgba(230, 92, 0, 0.75)"
                : "rgba(220, 0, 0, 0.35)";

        λαθος.setStyle({
            fillStyle: χρωμαΛαθους,
            strokeStyle: χρωμαΛαθους
        });

        const voice = new VF.Voice({
            num_beats: 1,
            beat_value: 4
        });

        voice.addTickables([λαθος]);

        new VF.Formatter()
            .joinVoices([voice])
            .format([voice], 150);

        voice.draw(context, stave);
    }

    function εμφανισεΝοτα() {

        document.getElementById("feedback").textContent = "";

        context.clearRect(0, 0, 500, 200);
        stave.setContext(context).draw();

        σωστηΝοτα =
            ενεργεςΝοτες[
                Math.floor(
                    Math.random() * ενεργεςΝοτες.length
                )
            ];

        document.getElementById("noteName").textContent =
            settings.showNoteNames
                ? σωστηΝοτα.ονομα
                : "";

        note = new VF.StaveNote({
            keys: [σωστηΝοτα.vex],
            duration: "q"
        });

        σχεδιασεΝοτα();
    }

    αρχικοποιησηMIDI();
    εμφανισεΝοτα();
    ενημερωσεΠροοδο();

    const exitButton =
        document.querySelector(".exit-button");

    const exitModal =
        document.getElementById("exitModal");

    const confirmExit =
        document.getElementById("confirmExit");

    const cancelExit =
        document.getElementById("cancelExit");

    exitButton.addEventListener("click", function () {

        exitModal.style.display = "flex";
    });

    function αποθηκευσεΣτατιστικαΣυνεδριας() {

        if (συνολικεςΝοτες === 0) {
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
                },
                exercise3: {
                    attempts: 0,
                    notes: 0,
                    correct: 0,
                    wrong: 0
                }
            };

        if (!stats.exercise1) {

            stats.exercise1 = {
                attempts: 0,
                notes: 0,
                correct: 0,
                wrong: 0
            };
        }

        stats.exercise1.attempts++;
        stats.exercise1.notes += συνολικεςΝοτες;
        stats.exercise1.correct += συνολικεςΣωστες;
        stats.exercise1.wrong += συνολικαΛαθη;

        localStorage.setItem(
            "exerciseStats",
            JSON.stringify(stats)
        );
    }

    confirmExit.addEventListener("click", function () {

        if (απεριοριστηΑσκηση) {
            αποθηκευσεΣτατιστικαΣυνεδριας();
        }

        window.location.href = "index.html";
    });

    cancelExit.addEventListener("click", function () {

        exitModal.style.display = "none";
    });

    exitModal.addEventListener("click", function (event) {

        if (event.target === exitModal) {
            exitModal.style.display = "none";
        }
    });
};


// Στατιστικά ανά συγκεκριμένη νότα

function καταγραψεΣτατιστικαΝοτας(νοτα, ειναιΣωστη) {

    const noteStats =
        JSON.parse(
            localStorage.getItem("noteStats")
        ) || {};

    const midi = String(νοτα.midi);

    if (!noteStats[midi]) {

        noteStats[midi] = {
            name: νοτα.ονομα,
            vex: νοτα.vex,
            played: 0,
            correct: 0,
            wrong: 0
        };
    }

    noteStats[midi].played++;

    if (ειναιΣωστη) {
        noteStats[midi].correct++;
    } else {
        noteStats[midi].wrong++;
    }

    localStorage.setItem(
        "noteStats",
        JSON.stringify(noteStats)
    );
}

async function αρχικοποιησηMIDI() {

    if (!inputManager.isMIDI()) {

        document.getElementById("midiStatus").textContent =
            "🎤 Μικρόφωνο: Επιλεγμένο";

        midiΕτοιμο = false;

        return;
    }


    try {

        console.log(
            "Ζητάω πρόσβαση MIDI μέσω Input Manager..."
        );


        const εισοδοι =
    await inputManager.start(
        function (noteData) {

            const νοτα =
                midiΣεΕλληνικηΝοτα(
                    noteData.midiNote
                );

            console.log(
                "Είσοδος:",
                noteData.midiNote,
                "→",
                νοτα
            );

            if (νοτα) {

                window.ελεγξεΝοτα(νοτα);

            }

        }
    );


        console.log(
            "MIDI inputs:",
            εισοδοι.length
        );


        if (εισοδοι.length === 0) {

            document.getElementById("midiStatus").textContent =
                "🔴 MIDI: Μη συνδεδεμένο";

            midiΕτοιμο = false;

            return;
        }


        midiΕτοιμο = true;


        document.getElementById("midiStatus").textContent =
            "🟢 MIDI: Συνδεδεμένο (" +
            εισοδοι[0].name +
            ")";


    } catch (error) {

        console.error(
            "Σφάλμα MIDI:",
            error
        );


        midiΕτοιμο = false;


        document.getElementById("midiStatus").textContent =
            "❌ MIDI: Σφάλμα σύνδεσης";

    }

}

function midiΣεΕλληνικηΝοτα(midiNote) {

    return νοτες.find(function (note) {
        return note.midi === midiNote;
    }) || null;
}

