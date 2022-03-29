export const emit = (target, eventName, detail) => {
  const event = new CustomEvent(eventName, { detail });
  target.dispatchEvent(event);
};

export const on = (target, events) => {
  try {
    events.forEach(([eventName, handler]) => {
      target.addEventListener(eventName, handler);
    });
  } catch (error) {
    alert(error.message);
  }
};
