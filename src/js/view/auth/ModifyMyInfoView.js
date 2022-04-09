import { ERROR, SNACKBAR_MESSAGE, STORAGE_KEY } from '../../constants';
import Auth from '../../domain/auth/Auth';
import { createDivElement, selectDom } from '../../utils/dom';
import Snackbar from '../SnackBar';
import { TEMPLATE } from '../template';

export default class ModifyMyInfoView {
  #modifyContainer;
  #modifyForm;
  #email;
  #name;
  #password;
  #passwordConfirm;

  constructor() {
    //멤버변수 생성
    this.#modifyContainer = createDivElement(TEMPLATE.MODIFY);
    this.#modifyForm = selectDom('#register-form', this.#modifyContainer);
    this.#email = selectDom('#email', this.#modifyContainer);
    this.#name = selectDom('#name', this.#modifyContainer);
    this.#password = selectDom('#password', this.#modifyContainer);
    this.#passwordConfirm = selectDom('#password-confirm', this.#modifyContainer);

    //이벤트 등록
    this.#modifyForm.addEventListener('submit', this.handleModify);
  }

  get template() {
    const id = localStorage.getItem(STORAGE_KEY.USER_ID);
    Auth.getUserInfo(id).then(({ name, email }) => {
      this.#email.value = email;
      this.#name.value = name;
    });

    return this.#modifyContainer;
  }

  handleModify = (e) => {
    e.preventDefault();
    const id = localStorage.getItem(STORAGE_KEY.USER_ID);
    const email = this.#email.value;
    const name = this.#name.value;
    const password = this.#password.value;
    const passwordConfirm = this.#passwordConfirm.value;

    try {
      Auth.modify(id, { email, name, password, passwordConfirm });
      Snackbar.dispatch(SNACKBAR_MESSAGE.MODIFY_MY_INFO_SUCCESS);
    } catch (error) {
      Snackbar.dispatch(error, ERROR);
    }
  };
}
