export const $ = (selector, node = document) => node.querySelector(selector);

export const $$ = (selector, node = document) => node.querySelectorAll(selector);

export const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const isNumberInRange = (value: number, min: number, max: number) =>
  value >= min && value <= max;

export const isStringLengthInRange = (value: string, min: number, max: number) =>
  value.length >= min && value.length <= max;

export const isCorrectNumberUnit = (value: number, unit: number) => value % unit === 0;

export const getInnerInputValues = ($target) => {
  const $$inputs = Array.from($$('input', $target));
  return $$inputs.reduce((previous, inputElement) => {
    previous[inputElement.name] = inputElement.type === 'number' ? Number(inputElement.value) : inputElement.value;
    return previous;
  }, {});
};

export const clearInnerInputValues = ($target) => {
  const $$inputs = Array.from($$('input', $target));
  $$inputs.forEach($input => ($input.value = ''));
};

export function showSnackBar(message: string) {
  const $snackBar = $('.snackbar');
  $snackBar.innerText = message;
  $snackBar.classList.toggle('show');

  let start = null;
  function animation(timeStamp: number) {
    if (!start) start = timeStamp;
    const progress = timeStamp - start;

    if (progress < 3000) {
      if (progress < 500) {
        $snackBar.style.opacity = progress / 500;
        $snackBar.style.transform = `translateY(calc(100% - ${(progress / 500) * 150}%))`;
      } else if (progress < 2500) {
        $snackBar.style.opacity = 1;
        $snackBar.style.transform = 'translateY(-50%)';
      } else {
        $snackBar.style.opacity = 1 - (progress - 2500) / 500;
        $snackBar.style.transform = `translateY(calc(-50% + ${((progress - 2500) / 500) * 150}%))`;
      }
      window.requestAnimationFrame(animation);
    } else {
      $snackBar.classList.toggle('show');
      $snackBar.style.opacity = '';
      $snackBar.style.transform = '';
    }
  }

  window.requestAnimationFrame(animation);
}
