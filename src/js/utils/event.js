export const emit = (target, eventName, detail) => {
  const event = new CustomEvent(eventName, { detail });
  target.dispatchEvent(event);
};

export const on = (target, eventName, handler) => {
  try {
    target.addEventListener(eventName, handler);
  } catch (error) {
    alert(error.message);
  }
};
