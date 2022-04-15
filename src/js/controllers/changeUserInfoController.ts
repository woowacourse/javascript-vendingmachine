import ChangeUserInfoView from '../views/changeUserInfoView';
import { emitCustomEvent, onCustomEvent, showSnackBar } from '../utils/common';
import { Controller } from '../types/interface';
import { SNACK_BAR_MESSAGE } from '../constants/constants';
import { editProfile } from '../../apis/auth';

export default class ChangeUserInfoController implements Controller {
  private changeUserInfoView: ChangeUserInfoView;

  constructor() {
    this.changeUserInfoView = new ChangeUserInfoView();

    this.bindEvents();
  }

  public bindEvents() {
    onCustomEvent('CHANGE_USER_INFO', this.handleChangeUserInfo);
  }

  private handleChangeUserInfo = (event: CustomEvent) => {
    const { name, password, targetId } = event.detail;
    const user = JSON.parse(sessionStorage.getItem('user'));
    const data = JSON.stringify({
      email: user.email,
      name,
      password,
    });

    const response = editProfile(user.id, data);

    response
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
        showSnackBar(SNACK_BAR_MESSAGE.USER_INFO_CHANGED);
      })
      .catch(error => alert(error.message));
  };

  public loadPage(isLogin: boolean) {
    this.changeUserInfoView.render(isLogin);
  }
}
