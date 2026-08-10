screenTarget.addEventListener('click', async () => {
  if (started) return;
  started = true;
  statusLine.textContent = 'starting...';

  const unlock = new SpeechSynthesisUtterance(' ');
  speechSynthesis.speak(unlock);

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
