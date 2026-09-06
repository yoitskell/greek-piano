// ==================================
// Greek Piano - Άσκηση 4
// ==================================

// ----------------------------------
// Ρυθμίσεις
// ----------------------------------

const VF = Vex.Flow;

const div = document.getElementById("staff");


// ----------------------------------
// Παρτιτούρα
// ----------------------------------

const numberOfMeasures = 8;

const measuresPerLine = 4;

const marginX = 20;

const measureWidth = 180;

const trebleY = 50;
const bassY = 150;

const lineHeight = 280;

const numberOfLines =
    Math.ceil(
        numberOfMeasures /
        measuresPerLine
    );


// ----------------------------------
// Συνολικό πλάτος
// ----------------------------------

const scoreWidth =
    marginX +
    measuresPerLine *
    measureWidth +
    20;


// ----------------------------------
// Συνολικό ύψος
// ----------------------------------

const scoreHeight =
    numberOfLines *
    lineHeight +
    80;


// ----------------------------------
// Renderer
// ----------------------------------

div.style.display = "flex";
div.style.justifyContent = "center";

const renderer = new VF.Renderer(
    div,
    VF.Renderer.Backends.SVG
);

renderer.resize(
    scoreWidth,
    scoreHeight
);

const context =
    renderer.getContext();


// ----------------------------------
// Πεντάγραμμα
// ----------------------------------

const trebleStaves = [];
const bassStaves = [];


// ----------------------------------
// Δημιουργία πενταγράμμων
// ----------------------------------

for (
    let i = 0;
    i < numberOfMeasures;
    i++
) {

    const line =
        Math.floor(
            i / measuresPerLine
        );

    const position =
        i % measuresPerLine;


    const x =
        marginX +
        position *
        measureWidth;


    const y =
        line *
        lineHeight;


    // --------------------------------
    // Πάνω πεντάγραμμο
    // --------------------------------

    const trebleStave =
        new VF.Stave(
            x,
            trebleY + y,
            measureWidth
        );


    // Κλειδί Σολ και 4/4
    // μόνο στην αρχή κάθε γραμμής

    if (position === 0) {

        trebleStave.addClef("treble");

        trebleStave.addTimeSignature("4/4");

    }


    // --------------------------------
    // Κάτω πεντάγραμμο
    // --------------------------------

    const bassStave =
        new VF.Stave(
            x,
            bassY + y,
            measureWidth
        );


    // Και εδώ ΚΛΕΙΔΙ ΣΟΛ

    if (position === 0) {

        bassStave.addClef("treble");

        bassStave.addTimeSignature("4/4");

    }


    // --------------------------------
    // Τέλος μέτρου
    // --------------------------------

    if (
        position ===
        measuresPerLine - 1
        ||
        i === numberOfMeasures - 1
    ) {

        trebleStave.setEndBarType(
            VF.Barline.type.END
        );

        bassStave.setEndBarType(
            VF.Barline.type.END
        );

    }


    // --------------------------------
    // Σχεδίαση
    // --------------------------------

    trebleStave
        .setContext(context)
        .draw();

    bassStave
        .setContext(context)
        .draw();


    trebleStaves.push(
        trebleStave
    );

    bassStaves.push(
        bassStave
    );

}


// ----------------------------------
// Συνδέσεις δύο πενταγράμμων
// ----------------------------------

for (
    let line = 0;
    line < numberOfLines;
    line++
) {

    const firstMeasure =
        line *
        measuresPerLine;


    // --------------------------------
    // Αγκύλη
    // --------------------------------

    const brace =
        new VF.StaveConnector(
            trebleStaves[firstMeasure],
            bassStaves[firstMeasure]
        );

    brace.setType(
        VF.StaveConnector.type.BRACE
    );

    brace
        .setContext(context)
        .draw();


    // --------------------------------
    // Κάθετη σύνδεση
    // --------------------------------

    const connector =
        new VF.StaveConnector(
            trebleStaves[firstMeasure],
            bassStaves[firstMeasure]
        );

    connector.setType(
        VF.StaveConnector.type.SINGLE_LEFT
    );

    connector
        .setContext(context)
        .draw();

}


// ----------------------------------
// Νότες
// ----------------------------------

const trebleNotes = [];
const bassNotes = [];


for (
    let measure = 0;
    measure < numberOfMeasures;
    measure++
) {

    // --------------------------------
    // Δεξί χέρι
    // --------------------------------

    const notesTreble = [

        new VF.StaveNote({
            keys: ["c/5"],
            duration: "q"
        }),

        new VF.StaveNote({
            keys: ["d/5"],
            duration: "q"
        }),

        new VF.StaveNote({
            keys: ["e/5"],
            duration: "q"
        }),

        new VF.StaveNote({
            keys: ["f/5"],
            duration: "q"
        })

    ];


    // --------------------------------
    // Αριστερό χέρι
    // --------------------------------

    const notesBass = [

        new VF.StaveNote({
            keys: ["c/4"],
            duration: "q"
        }),

        new VF.StaveNote({
            keys: ["d/4"],
            duration: "q"
        }),

        new VF.StaveNote({
            keys: ["e/4"],
            duration: "q"
        }),

        new VF.StaveNote({
            keys: ["f/4"],
            duration: "q"
        })

    ];


    trebleNotes.push(
        notesTreble
    );

    bassNotes.push(
        notesBass
    );

}


// ----------------------------------
// Σχεδίαση νοτών
// ----------------------------------

for (
    let measure = 0;
    measure < numberOfMeasures;
    measure++
) {

    // --------------------------------
    // Δεξί χέρι
    // --------------------------------

    const trebleVoice =
        new VF.Voice({

            num_beats: 4,

            beat_value: 4

        });


    trebleVoice.addTickables(
        trebleNotes[measure]
    );


    // --------------------------------
    // Αριστερό χέρι
    // --------------------------------

    const bassVoice =
        new VF.Voice({

            num_beats: 4,

            beat_value: 4

        });


    bassVoice.addTickables(
        bassNotes[measure]
    );


    // --------------------------------
    // Χώρος για τις νότες
    // --------------------------------

    const position =
        measure %
        measuresPerLine;


const διαθέσιμοΠλάτος =
    position === 0
        ? measureWidth - 70
        : measureWidth - 25;


    // --------------------------------
    // Formatter δεξιού χεριού
    // --------------------------------

    new VF.Formatter()
        .joinVoices([
            trebleVoice
        ])
        .format(
            [trebleVoice],
            διαθέσιμοΠλάτος
        );


    // --------------------------------
    // Formatter αριστερού χεριού
    // --------------------------------

    new VF.Formatter()
        .joinVoices([
            bassVoice
        ])
        .format(
            [bassVoice],
            διαθέσιμοΠλάτος
        );


    // --------------------------------
    // Σχεδίαση δεξιού
    // --------------------------------

    trebleVoice.draw(
        context,
        trebleStaves[measure]
    );


    // --------------------------------
    // Σχεδίαση αριστερού
    // --------------------------------

    bassVoice.draw(
        context,
        bassStaves[measure]
    );

}