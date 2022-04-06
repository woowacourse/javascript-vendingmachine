import Header from 'Components/Header';
import Navigation from 'Components/Navigation';
import PurchaseProductList from 'Components/PurchaseProductList';
import PurchaseAmountForm from 'Components/PurchaseAmountForm';
import ReturnCoinList from 'Components/ReturnCoinList';

import Page from './Abstract';

export default class ProductPurchasePage extends Page {
  title = '상품 구매';

  constructor() {
    super();

    this.createComponent(Header);
    this.createComponent(Navigation);
    this.createComponent(PurchaseAmountForm);
    this.createComponent(PurchaseProductList);
    this.createComponent(ReturnCoinList);
  }
}
