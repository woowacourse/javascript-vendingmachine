import { TComponent } from 'Types/ComponentTypes';
import { $ } from 'Utils';

export default abstract class Page {
  public readonly title: string = '';
  private componentList: TComponent[] = [];

  constructor() {
    this.setComponent();
  }

  protected abstract setComponent(): void;

  protected createComponent(ComponentClass: ClassConstructor<TComponent>, props = {}): void {
    const component: TComponent = new ComponentClass(props);
    component.mount();

    this.componentList.push(component);
  }

  public mount = (): void => {
    const $renderPage: DocumentFragment = this.componentList.reduce((previous, component) => {
      previous.append(component.content);
      return previous;
    }, document.createDocumentFragment());

    $('#app').replaceChildren($renderPage);
  };

  public unmount = (): void => {
    this.componentList.forEach(component => component.unmount());
  };
}
