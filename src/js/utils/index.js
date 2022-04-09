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

export function deepCopy(obj) {
  const cloneObject = {};

  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      cloneObject[key] = deepCopy(obj[key]);
      continue;
    }

    cloneObject[key] = obj[key];
  }

  return cloneObject;
}

export function deepCopyList(list) {
  const cloneList = [];

  for (let item of list) {
    cloneList.push(deepCopy(item));
  }

  return cloneList;
}
