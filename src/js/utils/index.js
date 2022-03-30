export function pickNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateRandomHexString() {
  return Array.from({ length: 3 }).reduce(
    (prev) => `${prev}${pickNumberInRange(0, 255).toString(16)}`,
    ''
  );
}

export function generateUniqueId(list) {
  let newId = generateRandomHexString();

  while (list.includes(newId)) {
    newId = generateRandomHexString();
  }

  return newId;
}
