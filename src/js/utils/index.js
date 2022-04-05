export function pickNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateRandomHexString() {
  return Array.from({ length: 3 }).reduce(
    (prev) => `${prev}${pickNumberInRange(0, 255).toString(16)}${Date.now()}`,
    ''
  );
}
