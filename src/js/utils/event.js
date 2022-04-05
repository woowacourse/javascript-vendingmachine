export function emitEvent(target, name, detail) {
  const event = new CustomEvent(name, { detail });
  target.dispatchEvent(event);
}
export function listenEvents(target, events) {
  events.forEach(([eventName, callback]) => {
    target.addEventListener(eventName, (e) => {
      try {
        callback(e);
      } catch (error) {
        console.log(error);
      }
    });
  });
}
