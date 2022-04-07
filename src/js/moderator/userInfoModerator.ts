import UserInfoPageView from "../ui/userInfoPageView";
import Authorization from "../domain/authorization";
import { EVENT_TYPE, SNACKBAR_TYPE } from "../constant";
import { on } from "../util/event";
import { IUpdateUserEvent } from "../type";
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
    this.userInfo = await this.authorization.isLoggedIn();
    if (this.userInfo.isError) {
      alert("잘못된 접근입니다.");
      location.href = "/";
      return;
    }
    this.userInfoView.init();
    this.userInfoView.renderForm(this.userInfo.email, this.userInfo.name);
  }

  async updateUserInfo(userInfo) {
    try {
      userInfo = {
        ...userInfo,
        email: this.userInfo.email,
      };
      await this.authorization.updateUserInfo(this.userInfo.id, userInfo);
      snackbarUI.open(SNACKBAR_TYPE.ALERT, "성공적으로 정보가 수정되었습니다.");
    } catch (err) {
      snackbarUI.open(SNACKBAR_TYPE.ERROR, err.message);
    }
  }
}

export default UserInfoModerator;
