import { $ } from "../../utils/dom";
import { INFOMATION_MESSAGES, KEY } from "../../utils/constants";
import { getSessionStorage, saveSessionStorage } from "../../utils/sessionStorage";

import { requestEditProfile } from "../../api";
import { profileTemplate } from "./profileTemplate";
import { ConvertTemplate, HideHeader } from "../App";
import Snackbar from "../Snackbar";

class ProfileComponent {
  profileContainer: HTMLElement;
  profileEmailInput: HTMLInputElement;
  profileNameInput: HTMLInputElement;
  profileForm: HTMLFormElement;
  profilePasswordInput: HTMLInputElement;
  profilePasswordCheckInput: HTMLInputElement;
  snackbar: Snackbar;

  constructor(private hideHeader: HideHeader, private convertTemplate: ConvertTemplate) {
    this.snackbar = new Snackbar();
    this.profileContainer = $(".profile-manage__container");
    this.profileContainer.replaceChildren();
    this.profileContainer.insertAdjacentHTML("beforeend", profileTemplate());

    this.profileForm = $(".profile-form");
    this.profileEmailInput = $(".profile-form__email-input");
    this.profileNameInput = $(".profile-form__name-input");
    this.profilePasswordInput = $(".profile-form__password-input");
    this.profilePasswordCheckInput = $(".profile-form__password-input--check");

    this.profileForm.addEventListener("submit", this.handleEditProfile);
  }

  handleEditProfile = async (e: Event) => {
    e.preventDefault();

    const { id } = getSessionStorage(KEY.USER_INFO);
    const name = this.profileNameInput.value;
    const password = this.profilePasswordInput.value;
    const passwordCheck = this.profilePasswordCheckInput.value;

    try {
      const userInfo = await requestEditProfile({ id, name, password, passwordCheck });
      saveSessionStorage(KEY.USER_INFO, userInfo);

      history.pushState({ path: "#purchase" }, null, "#purchase");
      this.convertTemplate("#purchase");
      this.snackbar.show(INFOMATION_MESSAGES.SUCCESS_EDIT_USER_INFO);
    } catch ({ message }) {
      this.snackbar.show(message);
    }
  };

  renderUserInfo() {
    const userInfo = getSessionStorage(KEY.USER_INFO);
    this.profileEmailInput.placeholder = userInfo.email;
    this.profileNameInput.value = userInfo.name;
  }

  show() {
    this.profileContainer.classList.remove("hide");
    this.hideHeader();
    this.renderUserInfo();
  }
}

export default ProfileComponent;
