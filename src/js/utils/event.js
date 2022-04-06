export function emitEvent(target, name, detail) {
  const event = new CustomEvent(name, { detail });
  target.dispatchEvent(event);
}
export function listenEvents(target, events) {
  events.forEach(({ type, cb }) => {
    target.addEventListener(type, (e) => {
      try {
        cb(e);
      } catch (error) {
        alert(error);
      }
    });
  });
}
