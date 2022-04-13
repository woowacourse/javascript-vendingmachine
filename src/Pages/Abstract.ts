import { VENDING_MACHINE } from 'Constants';
import { $ } from 'Utils';

export default abstract class Page {
  protected readonly title: string = '';
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

  private setPageTitle() {
    document.title = this.title
      ? `${this.title} - ${VENDING_MACHINE.PAGE_TITLE}`
      : VENDING_MACHINE.PAGE_TITLE;
  }

  public mount = (): void => {
    const $renderPage: DocumentFragment = this.componentList.reduce((previous, component) => {
      previous.append(component.content);
      return previous;
    }, document.createDocumentFragment());

    $('#app').replaceChildren($renderPage);
    this.setPageTitle();
  };

  public unmount = (): void => {
    this.componentList.forEach(component => component.unmount());
  };
}
