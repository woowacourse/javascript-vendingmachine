import Header from 'Components/Header';
import Navigation from 'Components/Navigation';
import AmountInputForm from 'Components/AmountInputForm';
import CoinList from 'Components/CoinList';
import { $ } from 'Utils';

export default class HoldingAmountPage {
  public readonly title = '자판기 동전 충전';
  private componentList = [];

  constructor() {
    this.setComponent();
  }

  addComponent(ComponentClass, props = {}, children = {}) {
    const component = new ComponentClass(props, children);
    this.componentList.push(component);
  }

  setComponent() {
    this.addComponent(Header);
    this.addComponent(Navigation);
    this.addComponent(AmountInputForm);
    this.addComponent(CoinList);
  }

  mount = () => {
    const $renderPage = this.componentList.reduce((previous, component) => {
      previous.append(component.mount());
      return previous;
    }, document.createDocumentFragment());

    $('#app').replaceChildren($renderPage);
  };

  unmount = () => {
    this.componentList.forEach(component => component.unmount());
  };
}
