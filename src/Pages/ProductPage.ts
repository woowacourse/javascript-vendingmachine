import Header from 'Components/Header';
import Navigation from 'Components/Navigation';
import AddProduct from 'Components/AddProduct';
import ManageProductList from 'Components/ManageProductList';
import { $ } from 'Utils';

export default class ProductPage {
  public readonly title = '상품 관리';
  private componentList = [];

  constructor() {
    this.setComponent();
  }

  addComponent(ComponentClass, props = {}, children = {}) {
    const component = new ComponentClass(props, children);
    component.mount();
    this.componentList.push(component);
  }

  setComponent() {
    this.addComponent(Header);
    this.addComponent(Navigation);
    this.addComponent(AddProduct);
    this.addComponent(ManageProductList);
  }

  mount = () => {
    const $renderPage = this.componentList.reduce((previous, component) => {
      previous.append(component.content);
      return previous;
    }, document.createDocumentFragment());

    $('#app').replaceChildren($renderPage);
  };

  unmount = () => {
    this.componentList.forEach(component => component.unmount());
  };
}
