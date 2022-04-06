import Header from 'Components/Header';
import Navigation from 'Components/Navigation';
import PurchaseProductList from 'Components/PurchaseProductList';
import PurchaseAmountForm from 'Components/PurchaseAmountForm';
import ReturnCoinList from 'Components/ReturnCoinList';
import { $ } from 'Utils';

export default class ProductPurchase {
  public readonly title = '상품 구매';
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
    this.addComponent(PurchaseAmountForm);
    this.addComponent(PurchaseProductList);
    this.addComponent(ReturnCoinList);
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
