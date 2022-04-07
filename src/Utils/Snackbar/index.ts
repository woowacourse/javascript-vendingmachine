import { $, createTemplate, addEventOnce, runAnimation, getTimeDiffToPercent } from 'Utils';
import template from './template.html';
import './styles.scss';

export const Snackbar = (
  message: string,
  type: 'success' | 'warning' = 'success',
  delay = 3000,
): Record<string, () => void> => {
  const previousSnackbar = $('.snackbar-container');
  if (previousSnackbar) {
    previousSnackbar.click();
  }

  let isProgressDone = false;

  let $snackbarContainer: HTMLElement;
  let $snackbarProgress: HTMLElement;

  const close = () => {
    $snackbarContainer.classList.add('disappear');
    addEventOnce('animationend', $snackbarContainer, () => {
      $snackbarContainer.remove();
    });
  };

  const createSnackbar = () => {
    $snackbarContainer = createTemplate(template, {
      childTextContent: { '#snackbar-message': message },
    });
    $snackbarProgress = $('.percent', $snackbarContainer);

    $snackbarContainer.classList.add(type);
    $('#app').append($snackbarContainer);
  };

  const setBindEvents = () => {
    addEventOnce('click', $snackbarContainer, () => {
      isProgressDone = true;
      close();
    });
  };

  const onProgressStart = async callback => {
    const startTime = new Date().getTime();
    while (isProgressDone === false) {
      await runAnimation();
      const currentTime = new Date().getTime();
      const percent = getTimeDiffToPercent(startTime, currentTime, delay);

      $snackbarProgress.style.width = `${percent}%`;
      if (percent >= 100) isProgressDone = true;
    }

    callback();
  };

  const start = () => {
    createSnackbar();
    setBindEvents();
    onProgressStart(close);
  };

  start();

  return {
    close,
  };
};
