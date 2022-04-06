import { $, $$, emitCustomEvent } from '../utils/common';
import { SELECTOR } from '../constants/constants';
import { initialTemplate } from '../templates/initialTemplate';

export default class MainView {
  $navContainer: HTMLElement;

  constructor() {
    $(SELECTOR.CLASS.NAV_CONTAINER).addEventListener('click', this.handleClickNavButton.bind(this));
    $('#header-button-container').addEventListener('click', this.handleClickLoginButton);
  }

  handleClickNavButton(event: { target: HTMLButtonElement }) {
    const targetId = event.target.id;

    this.changeButtonColor(targetId);
    emitCustomEvent('ROUTE_CHANGE', { detail: { targetId } });
  }

  handleClickLoginButton(event: { target: HTMLButtonElement }) {
    const targetId = event.target.id;
    if (targetId === 'login-button') {
      emitCustomEvent('ROUTE_CHANGE', { detail: { targetId } });
    }
    if (targetId === 'user-badge') {
      $('#user-dropbox').classList.toggle('display-none');
    }
    if (targetId === 'user-name') {
      $('#user-dropbox').classList.toggle('display-none');
    }
    if (targetId === 'change-user-info') {
      emitCustomEvent('ROUTE_CHANGE', { detail: { targetId } });
    }
    if (targetId === 'logout') {
      if (window.confirm('로그아웃하시겠습니까?')) {
        sessionStorage.removeItem('jwt-token');
        sessionStorage.removeItem('isLogIn');
        sessionStorage.removeItem('user');
        emitCustomEvent('ROUTE_CHANGE', { detail: { targetId } });
      }
    }
  }

  changeButtonColor(targetButtonId: string) {
    const $navButtons = $$(SELECTOR.CLASS.NAV_BUTTON);

    $navButtons.forEach($navButton =>
      $navButton.id === targetButtonId
        ? $navButton.classList.add(SELECTOR.CLASS_STRING.NAV_BUTTON_CLICKED)
        : $navButton.classList.remove(SELECTOR.CLASS_STRING.NAV_BUTTON_CLICKED),
    );
  }

  render() {
    $(SELECTOR.ID.APP).replaceChildren();
    $(SELECTOR.ID.APP).insertAdjacentHTML('beforeend', initialTemplate);
  }
}
