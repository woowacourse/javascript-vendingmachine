import { Page, Notification } from '../CustomElement';
import TEMPLATE from '../../templates';
import storage from '../../storage';
import { addEvent, emit, $, showSnackbar } from '../../utils';
import Authentication from '../../domain/Authentication';
import { SUCCESS_MESSAGE, ELEMENT_KEY, CUSTOM_EVENT } from '../../constants';

class ProfileEditPage extends Page {
  connectedCallback() {
    super.connectedCallback();
    Authentication.instance.observe({ key: ELEMENT_KEY.PROFILE_EDIT, element: this });
  }

  render() {
    this.innerHTML = this.template();
    const user = storage.getLocalStorage('user');

    if (!user) return;

    ($('[name=email]', this) as HTMLInputElement).value = user.email;
    ($('[name=userName]', this) as HTMLInputElement).value = user.name;
  }

  template() {
    return TEMPLATE.PROFILE_EDIT_PAGE;
  }

  setEvent() {
    addEvent(this, 'submit', '.profile-edit-form', (e: SubmitEvent & { target: HTMLFormElement }) =>
      this.handleEdit(e),
    );
  }

  handleEdit(e: SubmitEvent & { target: HTMLFormElement }) {
    e.preventDefault();
    const form = e.target;

    emit(
      '.profile-edit-form',
      CUSTOM_EVENT.AUTH.EDIT,
      { name: form.userName.value, password: form.password.value, passwordConfirm: form.passwordConfirm.value },
      this,
    );
  }

  notify({}: Notification) {
    showSnackbar(SUCCESS_MESSAGE.EDIT);
  }
}

customElements.define('profile-edit-page', ProfileEditPage);

export default ProfileEditPage;
