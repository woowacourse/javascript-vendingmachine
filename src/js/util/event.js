export const { setEvent, emit } = {
  setEvent: (element, eventName, callback) => {
    element.addEventListener(eventName, callback);
  },

  emit: (element, eventName, data = {}) => {
    const customEvent = new CustomEvent(eventName, { detail: data });
    element.dispatchEvent(customEvent);
  },
};
