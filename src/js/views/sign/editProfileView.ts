import AuthManager from '../../auth/authManager';
import { CUSTOM_EVENT, URL } from '../../constants/appContants';
import { SELECTOR } from '../../constants/viewConstants';
import { editProfile } from '../../templates/sign/editProfileTemplate';
import { $, emit } from '../../utils/common';
import { signValidate } from '../../validates/signValidate';

export default class EditProfileView {
  render() {
    const $signMain = $(SELECTOR.ID.SIGN_MAIN);
    $signMain.replaceChildren();
    $signMain.insertAdjacentHTML('beforeend', editProfile);

    this.fillInput();
    $(SELECTOR.ID.EDIT_SUBMIT).addEventListener('submit', this.handleEditSubmit);
  }

  private fillInput() {
    const { userData } = AuthManager.shared();

    $(SELECTOR.ID.EDIT_EMAIL_INPUT).value = userData.email;
    $(SELECTOR.ID.NAME_INPUT).value = userData.name;
  }

  async handleEditSubmit(event: SubmitEvent) {
    event.preventDefault();
    const editedName = $(SELECTOR.ID.NAME_INPUT).value;
    const editedPassword = $(SELECTOR.ID.PASSWORD_INPUT).value;
    const confirmEditedPassword = $(SELECTOR.ID.PASSWORD_CONFIRM_INPUT).value;

    signValidate.editProfile({
      name: editedName,
      password: editedPassword,
      confirmPassword: confirmEditedPassword,
    });

    await AuthManager.shared().editUserData({ name: editedName, password: editedPassword });

    emit({
      eventName: CUSTOM_EVENT.ROUTE_CHANGE,
      detail: { url: URL.MANAGE_ITEM, page: URL.MAIN },
    });
    emit({ eventName: CUSTOM_EVENT.RENDER_PAGE });
  }
}
