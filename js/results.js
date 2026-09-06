const results = JSON.parse(
    localStorage.getItem("exerciseResults")
);

document.getElementById("total").textContent =
    results.total;

document.getElementById("correct").textContent =
    results.correct;

document.getElementById("wrong").textContent =
    results.wrong;

const percentage =
    Math.round(
        (results.correct / results.total) * 100
    );

document.getElementById("percentage").textContent =
    percentage;

document.getElementById("restartButton")
.addEventListener("click", function () {

    const exerciseType =
        localStorage.getItem("exerciseType");

    if (exerciseType === "exercise2") {

        window.location.href = "../askisi2.html";

    } else {

        window.location.href = "../askisi1-settings.html";

    }

});

document.getElementById("menuButton")
.addEventListener("click", function () {

    window.location.href = "../index.html";

});
