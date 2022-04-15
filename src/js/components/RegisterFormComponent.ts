import requestRegister from '../api/requestRegister';
import { ALERT_MESSAGE } from '../constants';
import { User } from '../interfaces/UserData.interface';
import throwableFunctionHandler from '../utils/throwableFunctionHandler';
import { checkUserDataValidate } from '../utils/userValidation';
import * as Component from './abstractComponents/Component';

class RegisterFormComponent extends Component.StaticComponent {
  parentElement: HTMLElement;
  noticeStateChanged: Function;
  $loginInputSection: HTMLElement;
  $registerForm: HTMLElement;
  $mainContents: HTMLElement;

  constructor(parentElement: HTMLElement, noticeStateChanged: Function) {
    super();
    this.parentElement = parentElement;
    this.noticeStateChanged = noticeStateChanged;
  }

  protected bindEventAndElement = () => {
    this.$loginInputSection = this.parentElement.querySelector('#login-input-container');
    this.$registerForm = document.querySelector('#register-form');
    this.$mainContents = document.querySelector('.main-contents');

    this.$registerForm.addEventListener('submit', this.onSubmitRegister);
  };

  private onSubmitRegister = async (e: SubmitEvent) => {
    e.preventDefault();

    const userData = {
      email: (<HTMLInputElement>this.$registerForm.querySelector('#email-input')).value,
      name: (<HTMLInputElement>this.$registerForm.querySelector('#name-input')).value,
      password: (<HTMLInputElement>this.$registerForm.querySelector('#password-input')).value,
      passwordCheck: (<HTMLInputElement>this.$registerForm.querySelector('#password-check-input')).value,
      id: null,
    };

    if (await throwableFunctionHandler(() => this.checkValidateAndRequest(userData))) {
      this.noticeStateChanged();
    }
  };

  private checkValidateAndRequest = (userData: User) => {
    checkUserDataValidate(userData);
    requestRegister(userData);
    return ALERT_MESSAGE.REGISTER_SUCCESS;
  };

  render = () => {
    this.parentElement.insertAdjacentHTML('beforeend', this.template());
    this.bindEventAndElement();
    this.$mainContents.replaceChildren();
  };

  protected template = () => `<h1>회원가입</h1>
    <form id="register-form" class="multiple-input-form">
      <label for="email-input">이메일</label>
      <input type="email" id="email-input" placeholder="이메일 주소를 입력해주세요" required />
      <label for="name-input">이름</label>
      <input type="text" id="name-input" placeholder="이름을 입력해주세요" required />
      <label for="password-input">비밀번호</label>
      <input type="password" id="password-input" placeholder="비밀번호를 입력해주세요" required />
      <label for="password-check-input">비밀번호 확인</label>
      <input type="password" id="password-check-input" placeholder="비밀번호를 입력해주세요" required />
      <input type="submit" id="register-button" class="submit-button" value="확인" />
    </form>`;
}

export default RegisterFormComponent;
