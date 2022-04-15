import Header from 'Components/Header';
import RegisterForm from 'Components/RegisterForm';
import { DEFAULT_PAGE } from 'Constants';
import UserSessionStore from 'Store/UserSessionStore';
import { routingEvent } from 'Utils';
import Page from './Abstract';

export default class RegisterPage extends Page {
  title = '회원가입';

  constructor() {
    super();

    if (UserSessionStore.isLogin() === true) {
      routingEvent(DEFAULT_PAGE);
    }
  }

  protected setComponent(): void {
    this.createComponent(Header, { title: '회원가입' });
    this.createComponent(RegisterForm);
  }
}
