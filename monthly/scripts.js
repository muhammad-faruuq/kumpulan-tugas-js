let javascriptVotes = 0;
let pythonVotes = 0;
let phpVotes = 0;
let javaVotes = 0;


const javascriptBtn =
    document.querySelector("#javascriptBtn");

const pythonBtn =
    document.querySelector("#pythonBtn");

const phpBtn =
    document.querySelector("#phpBtn");

const javaBtn =
    document.querySelector("#javaBtn");


const javascriptVoteText =
    document.querySelector("#javascriptVotes");

const pythonVoteText =
    document.querySelector("#pythonVotes");

const phpVoteText =
    document.querySelector("#phpVotes");

const javaVoteText =
    document.querySelector("#javaVotes");


const totalVoteText =
    document.querySelector("#totalVotes");

const message =
    document.querySelector("#message");


javascriptBtn.addEventListener("click", function () {

    javascriptVotes++;

    javascriptVoteText.textContent =
        javascriptVotes;

    updateTotalVotes();

    message.textContent =
        "Kamu memilih Mini Game 🎮";

});


pythonBtn.addEventListener("click", function () {

    pythonVotes++;

    pythonVoteText.textContent =
        pythonVotes;

    updateTotalVotes();

    message.textContent =
        "Kamu memilih Mini Store 🛒";

});


phpBtn.addEventListener("click", function () {

    phpVotes++;

    phpVoteText.textContent =
        phpVotes;

    updateTotalVotes();

    message.textContent =
        "Kamu memilih To-Do App 📝";

});


javaBtn.addEventListener("click", function () {

    javaVotes++;

    javaVoteText.textContent =
        javaVotes;

    updateTotalVotes();

    message.textContent =
        "Kamu memilih Quiz App 🧠";

});


function updateTotalVotes() {

    const totalVotes =
        javascriptVotes +
        pythonVotes +
        phpVotes +
        javaVotes;

    totalVoteText.textContent =
        totalVotes;

}