// ================================
// Greek Piano - Τρόπος Σύνδεσης
// ================================


// --------------------------------
// Στοιχεία σελίδας
// --------------------------------

const midiInputMode =
    document.getElementById("midiInputMode");

const microphoneInputMode =
    document.getElementById("microphoneInputMode");

const connectionTestButton =
    document.getElementById("connectionTestButton");

const connectionTestStatus =
    document.getElementById("connectionTestStatus");


// --------------------------------
// Φόρτωση αποθηκευμένου τρόπου σύνδεσης
// --------------------------------

if (appSettings.inputMode === "microphone") {

    microphoneInputMode.checked = true;

    connectionTestStatus.textContent =
        "🎤 Επιλέχθηκε Μικρόφωνο";

} else {

    midiInputMode.checked = true;

    connectionTestStatus.textContent =
        "🎹 Επιλέχθηκε MIDI";

}


// --------------------------------
// Επιλογή τρόπου σύνδεσης
// --------------------------------

midiInputMode.addEventListener(
    "change",
    function () {

        if (!midiInputMode.checked) {
            return;
        }

        appSettings.inputMode = "midi";

        localStorage.setItem(
            "appSettings",
            JSON.stringify(appSettings)
        );

        connectionTestStatus.textContent =
            "🎹 Επιλέχθηκε MIDI";

    }
);


microphoneInputMode.addEventListener(
    "change",
    function () {

        if (!microphoneInputMode.checked) {
            return;
        }

        appSettings.inputMode = "microphone";

        localStorage.setItem(
            "appSettings",
            JSON.stringify(appSettings)
        );

        connectionTestStatus.textContent =
            "🎤 Επιλέχθηκε Μικρόφωνο";

    }
);


// --------------------------------
// Κουμπί ελέγχου
// --------------------------------

// --------------------------------
// Κουμπί ελέγχου
// --------------------------------

connectionTestButton.addEventListener(
    "click",
    async function () {

        if (midiInputMode.checked) {

            try {

                const inputs =
                    await inputManager.start(
                        function () {}
                    );


                if (inputs && inputs.length > 0) {

                    connectionTestStatus.textContent =
                        "🟢 MIDI: Συνδεδεμένο";

                } else {

                    connectionTestStatus.textContent =
                        "🔴 MIDI: Μη συνδεδεμένο";

                }

            } catch (error) {

                console.error(
                    "Σφάλμα MIDI:",
                    error
                );

                connectionTestStatus.textContent =
                    "🔴 MIDI: Μη συνδεδεμένο";

            }

            return;

        }

if (microphoneInputMode.checked) {

    try {

        await inputManager.start(
            function (noteData) {

                const pitchTestResult =
                    document.getElementById(
                        "pitchTestResult"
                    );


                // --------------------------------
                // Ένταση μικροφώνου
                // --------------------------------

                const volume =
                    noteData.volume;


                const ποσοστοΕντασης =
                    Math.min(
                        100,
                        Math.round(
                            volume * 1000
                        )
                    );


                if (noteData.midiNote !== null) {

                    pitchTestResult.textContent =
                        "🎵 Νότα: MIDI " +
                        noteData.midiNote +
                        " — " +
                        "Συχνότητα: " +
                        noteData.frequency.toFixed(2) +
                        " Hz — " +
                        "Ένταση: " +
                        ποσοστοΕντασης +
                        "%";

                } else {

                    pitchTestResult.textContent =
                        "🎤 Ακούω ήχο — " +
                        "Ένταση: " +
                        ποσοστοΕντασης +
                        "%";

                }

            }
        );


        connectionTestStatus.textContent =
            "🟢 Μικρόφωνο: Συνδεδεμένο";


    } catch (error) {

        console.error(
            "Σφάλμα μικροφώνου:",
            error
        );

        connectionTestStatus.textContent =
            "🔴 Μικρόφωνο: Δεν ήταν δυνατή η σύνδεση";

    }

    return;


        }


        connectionTestStatus.textContent =
            "⚠️ Επίλεξε πρώτα MIDI ή Μικρόφωνο.";

    }
);