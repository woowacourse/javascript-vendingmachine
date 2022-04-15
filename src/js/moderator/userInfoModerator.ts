import UserInfoPageView from "../ui/userInfoPageView";
import Authorization from "../domain/authorization";
import {
  EVENT_TYPE,
  SNACKBAR_TYPE,
  ERROR_MESSAGE,
  ALERT_MESSAGE,
} from "../constant";
import { on } from "../util/event";
import { IUpdateUserEvent, IUpdateUserOption } from "../type";
import snackbarUI from "../ui/snackbarUI";

class UserInfoModerator {
  userInfoView;
  authorization;
  userInfo;

  constructor() {
    this.userInfoView = new UserInfoPageView();
    this.authorization = new Authorization();
    on<IUpdateUserEvent>(window, EVENT_TYPE.UPDATE_USER, (e) => {
      this.updateUserInfo(e.detail);
    });
  }

  async init() {
    this.userInfo = await this.authorization.getLoggedInUser();
    if (this.userInfo.isError) {
      alert(ERROR_MESSAGE.WRONG_ACCESS);
      location.href = "/";
      return;
    }
    this.userInfoView.init();
    this.userInfoView.renderForm(this.userInfo.email, this.userInfo.name);
  }

  async updateUserInfo(userInfo: IUpdateUserEvent) {
    try {
      userInfo = {
        ...userInfo,
        email: this.userInfo.email,
      } as IUpdateUserOption;
      await this.authorization.updateUserInfo(this.userInfo.id, userInfo);
      snackbarUI.open(SNACKBAR_TYPE.ALERT, ALERT_MESSAGE.UPDATE_USER_INFO);
    } catch (err) {
      snackbarUI.open(SNACKBAR_TYPE.ERROR, err.message);
    }
  }
}

export default UserInfoModerator;
