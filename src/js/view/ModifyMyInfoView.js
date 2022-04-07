import Auth from '../domain/Auth';
import { createDivElement, selectDom } from '../utils/dom';
import Snackbar from './SnackBar';
import { TEMPLATE } from './template';

export default class ModifyMyInfoView {
  #modifyContainer;
  #modifyForm;
  #email;
  #name;
  #password;
  #passwordConfirm;

  constructor() {
    this.#modifyContainer = createDivElement(TEMPLATE.MODIFY);
    this.#modifyForm = selectDom('#register-form', this.#modifyContainer);
    this.#email = selectDom('#email', this.#modifyContainer);
    this.#name = selectDom('#name', this.#modifyContainer);
    this.#password = selectDom('#password', this.#modifyContainer);
    this.#passwordConfirm = selectDom('#password-confirm', this.#modifyContainer);

    this.#modifyForm.addEventListener('submit', this.handleModify);
  }

  get template() {
    const id = localStorage.getItem('userId');
    Auth.getUserInfo(id).then(({ name, email }) => {
      this.#email.value = email;
      this.#name.value = name;
    });

    return this.#modifyContainer;
  }

  handleModify = (e) => {
    e.preventDefault();
    const id = localStorage.getItem('userId');
    const email = this.#email.value;
    const name = this.#name.value;
    const password = this.#password.value;
    const passwordConfirm = this.#passwordConfirm.value;

    try {
      Auth.modify(id, { email, name, password, passwordConfirm });
      Snackbar.dispatch('내 정보가 정상적으로 수정되었습니다.');
    } catch (error) {
      Snackbar.dispatch(error, 'fail');
    }
  };
}
