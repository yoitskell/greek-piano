// ================================
// Greek Piano - Input Manager
// ================================


// --------------------------------
// Κεντρικός διαχειριστής εισόδου
// --------------------------------

const inputManager = {

    // --------------------------------
    // Τρέχων τρόπος εισόδου
    // --------------------------------

    getMode: function () {

        const settings =
            JSON.parse(
                localStorage.getItem("appSettings")
            ) || {};

        return settings.inputMode || "midi";

    },


    // --------------------------------
    // Έλεγχος τρέχοντος τρόπου
    // --------------------------------

    isMIDI: function () {

        return this.getMode() === "midi";

    },


    isMicrophone: function () {

        return this.getMode() === "microphone";

    },


    // --------------------------------
    // Έναρξη εισόδου
    // --------------------------------

   start: async function (handler) {

    if (this.isMIDI()) {

    return await startMIDI(
        function (event) {

            const status =
                event.data[0];

            const midiNote =
                event.data[1];

            const velocity =
                event.data[2];


            // --------------------------------
            // Μόνο Note On με ένταση > 0
            // --------------------------------

            if (
                status !== 144 ||
                velocity === 0
            ) {

                return;

            }


            handler({
                midiNote: midiNote
            });

        }
    );

}

    if (this.isMicrophone()) {

        return await startMicrophone(
            function (noteData) {

                handler({
                    midiNote: noteData.midiNote,
                    frequency: noteData.frequency
                });

            }
        );

    }

},


    // --------------------------------
    // Διακοπή εισόδου
    // --------------------------------

    stop: function () {

    if (this.isMIDI()) {

        stopMIDI();

    }


    if (this.isMicrophone()) {

        stopMicrophone();

    }
    }

}
