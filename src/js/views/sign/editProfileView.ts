import AuthManager from '../../auth/authManager';
import { editProfile } from '../../templates/editProfileTemplate';
import { $ } from '../../utils/common';

export default class EditProfileView {
  render() {
    const $signMain = $('#sign-main');
    $signMain.replaceChildren();
    $signMain.insertAdjacentHTML('beforeend', editProfile);

    this.fillInput();
  }

  fillInput() {
    const { userData } = AuthManager.shared();

    $('#email-input').value = userData.email;
    $('#name-input').value = userData.name;
  }
}
