interface Rule {
  MIN: number;
  MAX: number;
  UNIT: number;
}

const isInvalidNumber = (num: number, rule: Rule) => {
  const { MIN, MAX, UNIT } = rule;
  const isRanged = num >= MIN && num <= MAX;
  const isDivisible = num % UNIT === 0;
  return !(isRanged && isDivisible);
};

const validateNumber = (number: number, rule: Rule) => {
  if (isInvalidNumber(number, rule)) {
    throw new Error(
      `금액은 ${rule.MAX.toLocaleString()}원 이하여야 하며, ${rule.UNIT.toLocaleString()}으로 나누어 떨어져야 합니다.`,
    );
  }
  return true;
};

export { isInvalidNumber, validateNumber };
