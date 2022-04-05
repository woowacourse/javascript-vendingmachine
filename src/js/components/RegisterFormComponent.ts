import throwableFunctionHandler from '../utils/throwableFunctionHandler';

class RegisterFormComponent {
  parentElement: HTMLElement;
  noticeStateChanged: Function;
  $loginInputSection: HTMLElement;
  $registerForm: HTMLElement;
  $mainContents: HTMLElement;

  constructor(parentElement: HTMLElement, noticeStateChanged: Function) {
    this.parentElement = parentElement;
    this.noticeStateChanged = noticeStateChanged;
  }

  private bindEventAndElement = () => {
    this.$loginInputSection = this.parentElement.querySelector('#login-input-container');
    this.$registerForm = document.querySelector('#register-form');
    this.$mainContents = document.querySelector('.main-contents');

    this.$registerForm.addEventListener('submit', this.onSubmitRegister);
  };

  private onSubmitRegister = (e: SubmitEvent) => {
    e.preventDefault();

    // if (throwableFunctionHandler(() => vendingMachine.addProduct(newProduct))) {
    //   this.noticeStateChanged('add', newProduct);
    // }
  };

  refreshComponent = () => {};

  render = () => {
    this.parentElement.insertAdjacentHTML('beforeend', this.template());
    this.bindEventAndElement();
    this.$mainContents.replaceChildren();
  };

  template = () => `<h1>회원가입</h1>
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
