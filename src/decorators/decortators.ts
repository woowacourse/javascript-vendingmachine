import Component from '../abstract/component';
import { ComponentConstructor } from '../types';

export function customElement(name: string) {
  return function (target: ComponentConstructor) {
    target._tagName = name;
    customElements.define(name, target);
  };
}

export function event(eventType: string, selector: string) {
  return function (
    target: Component,
    _: string,
    descriptor: TypedPropertyDescriptor<(event?: any) => void>
  ) {
    document.addEventListener('DOMContentLoaded', () => {
      requestAnimationFrame(() => {
        const el = document.querySelector((target.constructor as any)._tagName);
        el && descriptor.value && el.addEvent(eventType, selector, descriptor.value.bind(el));
      });
    });
  };
}
