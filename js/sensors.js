let currentReading = 0;

function handleMotion(event) {
  const acc = event.accelerationIncludingGravity;
  if (!acc) return;
  const magnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);
  // rough normalize to 0-100 — you'll tune this once you see real values
  currentReading = Math.min(100, Math.abs(magnitude - 9.8) * 15);
}

async function startSensors() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    const result = await DeviceMotionEvent.requestPermission();
    if (result !== 'granted') return false;
  }
  window.addEventListener('devicemotion', handleMotion);
  return true;
}
