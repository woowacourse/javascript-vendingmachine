import { $, $$, emit } from '../utils/common';
import { mainTemplate } from '../templates/mainTemplate';
import { CUSTOM_EVENT, URL } from '../constants/appContants';
import { SELECTOR } from '../constants/viewConstants';
import ManageItemView from './mangeItemView';
import ChargeMoneyView from './chargeMoneyView';
import PurchaseItemView from './purchaseItemView';
import VendingMachine from '../vendingMachine/vendingMachine';

export default class MainView {
  private $app: HTMLElement;
  private vendingMachine: VendingMachine;
  private manageItemView: ManageItemView;
  private chargeMoneyView: ChargeMoneyView;
  private purchaseItemView: PurchaseItemView;

  constructor() {
    this.$app = $(SELECTOR.ID.APP);
    this.vendingMachine = new VendingMachine();
    this.manageItemView = new ManageItemView(this.vendingMachine);
    this.chargeMoneyView = new ChargeMoneyView(this.vendingMachine);
    this.purchaseItemView = new PurchaseItemView(this.vendingMachine);
  }

  render() {
    this.$app.replaceChildren();
    this.$app.insertAdjacentHTML('beforeend', mainTemplate);

    $(SELECTOR.CLASS.NAV_CONTAINER).addEventListener('click', this.handleClickNavButton.bind(this));
    $('#sign-button').addEventListener('click', this.handleSignButtonClick.bind(this));
  }

  renderMainPageSection(url: string) {
    switch (url) {
      case URL.MANAGE_ITEM:
        this.manageItemView.render();
        this.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
        break;
      case URL.CHARGE_MONEY:
        this.chargeMoneyView.render();
        this.changeButtonColor(SELECTOR.ID_STRING.MONEY_CHARGE_TAB);
        break;
      case URL.PURCHASE_ITEM:
        this.purchaseItemView.render();
        this.changeButtonColor(SELECTOR.ID_STRING.ITEM_PURCHASE_TAB);
        break;
      default:
        this.manageItemView.render();
        this.changeButtonColor(SELECTOR.ID_STRING.ITEM_MANGE_TAB);
    }
  }

  changeButtonColor(targetButtonId: string) {
    const $navButtons = $$(SELECTOR.CLASS.NAV_BUTTON);

    $navButtons.forEach($navButton =>
      $navButton.id === targetButtonId
        ? $navButton.classList.add(SELECTOR.CLASS_STRING.NAV_BUTTON_CLICKED)
        : $navButton.classList.remove(SELECTOR.CLASS_STRING.NAV_BUTTON_CLICKED)
    );
  }

  private handleClickNavButton(event: Event) {
    const $navButton = event.target as HTMLButtonElement;
    const targetButtonId = $navButton.id;
    const { url } = $navButton.dataset;

    if (!$navButton.classList.contains(SELECTOR.CLASS_STRING.NAV_BUTTON_CLICKED)) {
      this.changeButtonColor(targetButtonId);
      this.renderMainPageSection(url);
      emit({ eventName: CUSTOM_EVENT.ROUTE_CHANGE, detail: { url, page: URL.MAIN } });
    }
  }

  private handleSignButtonClick(event) {
    const $signButton = event.target;
    const { url } = $signButton.dataset;

    if ($signButton.classList.contains('sign-in')) {
      emit({ eventName: CUSTOM_EVENT.ROUTE_CHANGE, detail: { url, page: URL.SIGN } });
      emit({ eventName: CUSTOM_EVENT.RENDER_PAGE, detail: {} });
    }
  }
}
