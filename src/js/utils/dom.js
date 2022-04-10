export function selectDom(selector, baseElement = document) {
  return baseElement.querySelector(selector);
}

export function createMainElement(template) {
  const mainElement = document.createElement('main');
  mainElement.insertAdjacentHTML('beforeend', template);

  return mainElement;
}

export function getInputValuesFromForm(form) {
  const inputArray = [...form.querySelectorAll('input')];

  const inputData = inputArray.reduce((dataObject, { name, value, type }) => {
    if (type === 'number') {
      dataObject[name] = Number(value);
      return dataObject;
    }

    dataObject[name] = value;
    return dataObject;
  }, {});

  return inputData;
}

export function emptyFormInputs(form) {
  const inputArray = [...document.querySelectorAll('input', form)];
  inputArray.forEach((input) => {
    input.value = '';
  });
  inputArray[0].focus();
}
