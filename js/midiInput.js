 // ================================
// Greek Piano - MIDI Input
// ================================


// --------------------------------
// Κατάσταση MIDI
// --------------------------------

let midiAccess = null;
let midiInputs = [];


// --------------------------------
// Έναρξη MIDI
// --------------------------------

async function startMIDI(handler) {

    if (!navigator.requestMIDIAccess) {

        throw new Error(
            "Το MIDI δεν υποστηρίζεται από τον browser."
        );

    }


    midiAccess =
        await navigator.requestMIDIAccess();


    midiInputs =
        Array.from(
            midiAccess.inputs.values()
        );


console.log(
    "MIDI Inputs:",
    midiInputs.map(i => i.name)
);

console.log(
    "Πλήθος MIDI Inputs:",
    midiInputs.length
);

    if (midiInputs.length === 0) {

        throw new Error(
            "Δεν βρέθηκε συνδεδεμένο MIDI πιάνο."
        );

    }


    midiInputs.forEach(function (input) {

        input.onmidimessage = handler;

    });


    return midiInputs;

}


// --------------------------------
// Διακοπή MIDI
// --------------------------------

function stopMIDI() {

    midiInputs.forEach(function (input) {

        input.onmidimessage = null;

    });

    midiInputs = [];

}


// --------------------------------
// Έλεγχος MIDI
// --------------------------------

function isMIDIConnected() {

    return midiInputs.length > 0;

}