export function selectDom(selector, baseElement = document) {
  return baseElement.querySelector(selector);
}

export function createMainElement(template) {
  const mainElement = document.createElement('main');
  mainElement.insertAdjacentHTML('beforeend', template);
  return mainElement;
}

export function createElementByTemplate(type, template) {
  const element = document.createElement(type);
  element.insertAdjacentHTML('beforeend', template);
  return element;
}

function fadeOutAnimation(target, elasped, duration) {
  const node = target;
  node.style.transform = `translateY(${-30 + (30 * elasped) / duration}px)`;
  node.style.opacity = 1 - elasped / duration;
  if (elasped >= duration) {
    node.classList.add('hide');
  }
}

function fadeInAnimation(target, elasped, duration) {
  const node = target;
  node.classList.remove('hide');
  node.style.transform = `translateY(-${(30 * elasped) / duration}px)`;
  node.style.opacity = elasped / duration;
}

function animationCallBack(target, duration, cb) {
  let start;
  return function callBack(timestamp) {
    if (!start) {
      start = timestamp;
    }
    const elasped = timestamp - start;
    cb(target, elasped, duration);
    if (elasped < duration) {
      requestAnimationFrame(callBack);
    }
  };
}

// eslint-disable-next-line max-lines-per-function
export function snackBar() {
  const snackBarContainer = document.getElementById('snackbar');
  let timeoutID = null;
  let isGenerated = false;
  return function generate(text) {
    if (isGenerated) {
      clearTimeout(timeoutID);
      isGenerated = false;
      generate(text);
      return;
    }
    isGenerated = true;
    snackBarContainer.textContent = text;
    requestAnimationFrame(animationCallBack(snackBarContainer, 500, fadeInAnimation));
    timeoutID = setTimeout(() => {
      requestAnimationFrame(animationCallBack(snackBarContainer, 500, fadeOutAnimation));
      isGenerated = false;
    }, 3000);
  };
}

export const generateSnackBar = snackBar();
