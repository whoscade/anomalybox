const screenTarget = document.getElementById('screenTarget');
const wordDisplay = document.getElementById('wordDisplay');
const statusLine = document.getElementById('statusLine');

let started = false;
let currentUtterance = null;

screenTarget.addEventListener('click', async () => {
  if (started) return;
  started = true;
  statusLine.textContent = 'starting...';

  speak(' ');

  try {
    await loadWordBank();
    statusLine.textContent = 'word bank loaded';
  } catch (err) {
    statusLine.textContent = 'ERROR loading words: ' + err.message;
    started = false;
    return;
  }

  try {
    const ok = await startSensors();
    if (!ok) {
      statusLine.textContent = 'motion access denied';
      started = false;
      return;
    }
  } catch (err) {
    statusLine.textContent = 'ERROR starting sensors: ' + err.message;
    started = false;
    return;
  }

  wordDisplay.textContent = 'LISTENING';
  statusLine.textContent = 'active';
  setInterval(triggerReading, 4000);
});

function triggerReading() {
  const word = getWordForReading(currentReading);
  wordDisplay.textContent = word;
  statusLine.textContent = 'reading: ' + Math.round(currentReading);
  speak(word);
}

function speak(word) {
  speechSynthesis.cancel();

  currentUtterance = new SpeechSynthesisUtterance(word);
  currentUtterance.rate = 0.8;

  currentUtterance.onstart = () => {
    statusLine.textContent = 'speaking: ' + word;
  };
  currentUtterance.onend = () => {
    statusLine.textContent = 'reading: ' + Math.round(currentReading);
  };
  currentUtterance.onerror = (e) => {
    statusLine.textContent = 'TTS ERROR: ' + e.error;
  };

  speechSynthesis.speak(currentUtterance);
}
