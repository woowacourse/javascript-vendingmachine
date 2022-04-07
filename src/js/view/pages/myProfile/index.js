import { ERROR_MESSAGE } from '../../../constants';
import { createElementByTemplate, generateSnackBar, selectDom } from '../../../utils/dom';
import { emitEvent } from '../../../utils/event';
import myProfileTemplate from './template';

export default class MyProfile {
  #updateContainer;
  #updateForm;
  #emailInput;
  #nameInput;
  #passwordInput;
  #passwordConfirmInput;

  constructor() {
    this.#updateContainer = createElementByTemplate('div', myProfileTemplate);
    this.#updateContainer.id = 'app';
    this.#updateForm = selectDom('#update-user-form', this.#updateContainer);
    this.#emailInput = selectDom('#update-user-email', this.#updateContainer);
    this.#nameInput = selectDom('#update-user-name', this.#updateContainer);
    this.#passwordInput = selectDom('#update-user-password', this.#updateContainer);
    this.#passwordConfirmInput = selectDom(
      '#update-user-password-confirm',
      this.#updateContainer
    );

    this.#updateForm.addEventListener('submit', this.#handleupdateForm);
  }

  renderUser(email, name) {
    this.#emailInput.value = email;
    this.#nameInput.placeholder = name;
  }

  get element() {
    return this.#updateContainer;
  }

  #handleupdateForm = (e) => {
    e.preventDefault();
    const email = this.#emailInput.value;
    const name = this.#nameInput.value;
    const password = this.#passwordInput.value;
    if (password !== this.#passwordConfirmInput.value) {
      generateSnackBar(ERROR_MESSAGE.NOT_SAME_PASSWORD);
      return;
    }
    emitEvent(this.element, 'update-user', { email, name, password });
    this.#nameInput.value = '';
    this.#passwordInput.value = '';
  };
}
