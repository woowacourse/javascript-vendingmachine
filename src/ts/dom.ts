export const bind = (target, eventName, callback) => {
  target.addEventListener(eventName, callback);
};

export const dispatch = (target, eventName, detail = {}) => {
  const customEvent = new CustomEvent(eventName, detail);
  target.dispatchEvent(customEvent);
};
