import Store from '../flux/store';
import { EventOnElement } from '../types';

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

  addEvent<EventType extends Event = EventOnElement>(
    eventType: keyof HTMLElementEventMap,
    selector: string,
    callback: (event: EventType) => void
  ) {
    this.addEventListener(eventType, (event) => {
      const { target } = event;
      const isValidTarget = !!(target && target instanceof Element && target.closest(selector));
      if (isValidTarget) callback(event as EventType);
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
