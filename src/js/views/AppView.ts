import { $, $$ } from '../utils/common';
import { initialTemplate } from '../templates/initialTemplate';
import { CUSTOM_EVENT, SELECTOR } from '../constants/constants';

export default class AppView {
  $navContainer: HTMLElement;
  $app: HTMLElement;

  constructor() {
    this.$app = $(SELECTOR.ID.APP);

    this.render();
    this.bindEvents();
  }

  render() {
    this.$app.insertAdjacentHTML('beforeend', initialTemplate);
  }

  bindEvents() {
    $(SELECTOR.CLASS.NAV_CONTAINER).addEventListener('click', this.handleClickNavButton.bind(this));
  }

  handleClickNavButton(event: Event) {
    const $navButton = event.target as HTMLButtonElement;
    const targetButtonId = $navButton.id;

    this.changeButtonColor(targetButtonId);
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENT.ROUTE_CHANGE, { detail: { $navButton } }));
  }

  changeButtonColor(targetButtonId: string) {
    const $navButtons = $$(SELECTOR.CLASS.NAV_BUTTON);

    $navButtons.forEach($navButton =>
      $navButton.id === targetButtonId
        ? $navButton.classList.add(SELECTOR.CLASS_STRING.NAV_BUTTON_CLICKED)
        : $navButton.classList.remove(SELECTOR.CLASS_STRING.NAV_BUTTON_CLICKED)
    );
  }
}
