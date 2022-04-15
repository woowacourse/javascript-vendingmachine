import Header from 'Components/Header';
import UserInfoForm from 'Components/UserInfoForm';
import Navigation from 'Components/Navigation';
import AddProduct from 'Components/AddProduct';
import ManageProductList from 'Components/ManageProductList';
import UserSessionStore from 'Store/UserSessionStore';
import { routingEvent } from 'Utils';
import { DEFAULT_PAGE } from 'Constants';

import Page from './Abstract';

export default class ProductPage extends Page {
  title = '상품 관리';

  constructor() {
    super();

    if (UserSessionStore.isLogin() === false) {
      routingEvent(DEFAULT_PAGE);
    }
  }

  protected setComponent(): void {
    this.createComponent(UserInfoForm);
    this.createComponent(Header);
    this.createComponent(Navigation);
    this.createComponent(AddProduct);
    this.createComponent(ManageProductList);
  }
}
