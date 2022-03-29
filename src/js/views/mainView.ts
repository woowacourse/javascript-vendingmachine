import { $, $$, emitCustomEvent } from '../utils/common';
import { initialTemplate } from '../templates/initialTemplate';
import { SELECTOR } from '../constants/constants';

export default class MainView {
  $navContainer: HTMLElement;
  $app: HTMLElement;

  constructor() {
    this.$app = $(SELECTOR.ID.APP);

    this.render();
    this.bindEvents();
  }

  bindEvents() {
    $(SELECTOR.CLASS.NAV_CONTAINER).addEventListener('click', this.handleClickNavButton.bind(this));
  }

  handleClickNavButton(event: { target: HTMLButtonElement }) {
    const $navButton = event.target;
    const targetButtonId = $navButton.id;

    this.changeButtonColor(targetButtonId);
    emitCustomEvent('ROUTE_CHANGE', { detail: { $navButton } });
  }

  render() {
    this.$app.insertAdjacentHTML('beforeend', initialTemplate);
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
