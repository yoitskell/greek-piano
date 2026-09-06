const defaultAppSettings = {
    theme: "light",
    fontSize: "normal",
    colorBlindMode: false,
    keySounds: true,
    buttonSounds: true,
    inputMode: "midi"
};

const appSettings =
    JSON.parse(localStorage.getItem("appSettings")) ||
    { ...defaultAppSettings };

function applyAppTheme() {
    document.body.classList.toggle(
        "dark-theme",
        appSettings.theme === "dark"
    );
}

function applyAppFontSize() {
    document.body.classList.remove(
        "font-small",
        "font-normal",
        "font-large"
    );

    document.body.classList.add(
        "font-" + appSettings.fontSize
    );
}

function applyAppColorBlindMode() {
    document.body.classList.toggle(
        "color-blind-mode",
        appSettings.colorBlindMode
    );
}

applyAppTheme();
applyAppFontSize();
applyAppColorBlindMode();

document.addEventListener("pointerdown", function (event) {

    if (!appSettings.buttonSounds) {
        return;
    }

    const button = event.target.closest("button");

    if (!button || button.id === "soundTestButton") {
        return;
    }

    const audioContext =
        new (window.AudioContext ||
             window.webkitAudioContext)();

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.type = "triangle";

    oscillator.frequency.setValueAtTime(
        180,
        audioContext.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        90,
        audioContext.currentTime + 0.07
    );

    gain.gain.setValueAtTime(
        0.08,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.07
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.07
    );

});