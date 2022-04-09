export function isUnderMinLengthPassword(password) {
  return password.length < 10;
}

export function isNameLengthOutOfRange(value) {
  return value.length < 2 || value.length > 6;
}

export function isDifferent(valueA, valueB) {
  return valueA !== valueB;
}

export function isEmpty(value) {
  return value === '';
}

export function hasBlank(value) {
  return value.includes(' ');
}

export function isInValidPassword(password) {
  const testFuncs = [isSpecialCase, isUpperCase, isLowerCase, isNumber];

  for (let value of password.split('')) {
    for (let index in testFuncs) {
      if (testFuncs[index](value)) {
        testFuncs.splice(Number(index), 1);
        break;
      }
    }
    if (testFuncs.length <= 2) return false;
  }

  return true;
}

export function isSpecialCase(value) {
  const special = ['!', '@', '#', '$', '%', '^', '&', '* '];
  return special.includes(value);
}

export function isUpperCase(value) {
  const code = value.charCodeAt(0);
  return code >= 65 && code <= 90;
}

export function isLowerCase(value) {
  const code = value.charCodeAt(0);
  return code >= 97 && code <= 122;
}

export function isNumber(value) {
  const code = value.charCodeAt(0);
  return code >= 48 && code <= 57;
}
