class EditComponent {
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

  initDOM() {
    this.$editForm = this.$app.querySelector('#edit-form');
    this.$loginButton = this.$app.querySelector('#login-button');
    this.$pageTitle = this.$app.querySelector('#page-title');
    this.$tabNav = this.$app.querySelector('#tab-nav');
  }

  bindEventHandler() {
    this.$editForm.addEventListener('submit', this.onSubmitEditForm);
  }

  showSection() {
    this.$loginButton.classList.add('hide');
    this.$tabNav.classList.add('hide');
    this.$pageTitle.textContent = '정보수정';
    this.$editForm.classList.remove('hide');
  }

  hideSection() {
    this.$editForm.classList.add('hide');
  }

  generateTemplate() {
    return ` <section>
  <form class="input-form hide" id="edit-form"> 
  <label for="email-edit-input">이메일</label>
  <input type="email" class="auth-input" id="email-edit-input" placeholder="이메일 주소를 입력해주세요" required></input>

  <label for="name-edit-input">이름</label>
  <input type="name" class="auth-input" id="name-edit-input" placeholder="이름을 입력해주세요" required></input>

  <label for="password-edit-input">비밀번호</label>
  <input type="password" class="auth-input" id="password-edit-input" placeholder="비밀번호는 문자와 숫자를 포함하여 8자 이상 이어야 합니다." required></input>

  <label for="password-reenter-edit-input">비밀번호 확인</label>
  <input type="password" class="auth-input" id="password-reenter-edit-input" placeholder="비밀번호를 다시 입력해주세요" required></input>

  <button class="submit-button" required>확인</button>
  </form>
  </section>`;
  }

  onSubmitEditForm = e => {
    e.preventDefault();
  };
}
export default EditComponent;
