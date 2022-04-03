import { createMainElement, getInputValuesFromForm, selectDom } from '../utils/dom';
import { UserInfoPageTemplate } from './template';

export default class UserInfoPage {
  #snackbar;
  #authorization;
  #userInfoPage;
  #userInfoForm;

  constructor(authorization, snackBar) {
    this.#snackbar = snackBar;
    this.#authorization = authorization;

    this.#userInfoPage = createMainElement(UserInfoPageTemplate(this.#authorization));
    this.#userInfoForm = selectDom('.auth-form', this.#userInfoPage);

    this.#userInfoForm.addEventListener('submit', this.#handleUpdateUserInfo);
  }

  get tabElements() {
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

    if (password && password !== passwordConfirm) {
      this.#snackbar.addMessageToList('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const updateData = { email, name };
      if (password) updateData[password] = password;
      await this.#authorization.update(updateData);

      window.location.reload();
    } catch ({ message }) {
      this.#snackbar.addToMessageList(message);
    }
  };
}
