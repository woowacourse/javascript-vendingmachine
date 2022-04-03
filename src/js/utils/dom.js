export function selectDom(selector, baseElement = document) {
  return baseElement.querySelector(selector);
}

export function createMainElement(template) {
  const mainElement = document.createElement('main');
  mainElement.insertAdjacentHTML('beforeend', template);

  return mainElement;
}

export function getInputValuesFromForm(form) {
  const inputArray = [...document.querySelectorAll('input', form)];

  const inputData = inputArray.reduce((dataObject, { name, value }) => {
    dataObject[name] = value;
    return dataObject;
  }, {});
  return inputData;
}
