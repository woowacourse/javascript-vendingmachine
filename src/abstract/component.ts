import Store from '../flux/store';

abstract class Component extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.subscribe();
    this.setEvent();
  }

  render() {
    this.innerHTML = this.template();
  }

  abstract template(): string;

  subscribe() {
    if (!this.shouldSubscribe()) {
      return;
    }
    Store.instance && Store.instance.subscribe(this);
  }

  shouldSubscribe() {
    return true;
  }

  setEvent() {
    return;
  }

  addEvent(
    eventType: keyof HTMLElementEventMap,
    selector: string,
    callback: (event: Event) => void
  ) {
    const children = Array.from(this.querySelectorAll(selector));
    const isTarget = (target: Element) => children.includes(target) || target.closest(selector);
    this.addEventListener(eventType, (event) => {
      const isValidTarget =
        event.target && event.target instanceof Element && !isTarget(event.target);
      if (isValidTarget) {
        return false;
      }
      return callback(event);
    });
  }

  notify() {
    this.render();
  }

  hide() {
    this.setAttribute('hidden', '');
  }

  show() {
    this.removeAttribute('hidden');
  }
}

export default Component;
