import { $ } from '../utils/dom';
import { EditProfile } from '../declarations/coreDeclaration';
import VerifyValueValidation from '../validations/verifyValueValidation';
import { getUserInfo } from '../utils/userInfoUtil';
import { loginnedMode, logOutedMode } from '../utils/loginUtil';
import { showSnackbar } from '../utils/snackbar';
import { editProfileUrl } from '../constants';
import VendingMachine from '../controllers/VendingMachine';
import { fetchUtil } from '../utils/fetchUtil';

class EditProfileManage implements EditProfile {
  verifyValue: VerifyValueValidation;
  constructor(verifyValue: VerifyValueValidation) {
    this.verifyValue = verifyValue;
    $('.edit-profile-button').addEventListener('change', this.handleSelect.bind(this));
    $('#edit-profile-confirm-button').addEventListener('click', this.handleEditProfile.bind(this));
  }

  handleSelect() {
    if ($('.edit-profile-button').value === 'edit-profile') {
      VendingMachine.prototype.handleEditProfile();
      let { email, name } = JSON.parse(localStorage.getItem('accessToken'));
      $('#edit-profile-form__name-input').value = name;
      $('#edit-profile-form__email-input').value = email;
      $('.edit-profile-button').value = 'name-thumbnail';
    } else if ($('.edit-profile-button').value === 'logout') {
      this.handleLogOut();
    }
  }

  handleLogOut() {
    logOutedMode();
    localStorage.clear();
  }

  async handleEditProfile(): Promise<void> {
    const userInfo = getUserInfo();
    const { name, password, passwordConfirm } = userInfo;
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    const { id } = accessToken;
    if (!this.verifyValue.verifySignUpInfo(userInfo)) {
      return;
    }
    try {
      const response = await fetchUtil(`${editProfileUrl}/${id}`, 'PATCH', {
        name,
        password,
        passwordConfirm,
      });
      if (response.ok) {
        const { name } = await response.json();
        accessToken.name = name;
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        loginnedMode();
      } else {
        const json = await response.json();
        showSnackbar(json);
      }
    } catch (error) {
      showSnackbar(error);
    }
  }
}

export default EditProfileManage;
