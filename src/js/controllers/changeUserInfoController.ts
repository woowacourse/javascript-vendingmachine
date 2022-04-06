import ChangeUserInfoView from '../views/changeUserInfoView';
import { emitCustomEvent, onCustomEvent, showSnackBar } from '../utils/common';
import { Controller } from '../types/interface';

export default class ChangeUserInfoController implements Controller {
  private changeUserInfoView: ChangeUserInfoView;

  constructor() {
    this.changeUserInfoView = new ChangeUserInfoView();

    this.bindEvents();
  }

  bindEvents() {
    onCustomEvent('CHANGE_USER_INFO', this.handleChangeUserInfo.bind(this));
  }

  handleChangeUserInfo(event: CustomEvent) {
    const { name, password, targetId } = event.detail;
    const user = JSON.parse(sessionStorage.getItem('user'));
    const data = JSON.stringify({
      email: user.email,
      name,
      password,
    });

    fetch(`http://localhost:3000/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    })
      .then(res => {
        return res.json();
      })
      .then(result => {
        const changedUser = {
          email: result.email,
          name: result.name,
          id: result.id,
        };
        const { name } = result;
        if (!name) {
          throw new Error(result);
        }
        sessionStorage.setItem('user', JSON.stringify(changedUser));

        emitCustomEvent('ROUTE_CHANGE', { detail: { targetId } });
        showSnackBar('회원 정보가 수정되었습니다.');
      })
      .catch(error => alert(error.message));
  }

  loadPage(isLogin) {
    this.changeUserInfoView.render(isLogin);
  }
}
