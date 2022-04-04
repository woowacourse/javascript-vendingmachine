import { createMainElement, getInputValuesFromForm, selectDom } from '../utils/dom';
import { userInfoPageTemplate } from './template';

export default class UserInfoPage {
  #snackbar;
  #authorization;

  #userInfoPage;
  #userInfoForm;

  constructor(authorization, snackBar) {
    this.#snackbar = snackBar;
    this.#authorization = authorization;

    this.#userInfoPage = createMainElement(userInfoPageTemplate(this.#authorization));
    this.#userInfoForm = selectDom('.auth-form', this.#userInfoPage);

    this.#userInfoForm.addEventListener('submit', this.#handleUpdateUserInfo);
  }

  get tabElements() {
    selectDom('#email-input', this.#userInfoForm).value = this.#authorization.email;
    selectDom('#name-input', this.#userInfoForm).value = this.#authorization.name;

    return this.#userInfoPage;
  }

  #handleUpdateUserInfo = async (e) => {
    e.preventDefault();

    const {
      email,
      name,
      password,
      'password-confirm': passwordConfirm,
    } = getInputValuesFromForm(e.target);

    try {
      const updateData = { email, name, password, passwordConfirm };
      if (password) {
        updateData[password] = password;
        updateData[passwordConfirm] = passwordConfirm;
      }

      await this.#authorization.update(updateData);

      window.location.reload();
    } catch ({ message }) {
      this.#snackbar.addToMessageList(message);
    }
  };
}
