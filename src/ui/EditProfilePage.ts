import CustomElement from './CustomElement';
import TEMPLATE from '../templates';
import { addEvent, emit } from '../utils';

class EditProfilePage extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return TEMPLATE.EDIT_PROFILE_PAGE;
  }

  setEvent() {
    addEvent(this, 'submit', '.edit-profile-form', (e) => this.handleEditProfile(e));
  }

  handleEditProfile(e) {
    e.preventDefault();

    const userName = e.target.editProfileUserName.value;
    const password = e.target.editProfilePassword.value;
    const passwordConfirm = e.target.editProfilePasswordConfirm.value;

    emit('.edit-profile-form', '@editProfile', { userName, password, passwordConfirm }, this);
  }
}

customElements.define('edit-profile', EditProfilePage);

export default EditProfilePage;
