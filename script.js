const startButton = document.getElementById("startButton");
const output = document.getElementById("output");
const timer = document.getElementById("timer");
const recordingIndicators = document.querySelector(".recording-indicators");

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.lang = 'en-US';

let startTime;
let timerInterval;
let isRecording = false;

recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    output.value = transcript;
};

recognition.onstart = function () {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
    recordingIndicators.style.display = 'flex'; // Show recording indicators
    recordingIndicators.style.animation = 'blink 1s infinite'; // Start animation
    isRecording = true;
    startButton.style.backgroundColor = "#FF6961"; // Change button color to red
};

recognition.onend = function () {
    if (isRecording) {
        clearInterval(timerInterval);
        isRecording = false;
        startButton.textContent = "Start";
        recordingIndicators.style.display = 'none'; // Hide recording indicators
        recordingIndicators.style.animation = 'none'; // Stop animation
        startButton.style.backgroundColor = "#007BFF"; // Restore the original button color
        output.readOnly = false; // Allow editing the textarea
    }
};

startButton.addEventListener("click", function () {
    if (isRecording) {
        recognition.stop();
    } else {
        recognition.start();
        startButton.textContent = "Stop";
        output.value = '';
        timer.textContent = 'Duration: 0 seconds';
        output.readOnly = true; // Set the textarea to read-only initially
        isRecording = true;
    }
});

function updateTimer() {
    const currentTime = new Date().getTime();
    const duration = (currentTime - startTime) / 1000;
    timer.textContent = `Duration: ${duration.toFixed(2)} seconds`;
}
