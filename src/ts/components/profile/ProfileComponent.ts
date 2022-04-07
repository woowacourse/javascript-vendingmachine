import { $ } from "../../utils/dom";
import { ConvertTemplate, HideHeader } from "../App";
import Snackbar from "../Snackbar";
import { profileTemplate } from "./profileTemplate";

class ProfileComponent {
  snackbar: Snackbar;
  profileContainer: HTMLElement;

  constructor(private hideHeader: HideHeader, private convertTemplate: ConvertTemplate) {
    this.snackbar = new Snackbar();
    this.profileContainer = $(".profile-manage__container");
    this.profileContainer.replaceChildren();
    this.profileContainer.insertAdjacentHTML("beforeend", profileTemplate());
  }

  show() {
    this.profileContainer.classList.remove("hide");
    this.hideHeader();
  }
}

export default ProfileComponent;
