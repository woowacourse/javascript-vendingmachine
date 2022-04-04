import AuthManager from '../../auth/authManager';
import { CUSTOM_EVENT, URL } from '../../constants/appContants';
import { editProfile } from '../../templates/editProfileTemplate';
import { $, emit } from '../../utils/common';

export default class EditProfileView {
  render() {
    const $signMain = $('#sign-main');
    $signMain.replaceChildren();
    $signMain.insertAdjacentHTML('beforeend', editProfile);

    this.fillInput();
    $('#edit-submit').addEventListener('submit', this.handleEditSubmit);
  }

  fillInput() {
    const { userData } = AuthManager.shared();

    $('#edit-email-input').value = userData.email;
    $('#name-input').value = userData.name;
  }

  async handleEditSubmit(event) {
    event.preventDefault();
    const editedName = $('#name-input').value;
    const editedPassword = $('#password-input').value;
    const confirmEditedPassword = $('#password-confirm-input').value;

    await AuthManager.shared().editUserData({ editedName, editedPassword });

    emit({
      eventName: CUSTOM_EVENT.ROUTE_CHANGE,
      detail: { url: URL.MANAGE_ITEM, page: URL.MAIN },
    });
    emit({ eventName: CUSTOM_EVENT.RENDER_PAGE });
  }
}
