import { $, $$, emitCustomEvent } from '../utils/common';
import { SELECTOR } from '../constants/constants';
import { initialTemplate } from '../templates/initialTemplate';

export default class MainView {
  $navContainer: HTMLElement;

  constructor() {
    $(SELECTOR.CLASS.NAV_CONTAINER).addEventListener('click', this.handleClickNavButton.bind(this));
    $('#login-button').addEventListener('click', this.handleClickLoginButton.bind(this));
  }

  handleClickNavButton(event: { target: HTMLButtonElement }) {
    const $button = event.target;
    const targetButtonId = $button.id;

    this.changeButtonColor(targetButtonId);
    emitCustomEvent('ROUTE_CHANGE', { detail: { $button } });
  }

  handleClickLoginButton(event: { target: HTMLButtonElement }) {
    const $button = event.target;

    emitCustomEvent('ROUTE_CHANGE', { detail: { $button } });
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
