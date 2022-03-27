import Store from '../flux/store';
import { EventOnElement, Override } from '../types';

abstract class Component extends HTMLElement {
  _tagName = '';

  constructor() {
    super();
  }

  connectedCallback() {
    this.style.display = 'block';
    this.mount();
    this.setEvent();
    this.subscribe();
  }

  mount() {
    this.innerHTML = this.template();
  }

  setEvent() {
    return;
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
    callback: (event: EventOnElement) => void
  ) {
    this.addEventListener(eventType, (event) => {
      const { target } = event;
      const isValidTarget = !!(target && target instanceof Element && target.closest(selector));
      if (isValidTarget) callback(event as EventOnElement);
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
