import Header from 'Components/Header';
import Navigation from 'Components/Navigation';
import PurchaseProductList from 'Components/PurchaseProductList';
import PurchaseAmountForm from 'Components/PurchaseAmountForm';
import UserInfoForm from 'Components/UserInfoForm';
import ReturnCoinList from 'Components/ReturnCoinList';
import UserSessionStore from 'Store/UserSessionStore';

import Page from './Abstract';

export default class ProductPurchasePage extends Page {
  title = '상품 구매';

  protected setComponent(): void {
    const isUserLogin = UserSessionStore.isLogin();

    this.createComponent(UserInfoForm);
    this.createComponent(Header);
    isUserLogin && this.createComponent(Navigation);
    this.createComponent(PurchaseAmountForm);
    this.createComponent(PurchaseProductList);
    this.createComponent(ReturnCoinList);
  }
}
