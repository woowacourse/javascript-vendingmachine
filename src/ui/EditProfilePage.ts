import CustomElement from './CustomElement';
import TEMPLATE from '../templates';

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

  setEvent() {}

  notify({}) {}
}

customElements.define('edit-profile', EditProfilePage);

export default EditProfilePage;
