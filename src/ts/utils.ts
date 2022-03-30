export const on = (
  target: Window | HTMLElement,
  eventName: string,
  callback
) => {
  target.addEventListener(eventName, callback);
};

export const emit = (
  target: Window | HTMLElement,
  eventName: string,
  detail = {}
) => {
  const customEvent = new CustomEvent(eventName, detail);
  target.dispatchEvent(customEvent);
};

export const pickRandomIndex = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;
