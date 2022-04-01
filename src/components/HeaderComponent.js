import AuthStore from '../stores/authStore';

class HeaderComponent {
  constructor($parent) {
    this.$parent = $parent;
    this.$sibling = this.$parent.querySelector('h1');
    this.mount();
    this.initDOM();
    this.bindEventListener();
  }
  mount() {
    this.$sibling.insertAdjacentHTML('afterend', this.generateTemplate());
  }

  initDOM() {
    this.$header = this.$parent.querySelector('header');
    this.$loginUserHref = this.$parent.querySelector('.login-user-href');
    this.$userProfileContainer = this.$parent.querySelector('.user-profile-container');
    this.$logoutButton = this.$parent.querySelector('#logout-button');
  }
  generateTemplate() {
    return `<header>
      <a href="#login" class="login-user-href">
        <button type="button" id="login-button" class="gray-button">로그인</button>
      </a>
      <div class="user-profile-container">
        <button id="user-profile">U</button>
        <div id="user-href-container">
          <button id="logout-button" class="gray-button">로그아웃</button>
          <a href="#edit-user-info" id="edit-user-href" class="gray-button">
            <button class="gray-button">회원정보수정</button>
          </a>
        </div>
      </div>
    </header>`;
  }
  headerShow() {
    this.$header.classList.remove('hide');
  }
  headerHide() {
    this.$header.classList.add('hide');
  }

  loginUserShow() {
    this.$loginUserHref.classList.remove('hide');
  }
  loginUserHide() {
    this.$loginUserHref.classList.add('hide');
  }

  userProfileShow() {
    this.$userProfileContainer.classList.remove('hide');
  }
  userProfileHide() {
    this.$userProfileContainer.classList.add('hide');
  }

  bindEventListener() {
    this.$logoutButton.addEventListener('click', this.onLogOutButtonClick);
  }

  onLogOutButtonClick = e => {
    console.log(e);
    e.preventDefault();

    AuthStore.mutateState({
      actionType: 'logout',
      payload: '',
    });
  };
}

export default HeaderComponent;
