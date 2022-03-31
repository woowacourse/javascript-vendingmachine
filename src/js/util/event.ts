import { EVENT_TYPE } from "../constant";

interface ICustomEvent<T> extends Event {
  detail: T;
}

export const { on, emit } = {
  on: <T>(
    element: Element | Window,
    eventName: string,
    callback: (ev: ICustomEvent<T>) => void
  ) => {
    element.addEventListener(eventName, callback);
  },

  emit: <T>(eventName: EVENT_TYPE, data: T) => {
    const customEvent = new CustomEvent(eventName, { detail: data });
    dispatchEvent(customEvent);
  },
};
