document
    .getElementById("startExercise4")
    .addEventListener("click", () => {

        const level =
            document.querySelector('input[name="level"]:checked').value;

        localStorage.setItem("exercise4Level", level);

        window.location.href = "askisi4.html";
    });