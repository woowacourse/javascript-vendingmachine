export const on = (target, eventName, callback) => {
  target.addEventListener(eventName, callback);
};

export const emit = (target, eventName, detail = {}) => {
  const customEvent = new CustomEvent(eventName, detail);
  target.dispatchEvent(customEvent);
};
