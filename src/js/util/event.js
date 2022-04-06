export const { addEvent, emit, removeEvent } = {
  addEvent: (element, eventName, callback) => {
    element.addEventListener(eventName, callback);
  },

  emit: (element, eventName, data = {}) => {
    const customEvent = new CustomEvent(eventName, { detail: data });
    element.dispatchEvent(customEvent);
  },

  removeEvent: (element, eventName, callback) => {
    element.removeEventListener(eventName, callback);
  },
};
