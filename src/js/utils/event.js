export const emit = (target, eventName, detail) => {
  const event = new CustomEvent(eventName, { detail });
  target.dispatchEvent(event);
};

export const on = (target, events) => {
  events.forEach(([eventName, handler]) => {
    target.addEventListener(eventName, (e) => {
      try {
        handler(e);
      } catch (error) {
        alert(error.message);
      }
    });
  });
};
