import Header from 'Components/Header';
import UserProfileEditForm from 'Components/UserProfileEditForm';
import { DEFAULT_PAGE } from 'Constants';
import UserSessionStore from 'Store/UserSessionStore';
import { routingEvent } from 'Utils';
import Page from './Abstract';

export default class UserProfileEditPage extends Page {
  title = '회원 정보 수정';

  constructor() {
    super();

    if (UserSessionStore.isLogin() === false) {
      routingEvent(DEFAULT_PAGE);
    }
  }

  protected setComponent(): void {
    this.createComponent(Header, { title: '회원 정보 수정' });
    this.createComponent(UserProfileEditForm);
  }
}
