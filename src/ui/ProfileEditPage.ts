import { CustomElement } from './CustomElement';
import TEMPLATE from '../templates';

class ProfileEditPage extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return TEMPLATE.PROFILE_EDIT_PAGE;
  }

  setEvent() {}
}

customElements.define('profile-edit-page', ProfileEditPage);

export default ProfileEditPage;
