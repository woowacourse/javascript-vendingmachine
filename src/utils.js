export const $ = (selector, scope = document) => scope.querySelector(selector);

export const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export const pickNumberInList = (array) => {
  const index = Math.floor(Math.random() * array.length);

  return array[index];
};

export const addThousandUnitComma = (number) => {
  return number.toLocaleString();
};
