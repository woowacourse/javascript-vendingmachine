import Header from 'Components/Header';
import LoginForm from 'Components/LoginForm';
import { DEFAULT_PAGE } from 'Constants';
import UserSessionStore from 'Store/UserSessionStore';
import { routingEvent } from 'Utils';
import Page from './Abstract';

export default class LoginPage extends Page {
  title = '로그인';

  constructor() {
    super();

    if (UserSessionStore.isLogin() === true) {
      routingEvent(DEFAULT_PAGE);
    }
  }

  protected setComponent(): void {
    this.createComponent(Header, { title: '로그인' });
    this.createComponent(LoginForm);
  }
}
