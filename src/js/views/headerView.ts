import { $, $$, emitCustomEvent } from '../utils/common';
import { CONFIRM_MESSAGE, SELECTOR } from '../constants/constants';
import { initialTemplate } from '../templates/initialTemplate';

export default class HeaderView {
  $navContainer: HTMLElement;

  constructor() {
    $(SELECTOR.CLASS.NAV_CONTAINER).addEventListener('click', this.handleClickNavButton.bind(this));
    $(SELECTOR.ID.HEADER_BUTTON_CONTAINER).addEventListener('click', this.handleClickLoginButton);
  }

  private handleClickNavButton(event: { target: HTMLButtonElement }) {
    const targetId = event.target.id;

    this.changeButtonColor(targetId);
    emitCustomEvent('ROUTE_CHANGE', { detail: { targetId } });
  }

  private handleClickLoginButton(event: { target: HTMLButtonElement }) {
    const targetId = event.target.id;
    if (targetId === SELECTOR.ID_STRING.LOGIN_BUTTON) {
      emitCustomEvent('ROUTE_CHANGE', { detail: { targetId } });
    }
    if (targetId === SELECTOR.ID_STRING.USER_BADGE) {
      $('#user-dropbox').classList.toggle('display-none');
    }
    if (targetId === SELECTOR.ID_STRING.USER_NAME) {
      $('#user-dropbox').classList.toggle('display-none');
    }
    if (targetId === SELECTOR.ID_STRING.CHANGE_USER_INFO) {
      emitCustomEvent('ROUTE_CHANGE', { detail: { targetId } });
    }
    if (targetId === SELECTOR.ID_STRING.LOGOUT) {
      if (window.confirm(CONFIRM_MESSAGE.LOGOUT)) {
        sessionStorage.removeItem('jwt-token');
        sessionStorage.removeItem('isLogIn');
        sessionStorage.removeItem('user');
        emitCustomEvent('ROUTE_CHANGE', { detail: { targetId } });
      }
    }
  }

  public changeButtonColor(targetButtonId: string) {
    const $navButtons = $$(SELECTOR.CLASS.NAV_BUTTON);

    $navButtons.forEach($navButton =>
      $navButton.id === targetButtonId
        ? $navButton.classList.add(SELECTOR.CLASS_STRING.NAV_BUTTON_CLICKED)
        : $navButton.classList.remove(SELECTOR.CLASS_STRING.NAV_BUTTON_CLICKED),
    );
  }

  public render() {
    $(SELECTOR.ID.APP).replaceChildren();
    $(SELECTOR.ID.APP).insertAdjacentHTML('beforeend', initialTemplate);
  }
}
