// ==================================
// Greek Piano - Προειδοποίηση προσανατολισμού
// ==================================

document.addEventListener("DOMContentLoaded", function () {

    // Δημιουργία modal
    const overlay = document.createElement("div");

    overlay.id = "orientationModal";

    overlay.innerHTML = `
        <div class="orientation-box">

            <div class="orientation-icon">
                📱 ↔️
            </div>

            <h2>Προτείνεται οριζόντια οθόνη</h2>

            <p>
                Για καλύτερη εμπειρία στην άσκηση,
                προτείνουμε να γυρίσεις τη συσκευή σου οριζόντια.
            </p>

            <button id="orientationContinue">
                Συνέχεια έτσι
            </button>

        </div>
    `;

    document.body.appendChild(overlay);


    // Εμφάνιση μόνο σε μικρή portrait οθόνη
    function ελεγξεΠροσανατολισμο() {

        const ειναιΜικρηΟθονη =
            window.innerWidth <= 900;

        const ειναιPortrait =
            window.innerHeight > window.innerWidth;


        if (
            ειναιΜικρηΟθονη &&
            ειναιPortrait
        ) {

            overlay.style.display = "flex";

        } else {

            overlay.style.display = "none";

        }

    }


    // Κουμπί "Συνέχεια έτσι"
    document
        .getElementById("orientationContinue")
        .addEventListener("click", function () {

            overlay.style.display = "none";

        });


    // Έλεγχος στην αρχή
    ελεγξεΠροσανατολισμο();


    // Έλεγχος όταν αλλάζει ο προσανατολισμός
    window.addEventListener(
        "resize",
        ελεγξεΠροσανατολισμο
    );

});