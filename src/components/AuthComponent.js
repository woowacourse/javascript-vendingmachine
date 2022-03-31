import { AUTH_ROUTE_NAME } from '../utils/constants';

class AuthComponent {
  $app;
  constructor(handlers) {
    this.$app = document.querySelector('#app');
    this.handlers = handlers;
    this.mount();
    this.initDOM();
    this.bindEventHandler();
  }
  mount() {
    this.$app.insertAdjacentHTML('beforeend', this.generateTemplate());
  }
  generateTemplate() {
    return `
    <section>
    <form class="input-form hide" id="login-form"> 
    <input></input>
    <input></input>
    <button class="submit-button">확인</button>
    <div>아직 회원이 아니신가요? <a id="join-button">회원가입</a></div>
    </form>
    </section>

    <section>
    <form class="input-form hide" id="join-form"> 
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <button class="submit-button">확인</button>
    </form>
    </section>

    <section>
    <form class="input-form hide" id="edit-form"> 
    <input></input>
    <input></input>
    <input></input>
    <input></input>
    <button class="submit-button">확인</button>
    </form>
    </section>
  `;
  }
  initDOM() {
    this.form = {
      $loginForm: this.$app.querySelector('#login-form'),
      $joinForm: this.$app.querySelector('#join-form'),
      $editForm: this.$app.querySelector('#edit-form'),
    };
    this.$loginButton = this.$app.querySelector('#login-button');
    this.$joinButton = this.$app.querySelector('#join-button');

    this.$pageTitle = this.$app.querySelector('#page-title');
    this.$tabNav = this.$app.querySelector('#tab-nav');
  }

  bindEventHandler() {
    const { onClickLoginOrEditButton, onClickJoinButton } = this.handlers;
    this.$loginButton.addEventListener('click', onClickLoginOrEditButton);
    this.$joinButton.addEventListener('click', onClickJoinButton);
  }

  showSection(name) {
    if (name === AUTH_ROUTE_NAME.LOGIN) {
      this.form.$loginForm.classList.remove('hide');
      this.form.$joinForm.classList.add('hide');
      this.form.$editForm.classList.add('hide');
    }
    if (name === AUTH_ROUTE_NAME.JOIN) {
      this.form.$joinForm.classList.remove('hide');
      this.form.$loginForm.classList.add('hide');
      this.form.$editForm.classList.add('hide');
    }
    if (name === AUTH_ROUTE_NAME.EDIT) {
      this.form.$editForm.classList.remove('hide');
      this.form.$loginForm.classList.add('hide');
      this.form.$joinForm.classList.add('hide');
    }
  }

  hide() {
    Object.values(this.form).forEach(formElement => formElement.classList.add('hide'));
  }
}
export default AuthComponent;
