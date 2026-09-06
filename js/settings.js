// ================================
// Greek Piano - Ρυθμίσεις
// ================================


// --------------------------------
// Προεπιλεγμένες ρυθμίσεις
// --------------------------------

const defaultSettings = {

    theme: "light",

    fontSize: "normal",

    colorBlindMode: false,

    keySounds: true,

    buttonSounds: true

};


// --------------------------------
// Φόρτωση αποθηκευμένων ρυθμίσεων
// --------------------------------

let settingsData =
    JSON.parse(
        localStorage.getItem("appSettings")
    ) || { ...defaultSettings };


// --------------------------------
// Αποθήκευση ρυθμίσεων
// --------------------------------
function saveSettings() {

    console.log("Αποθήκευση ρυθμίσεων:", settingsData);

    localStorage.setItem(
        "appSettings",
        JSON.stringify(settingsData)
    );

}


// --------------------------------
// Στοιχεία σελίδας
// --------------------------------

const themeSetting =
    document.getElementById("themeSetting");

const fontSizeSetting =
    document.getElementById("fontSizeSetting");

const colorBlindSetting =
    document.getElementById("colorBlindSetting");

const keySoundsSetting =
    document.getElementById("keySoundsSetting");

const buttonSoundsSetting =
    document.getElementById("buttonSoundsSetting");


// --------------------------------
// Εμφάνιση αποθηκευμένων επιλογών
// --------------------------------

themeSetting.value =
    settingsData.theme;

fontSizeSetting.value =
    settingsData.fontSize;

colorBlindSetting.checked =
    settingsData.colorBlindMode;

keySoundsSetting.checked =
    settingsData.keySounds;

buttonSoundsSetting.checked =
    settingsData.buttonSounds;


// --------------------------------
// Θέμα
// --------------------------------

themeSetting.addEventListener(
    "change",
    function () {

        settingsData.theme =
            themeSetting.value;

     applyTheme();

        saveSettings();

    }
);

// --------------------------------
// Εφαρμογή θέματος
// --------------------------------

function applyTheme() {

    if (settingsData.theme === "dark") {

        document.body.classList.add("dark-theme");

    } else {

        document.body.classList.remove("dark-theme");

    }

}

applyTheme();


// --------------------------------
// Μέγεθος γραμματοσειράς
// --------------------------------

fontSizeSetting.addEventListener(
    "change",
    function () {

        settingsData.fontSize =
            fontSizeSetting.value;

   applyFontSize();

        saveSettings();

    }
);


// --------------------------------
// Λειτουργία αχρωματοψίας
// --------------------------------

colorBlindSetting.addEventListener(
    "change",
    function () {

        settingsData.colorBlindMode =
            colorBlindSetting.checked;

    applyColorBlindMode();

        saveSettings();

    }
);


// --------------------------------
// Ήχοι πλήκτρων
// --------------------------------

keySoundsSetting.addEventListener(
    "change",
    function () {

        settingsData.keySounds =
    keySoundsSetting.checked;

        saveSettings();

    }
);


// --------------------------------
// Ήχοι κουμπιών
// --------------------------------

buttonSoundsSetting.addEventListener(
    "change",
    function () {

        settingsData.buttonSounds =
    buttonSoundsSetting.checked;

        saveSettings();

    }
);

// --------------------------------
// Εφαρμογή μεγέθους γραμματοσειράς
// --------------------------------

function applyFontSize() {

    document.body.classList.remove(
        "font-small",
        "font-normal",
        "font-large"
    );

    document.body.classList.add(
        "font-" + settingsData.fontSize
    );

}

applyFontSize();

// --------------------------------
// Εφαρμογή λειτουργίας αχρωματοψίας
// --------------------------------

function applyColorBlindMode() {

    if (settingsData.colorBlindMode) {

        document.body.classList.add(
            "color-blind-mode"
        );

    } else {

        document.body.classList.remove(
            "color-blind-mode"
        );

    }

}

applyColorBlindMode();

// --------------------------------
// Έλεγχος MIDI
// --------------------------------

const midiTestButton =
    document.getElementById("midiTestButton");

const midiTestStatus =
    document.getElementById("midiTestStatus");

let midiTestAccess = null;
let midiTestActive = false;


// --------------------------------
// Έναρξη / διακοπή ελέγχου
// --------------------------------

midiTestButton.addEventListener(
    "click",
    async function () {

        // Αν ήδη ελέγχουμε MIDI
        if (midiTestActive) {

            midiTestActive = false;

            midiTestStatus.textContent =
                "⚪ Ο έλεγχος σταμάτησε";

            midiTestButton.textContent =
                "🎹 Έναρξη ελέγχου MIDI";

            return;

        }


        // Έλεγχος υποστήριξης
        if (!navigator.requestMIDIAccess) {

            midiTestStatus.textContent =
                "🔴 Το MIDI δεν υποστηρίζεται από τον browser";

            return;

        }


        try {

            midiTestAccess =
                await navigator.requestMIDIAccess();


            const inputs =
                Array.from(
                    midiTestAccess.inputs.values()
                );


            if (inputs.length === 0) {

                midiTestStatus.textContent =
                    "🔴 Δεν βρέθηκε συνδεδεμένο MIDI πιάνο";

                return;

            }


            midiTestActive = true;

            midiTestButton.textContent =
                "⏹️ Διακοπή ελέγχου MIDI";

            midiTestStatus.textContent =
                "🟢 MIDI συνδεδεμένο — πάτησε ένα πλήκτρο στο πιάνο";


            // --------------------------------
            // Ακρόαση MIDI
            // --------------------------------

            inputs.forEach(function (input) {

                input.onmidimessage =
                    function (event) {

                        if (!midiTestActive) {
                            return;
                        }


                        const [
                            status,
                            midiNote,
                            velocity
                        ] = event.data;


                        // Μόνο Note On
                        if (
                            status !== 144 ||
                            velocity === 0
                        ) {

                            return;

                        }


                        // Αναζήτηση νότας
                        const νοτα =
                            νοτες.find(
                                function (n) {

                                    return (
                                        n.midi === midiNote
                                    );

                                }
                            );


                        if (νοτα) {

                            midiTestStatus.textContent =
                                "🟢 MIDI λειτουργεί — Νότα: " +
                                νοτα.ονομα;

                        }

                        else {

                            midiTestStatus.textContent =
                                "🟢 MIDI λειτουργεί — MIDI: " +
                                midiNote;

                        }

                    };

            });

        }

        catch (error) {

            console.error(
                "Σφάλμα MIDI:",
                error
            );

            midiTestStatus.textContent =
                "🔴 Δεν ήταν δυνατή η πρόσβαση στο MIDI";

        }

    }
);

// --------------------------------
// Έλεγχος ήχου
// --------------------------------

