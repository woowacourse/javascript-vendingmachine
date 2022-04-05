import throwableFunctionHandler from '../utils/throwableFunctionHandler';

class LoginFormComponent {
  parentElement: HTMLElement;
  noticeStateChanged: Function;
  $loginInputSection: HTMLElement;
  $loginForm: HTMLElement;
  $mainContents: HTMLElement;

  constructor(parentElement: HTMLElement, noticeStateChanged: Function) {
    this.parentElement = parentElement;
    this.noticeStateChanged = noticeStateChanged;
  }

  private bindEventAndElement = () => {
    this.$loginInputSection = this.parentElement.querySelector('#login-input-container');
    this.$loginForm = document.querySelector('#login-form');
    this.$mainContents = document.querySelector('.main-contents');

    this.$loginForm.addEventListener('submit', this.onSubmitNewProduct);
  };

  private onSubmitNewProduct = (e: SubmitEvent) => {
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

  template = () => `<h1>로그인</h1>
    <form id="login-form">
      <label for="email-input">이메일</label>
      <input type="email" id="email-input" placeholder="woowacourse@gmail.com" required />
      <label for="password-input">비밀번호</label>
      <input type="password" id="password-input" placeholder="비밀번호를 입력해주세요" required />
      <input type="submit" id="login-button" value="확인" />
      <p>아직 회원이 아니신가요? <a href="#">회원가입</a></p>
    </form>`;
}

export default LoginFormComponent;
