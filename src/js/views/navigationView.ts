import { $, $$, emitCustomEvent } from '../utils/common';
import { SELECTOR } from '../constants/constants';

export default class NavigationView {
  $navContainer: HTMLElement;

  constructor() {
    $(SELECTOR.CLASS.NAV_CONTAINER).addEventListener('click', this.handleClickNavButton.bind(this));
  }

  handleClickNavButton(event: { target: HTMLButtonElement }) {
    const $navButton = event.target;
    const targetButtonId = $navButton.id;

    this.changeButtonColor(targetButtonId);
    emitCustomEvent('ROUTE_CHANGE', { detail: { $navButton } });
  }

  changeButtonColor(targetButtonId: string) {
    const $navButtons = $$(SELECTOR.CLASS.NAV_BUTTON);

    $navButtons.forEach($navButton =>
      $navButton.id === targetButtonId
        ? $navButton.classList.add(SELECTOR.CLASS_STRING.NAV_BUTTON_CLICKED)
        : $navButton.classList.remove(SELECTOR.CLASS_STRING.NAV_BUTTON_CLICKED),
    );
  }
}
