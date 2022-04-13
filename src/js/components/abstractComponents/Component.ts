export abstract class DynamicComponent {
  protected abstract bindEventAndElement(): void;
  abstract render(): void;
  abstract refreshChange(): void;
  protected abstract template(): string;
}

export abstract class DependentComponent {
  abstract bindEventAndElement(): void;
  protected abstract template(): string;
}

export abstract class StaticComponent {
  protected abstract bindEventAndElement(): void;
  abstract render(): void;
  protected abstract template(): string;
}
