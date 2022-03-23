export const { on, emit } = {
  on: (element, eventName, callback) => {
    element.addEventListener(eventName, callback);
  },

  emit: (eventName, data = {}) => {
    const customEvent = new CustomEvent(eventName, { detail: data });
    dispatchEvent(customEvent);
  },
};
