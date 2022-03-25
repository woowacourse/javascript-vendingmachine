export default class Subject {
  static #private = Symbol('private checker');

  static #subjects = new Set();

  static currentObserver;

  static observable(obj) {
    const observableObj = {};

    Object.keys(obj).forEach((key) => {
      const subject = new Subject(key, obj[key], Subject.#private);

      Object.defineProperty(observableObj, key, {
        get() {
          return subject.value;
        },
        set(newValue) {
          subject.value = newValue;
          subject.notify();
        },
      });
    });

    Object.seal(observableObj);

    return observableObj;
  }

  static observe(target) {
    Subject.currentObserver = target;
    target.notify();
    Subject.currentObserver = null;
  }

  static unobserve(target) {
    Subject.#subjects.forEach((subject) => {
      subject.unobserve(target);
    });
  }

  #key;

  #value;

  #observers = new Set();

  constructor(key, initValue, checker) {
    if (checker !== Subject.#private) return;

    this.#key = key;
    this.#value = initValue;

    Object.seal(this);

    Subject.#subjects.add(this);
  }

  get key() {
    return this.#key;
  }

  get value() {
    if (Subject.currentObserver) this.observe(Subject.currentObserver);

    return this.#value;
  }

  set value(newValue) {
    this.#value = newValue;
  }

  observe(observer) {
    this.#observers.add(observer);
  }

  unobserve(observer) {
    this.#observers.delete(observer);
  }

  notify() {
    this.#observers.forEach((observer) => observer.notify());
  }
}
