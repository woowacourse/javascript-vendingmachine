import { Auth } from '../domain/Auth';
import { ProductProps } from '../utils/interface';

interface ProfileInterface {
  getIsRendered();
  render();
}

export class Profile implements ProfileInterface {
  #isRendered: boolean;
  #target: HTMLDivElement;
  #selectContainer: HTMLDivElement;
  #editUserInfoBtn: HTMLButtonElement;
  #logoutBtn: HTMLButtonElement;
  #thumbnailName: HTMLSpanElement;
  #auth: Auth;

  constructor({ target, auth }) {
    this.#target = target;
    this.#auth = auth;
    this.#isRendered = false;
  }

  getIsRendered() {
    return this.#isRendered;
  }

  #setIsRendered(status: boolean) {
    this.#isRendered = status;
  }

  #template(name: ProductProps['name']) {
    return `
      <button class="name">${name.slice(0, 1)}</button>
      <div class="select-container hide">
        <button type="button" class="edit-user-info-button button">회원정보 수정</button>
        <button type="button" class="logout-button button">로그아웃</button>
      </div>
    `;
  }

  render() {
    if (this.#isRendered) {
      this.#updateThumbnail();

      return;
    }

    const { name } = JSON.parse(localStorage.getItem('user'));

    this.#target.insertAdjacentHTML('beforeend', this.#template(name));

    this.#setIsRendered(true);

    this.#selectDOM();
    this.#bindEvent();
  }

  #updateThumbnail() {
    const { name } = JSON.parse(localStorage.getItem('user'));

    this.#thumbnailName.textContent = `${name.slice(0, 1)}`;
  }

  #selectDOM() {
    this.#thumbnailName = document.querySelector('.name');
    this.#selectContainer = document.querySelector('.select-container');
    this.#editUserInfoBtn = document.querySelector('.edit-user-info-button');
    this.#logoutBtn = document.querySelector('.logout-button');
  }

  #bindEvent() {
    this.#target.addEventListener('click', this.#handleToggleSelectContainer);
    this.#editUserInfoBtn.addEventListener('click', this.#handleRequestEditUserInfoPage);
    this.#logoutBtn.addEventListener('click', this.#handleLogout);
  }

  #handleToggleSelectContainer = (e) => {
    if (e.target === this.#target || e.target === this.#thumbnailName) {
      this.#toggleSelectContainer();
    }
  };

  #handleRequestEditUserInfoPage = () => {
    this.#target.dispatchEvent(new CustomEvent('showEditUserInfoRequested'));

    this.#toggleSelectContainer();
  };

  #handleLogout = () => {
    this.#auth.logout();

    this.#target.dispatchEvent(new CustomEvent('logoutCompleted'));

    this.#toggleSelectContainer();
  };

  #toggleSelectContainer() {
    this.#selectContainer.classList.toggle('hide');
  }
}
