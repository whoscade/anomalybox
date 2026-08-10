const startBtn = document.getElementById('startBtn');
const wordDisplay = document.getElementById('wordDisplay');

startBtn.addEventListener('click', async () => {
  await loadWordBank();
  const ok = await startSensors();
  if (!ok) {
    wordDisplay.textContent = 'MOTION ACCESS DENIED';
    return;
  }
  startBtn.style.display = 'none';
  setInterval(triggerReading, 4000);
});

function triggerReading() {
  const word = getWordForReading(currentReading);
  wordDisplay.textContent = word;
  speak(word);
}

function speak(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = 0.8;
  speechSynthesis.speak(utterance);
}
