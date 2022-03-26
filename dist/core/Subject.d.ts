interface Observer {
    notify(): void;
}
export default class Subject {
    private static private;
    private static subjects;
    static currentObserver: Observer;
    static observable<T>(obj: T): T;
    static observe(target: Observer): void;
    static unobserve(target: Observer): void;
    private key;
    private value;
    private observers;
    private updated;
    constructor(key: string, initValue: any, checker: symbol);
    get(): any;
    set(newValue: any): void;
    observe(observer: Observer): void;
    unobserve(observer: Observer): void;
    checkUpdated(): void;
    notify(): void;
    toString(): string;
}
export {};
