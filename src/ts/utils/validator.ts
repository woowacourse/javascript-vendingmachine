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

export { isInvalidNumber };
