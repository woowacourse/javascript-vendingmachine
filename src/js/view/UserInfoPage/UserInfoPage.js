import { createMainElement, getInputValuesFromForm, selectDom } from '../../utils/dom';
import { USER_DATA_CHANGED_MESSAGE } from '../../constants';
import userInfoPageTemplate from './UserInfoPageTemplate';

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
      const updateData = { email, name };
      if (password !== '') {
        updateData.password = password;
        updateData.passwordConfirm = passwordConfirm;
      }

      await this.#authorization.update(updateData);

      this.#snackbar.addToMessageList(USER_DATA_CHANGED_MESSAGE);

      [selectDom('#user-name-text').textContent] = this.#authorization.name;
    } catch ({ message }) {
      this.#snackbar.addToMessageList(message);
    }
  };
}
