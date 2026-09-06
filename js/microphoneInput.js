// ================================
// Greek Piano - Microphone Input
// ================================


// --------------------------------
// Κατάσταση μικροφώνου
// --------------------------------

let microphoneStream = null;
let microphoneContext = null;
let microphoneAnalyser = null;
let microphoneSource = null;
let microphoneAnimationFrame = null;


// --------------------------------
// Έναρξη μικροφώνου
// --------------------------------

async function startMicrophone(handler) {

    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia) {

        throw new Error(
            "Το μικρόφωνο δεν υποστηρίζεται από τον browser."
        );

    }


    microphoneStream =
        await navigator.mediaDevices.getUserMedia({
            audio: true
        });


    microphoneContext =
        new AudioContext();


    microphoneAnalyser =
        microphoneContext.createAnalyser();


    microphoneAnalyser.fftSize = 2048;


    microphoneSource =
        microphoneContext.createMediaStreamSource(
            microphoneStream
        );


    microphoneSource.connect(
        microphoneAnalyser
    );


    ανιχνευσεPitch(handler);


    return true;

}


// --------------------------------
// Ανίχνευση Pitch
// --------------------------------

function ανιχνευσεPitch(handler) {

    if (!microphoneAnalyser) {
        return;
    }


    const buffer =
        new Float32Array(
            microphoneAnalyser.fftSize
        );


    function loop() {

        microphoneAnalyser.getFloatTimeDomainData(
            buffer
        );


        // --------------------------------
        // Υπολογισμός έντασης ήχου
        // --------------------------------

        let rms = 0;

        for (
            let i = 0;
            i < buffer.length;
            i++
        ) {

            rms +=
                buffer[i] *
                buffer[i];

        }


        rms =
            Math.sqrt(
                rms / buffer.length
            );


        // --------------------------------
        // Αναγνώριση pitch
        // --------------------------------

        const συχνοτητα =
            βρεςΣυχνοτητα(buffer);


        if (συχνοτητα) {

            const midiNote =
                συχνοτηταΣεMIDI(
                    συχνοτητα
                );


            if (midiNote !== null) {

                handler({
                    midiNote: midiNote,
                    frequency: συχνοτητα,
                    volume: rms
                });

            }

        } else {

            // Στέλνουμε και την ένταση
            // όταν δεν έχει αναγνωριστεί νότα

            handler({
                midiNote: null,
                frequency: null,
                volume: rms
            });

        }


        microphoneAnimationFrame =
            requestAnimationFrame(loop);

    }


    loop();

}


// --------------------------------
// Εύρεση συχνότητας
// --------------------------------

// --------------------------------
// Εύρεση συχνότητας
// --------------------------------

function βρεςΣυχνοτητα(buffer) {

    // ------------------------------
    // Έλεγχος έντασης σήματος
    // ------------------------------

    let rms = 0;

    for (
        let i = 0;
        i < buffer.length;
        i++
    ) {

        rms +=
            buffer[i] *
            buffer[i];

    }


    rms =
        Math.sqrt(
            rms / buffer.length
        );


    // Πολύ χαμηλό σήμα = σιωπή

    if (rms < 0.01) {

        return null;

    }


    // ------------------------------
    // Autocorrelation
    // ------------------------------

    const sampleRate =
        microphoneContext.sampleRate;


    const minFrequency = 70;
    const maxFrequency = 1200;


    const minLag =
        Math.floor(
            sampleRate / maxFrequency
        );


    const maxLag =
        Math.floor(
            sampleRate / minFrequency
        );


    let καλύτεροLag = -1;
    let καλύτερηΣυσχέτιση = 0;


    for (
        let lag = minLag;
        lag <= maxLag;
        lag++
    ) {

        let correlation = 0;


        for (
            let i = 0;
            i < buffer.length - lag;
            i++
        ) {

            correlation +=
                buffer[i] *
                buffer[i + lag];

        }


        correlation /=
            buffer.length - lag;


        if (
            correlation >
            καλύτερηΣυσχέτιση
        ) {

            καλύτερηΣυσχέτιση =
                correlation;

            καλύτεροLag =
                lag;

        }

    }


    // Δεν βρέθηκε αρκετά ισχυρή περιοδικότητα

    if (
        καλύτεροLag === -1 ||
        καλύτερηΣυσχέτιση < 0.001
    ) {

        return null;

    }


    const συχνοτητα =
        sampleRate /
        καλύτεροLag;


    if (
        συχνοτητα < minFrequency ||
        συχνοτητα > maxFrequency
    ) {

        return null;

    }


    return συχνοτητα;

}


// --------------------------------
// Συχνότητα → MIDI
// --------------------------------

function συχνοτηταΣεMIDI(συχνοτητα) {

    const midi =
        69 +
        12 *
        Math.log2(
            συχνοτητα / 440
        );


    return Math.round(midi);

}


// --------------------------------
// Διακοπή μικροφώνου
// --------------------------------

function stopMicrophone() {

    if (
        microphoneAnimationFrame !== null
    ) {

        cancelAnimationFrame(
            microphoneAnimationFrame
        );

        microphoneAnimationFrame = null;

    }


    if (microphoneSource) {

        microphoneSource.disconnect();

        microphoneSource = null;

    }


    if (microphoneAnalyser) {

        microphoneAnalyser.disconnect();

        microphoneAnalyser = null;

    }


    if (microphoneContext) {

        microphoneContext.close();

        microphoneContext = null;

    }


    if (microphoneStream) {

        microphoneStream
            .getTracks()
            .forEach(function (track) {

                track.stop();

            });

        microphoneStream = null;

    }

}


// --------------------------------
// Έλεγχος μικροφώνου
// --------------------------------

function isMicrophoneConnected() {

    return microphoneStream !== null;

}