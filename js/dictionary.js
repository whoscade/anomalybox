let wordBank = null;

async function loadWordBank() {
  const response = await fetch('data/words.json');
  wordBank = await response.json();
}

function getBucket(reading) {
  if (reading < 20) return 'dormant';
  if (reading < 40) return 'mild';
  if (reading < 60) return 'moderate';
  if (reading < 80) return 'active';
  return 'peak';
}

function getWordForReading(reading) {
  const bucket = getBucket(reading);
  const words = wordBank[bucket];
  return words[Math.floor(Math.random() * words.length)];
}
