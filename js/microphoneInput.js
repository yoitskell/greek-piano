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


        const volume =
    Number.isFinite(rms)
        ? rms
        : 0;

        
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

    if (!microphoneContext) {
        return null;
    }


    // --------------------------------
    // Αφαίρεση DC offset
    // --------------------------------

    let mean = 0;

    for (
        let i = 0;
        i < buffer.length;
        i++
    ) {

        mean += buffer[i];

    }

    mean /= buffer.length;


    // --------------------------------
    // Υπολογισμός έντασης
    // --------------------------------

    let rms = 0;

    for (
        let i = 0;
        i < buffer.length;
        i++
    ) {

        const sample =
            buffer[i] - mean;

        rms +=
            sample * sample;

    }

    rms =
        Math.sqrt(
            rms / buffer.length
        );


    // Πολύ αδύναμο σήμα

    if (rms < 0.003) {
        return null;
    }


    // --------------------------------
    // Περιοχή συχνοτήτων πιάνου
    // --------------------------------

    const sampleRate =
        microphoneContext.sampleRate;

    const minFrequency = 60;
    const maxFrequency = 1200;


    const minLag =
        Math.floor(
            sampleRate / maxFrequency
        );

    const maxLag =
        Math.floor(
            sampleRate / minFrequency
        );


    // --------------------------------
    // Κανονικοποιημένη autocorrelation
    // --------------------------------

    let καλύτεροLag = -1;
    let καλύτερηΣυσχέτιση = 0;


    for (
        let lag = minLag;
        lag <= maxLag;
        lag++
    ) {

        let correlation = 0;
        let energy1 = 0;
        let energy2 = 0;


        for (
            let i = 0;
            i < buffer.length - lag;
            i++
        ) {

            const sample1 =
                buffer[i] - mean;

            const sample2 =
                buffer[i + lag] - mean;


            correlation +=
                sample1 * sample2;

            energy1 +=
                sample1 * sample1;

            energy2 +=
                sample2 * sample2;

        }


        if (
            energy1 === 0 ||
            energy2 === 0
        ) {
            continue;
        }


        const normalizedCorrelation =
            correlation /
            Math.sqrt(
                energy1 * energy2
            );


        if (
            normalizedCorrelation >
            καλύτερηΣυσχέτιση
        ) {

            καλύτερηΣυσχέτιση =
                normalizedCorrelation;

            καλύτεροLag =
                lag;

        }

    }


    // --------------------------------
    // Έλεγχος ποιότητας
    // --------------------------------

    if (
        καλύτεροLag === -1 ||
        καλύτερηΣυσχέτιση < 0.30
    ) {

        return null;

    }


    // --------------------------------
    // Υπολογισμός συχνότητας
    // --------------------------------

    const συχνοτητα =
        sampleRate /
        καλύτεροLag;


    if (
        !Number.isFinite(συχνοτητα) ||
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
