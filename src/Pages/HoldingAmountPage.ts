import UserInfoForm from 'Components/UserInfoForm';
import Header from 'Components/Header';
import Navigation from 'Components/Navigation';
import AddHoldingAmountForm from 'Components/AddHoldingAmountForm';
import HoldingCoinList from 'Components/HoldingCoinList';
import UserSessionStore from 'Store/UserSessionStore';
import { routingEvent } from 'Utils';
import { DEFAULT_PAGE } from 'Constants';

import Page from './Abstract';

export default class HoldingAmountPage extends Page {
  title = '자판기 동전 충전';

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
    this.createComponent(AddHoldingAmountForm);
    this.createComponent(HoldingCoinList);
  }
}
