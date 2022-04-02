class EditUserInfoComponent {
  constructor($parent) {
    this.$parent = $parent;
    this.mount();
    this.initDOM();
  }
  mount() {
    this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
  }
  initDOM() {
    this.$editUserInfoContainer = this.$parent.querySelector('#edit-user-info-container');
  }
  generateTemplate() {
    return `<section id="edit-user-info-container" aria-labelledby="edit-user-info-title">
      <h2 id="edit-user-info-title" hidden>회원 정보 수정 화면</h2>
      <a href="#" class="back-button">
        <button type="button" class="gray-button">⬅️</button>
      </a>

      <form id="edit-user-info-form" class="input-form">
        <div>
          <label for="edit-email-input"> 이메일 </label>
          <input type="email" readonly id="edit-email-input" />
        </div>
        <div>
          <label for="edit-name-input">이름</label>
          <input type="text" id="edit-name-input" />
        </div>
        <div>
          <label for="edit-password-input">비밀번호</label>
          <input type="password" id="edit-password-input" placeholder="비밀번호를 입력해주세요" />
        </div>
        <div>
          <label for="edit-password-confirm-input">비밀번호 확인</label>
          <input
            type="password"
            id="edit-password-confirm-input"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <button class="submit-button" id="eidt-submit-button">확인</button>
      </form>
    </section>`;
  }
  show() {
    this.$editUserInfoContainer.classList.remove('hide');
  }
  hide() {
    this.$editUserInfoContainer.classList.add('hide');
  }

  bindEventListener() {}
}

export default EditUserInfoComponent;
