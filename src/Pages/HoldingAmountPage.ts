import Header from 'Components/Header';
import Navigation from 'Components/Navigation';
import AddHoldingAmountForm from 'Components/AddHoldingAmountForm';
import HoldingCoinList from 'Components/HoldingCoinList';
import { $ } from 'Utils';

export default class HoldingAmountPage {
  public readonly title = '자판기 동전 충전';
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
    this.addComponent(AddHoldingAmountForm);
    this.addComponent(HoldingCoinList);
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
