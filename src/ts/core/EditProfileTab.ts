import { $ } from '../utils/dom';
import { EditProfile } from '../declarations/coreDeclaration';
import VerifyValueValidation from '../validations/verifyValueValidation';
import { getUserInfo } from '../utils/userInfoUtil';
import { loginnedMode, logOutedMode } from '../utils/loginUtil';
import { displaySnackbar } from '../utils/snackbar';

class EditProfileTab implements EditProfile {
  verifyValue: VerifyValueValidation;
  constructor(verifyValue: VerifyValueValidation) {
    this.verifyValue = verifyValue;
    $('.edit-profile-button').addEventListener('change', this.handleSelect.bind(this));
    $('#edit-profile-confirm-button').addEventListener('click', this.handleEditProfile.bind(this));
  }

  handleSelect() {
    if ($('.edit-profile-button').value === 'edit-profile') {
      this.handleClickEditButton();
      let { email, name } = JSON.parse(localStorage.getItem('accessToken'));
      $('#edit-profile-form__name-input').value = name;
      $('#edit-profile-form__email-input').value = email;
      $('.edit-profile-button').value = 'name-thumbnail';
    } else if ($('.edit-profile-button').value === 'logout') {
      this.handleLogOut();
    }
  }

  handleClickEditButton() {
    history.pushState({}, '', window.location.pathname + `#edit-profile`);
    $('#app').classList.remove('manage', 'charge', 'buy', 'login', 'signup', 'edit-profile');
    $('#header').classList.remove('manage', 'charge', 'buy', 'login', 'signup', 'edit-profile');
    $('#app').classList.add('edit-profile');
    $('#header').classList.add('edit-profile');
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
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password, passwordConfirm }),
      });

      if (response.ok) {
        const { name } = await response.json();
        accessToken.name = name;
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        loginnedMode();
      } else {
        const json = await response.json();
        displaySnackbar(json);
      }
    } catch (error) {
      displaySnackbar(error);
    }
  }
}

export default EditProfileTab;
