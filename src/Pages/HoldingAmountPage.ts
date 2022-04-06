import Header from 'Components/Header';
import Navigation from 'Components/Navigation';
import AddHoldingAmountForm from 'Components/AddHoldingAmountForm';
import HoldingCoinList from 'Components/HoldingCoinList';

import Page from './Abstract';

export default class HoldingAmountPage extends Page {
  title = '자판기 동전 충전';

  constructor() {
    super();

    this.createComponent(Header);
    this.createComponent(Navigation);
    this.createComponent(AddHoldingAmountForm);
    this.createComponent(HoldingCoinList);
  }
}
