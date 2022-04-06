import Auth from '../../api/auth';
import Storage from '../../api/storage';
import { CUSTOM_EVENT, URL } from '../../constants/appContants';
import { SELECTOR } from '../../constants/viewConstants';
import { editProfile } from '../../templates/sign/editProfileTemplate';
import { $, emit } from '../../utils/common';
import showSnackbar from '../../utils/snackbar';

export default class EditProfileView {
  render() {
    const $signMain = $(SELECTOR.ID.SIGN_MAIN);
    $signMain.replaceChildren();
    $signMain.insertAdjacentHTML('beforeend', editProfile);

    this.fillInput();
    $(SELECTOR.ID.EDIT_SUBMIT).addEventListener('submit', this.handleEditSubmit.bind(this));
  }

  private fillInput() {
    const { email, name } = Storage.getUserData();

    $(SELECTOR.ID.EDIT_EMAIL_INPUT).value = email;
    $(SELECTOR.ID.NAME_INPUT).value = name;
  }

  private async handleEditSubmit(event: SubmitEvent) {
    try {
      event.preventDefault();
      const editedInputValues = this.getEditedInputValues();
      const { email, id, name } = await Auth.editUserData(editedInputValues);

      Storage.setUserData({ email, id, name });

      emit({
        eventName: CUSTOM_EVENT.PAGE_CHANGE,
        detail: { page: URL.MAIN, section: URL.MANAGE_ITEM },
      });
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  private getEditedInputValues() {
    const { id } = Storage.getUserData();
    const name = $(SELECTOR.ID.NAME_INPUT).value;
    const password = $(SELECTOR.ID.PASSWORD_INPUT).value;
    const confirmPassword = $(SELECTOR.ID.PASSWORD_CONFIRM_INPUT).value;

    return { id, name, password, confirmPassword };
  }
}
