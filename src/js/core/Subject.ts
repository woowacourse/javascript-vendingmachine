interface Observer {
  notify(): void;
}

export default class Subject {
  private static private: symbol = Symbol('private checker');

  private static subjects: Set<Subject> = new Set();

  static currentObserver: Observer;

  static observable<T>(obj: T): T {
    const observableObj = {} as T;

    Object.keys(obj).forEach((key) => {
      const subject = new Subject(key, obj[key], Subject.private);

      Object.defineProperty(observableObj, key, {
        get() {
          return subject.get();
        },
        set(newValue) {
          subject.set(newValue);
        },
      });
    });

    Object.seal(observableObj);

    return observableObj;
  }

  static observe(target: Observer) {
    Subject.currentObserver = target;
    target.notify();
    Subject.currentObserver = null;
  }

  static unobserve(target: Observer) {
    Subject.subjects.forEach((subject: Subject) => {
      subject.deleteObserver(target);
    });
  }

  private key: string;

  private value: any;

  private observers: Set<Observer>;

  private updated: boolean;

  constructor(key: string, initValue: any, checker: symbol) {
    if (checker !== Subject.private) return;

    this.key = key;
    this.value = initValue;
    this.observers = new Set();
    this.updated = false;

    Object.seal(this);
    Subject.subjects.add(this);
    this.detectUpdate();
  }

  get(): any {
    if (Subject.currentObserver) this.addObserver(Subject.currentObserver);

    return this.value;
  }

  set(newValue: any): void {
    this.value = newValue;
    this.updated = true;
  }

  addObserver(observer: Observer): void {
    this.observers.add(observer);
  }

  deleteObserver(observer: Observer): void {
    this.observers.delete(observer);
  }

  detectUpdate(): void {
    if (this.updated) {
      this.notify();

      this.updated = false;
    }

    requestAnimationFrame(() => {
      this.detectUpdate();
    });
  }

  notify(): void {
    this.observers.forEach((observer: Observer) => observer.notify());
  }

  toString() {
    return this.key;
  }
}
