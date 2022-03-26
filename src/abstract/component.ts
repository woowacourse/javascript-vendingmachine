import Store from '../flux/store';

abstract class Component extends HTMLElement {
  _tagName = '';

  constructor() {
    super();
  }

  connectedCallback() {
    this.style.display = 'block';
    this.mount();
    this.subscribe();
  }

  mount() {
    this.innerHTML = this.template();
  }

  render() {
    return;
  }

  abstract template(...args: any[]): string;

  subscribe() {
    if (!this.shouldSubscribe()) {
      return;
    }
    Store.instance && Store.instance.subscribe(this);
  }

  shouldSubscribe() {
    return true;
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
        event.target && event.target instanceof Element && isTarget(event.target);
      if (isValidTarget) callback(event);
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
