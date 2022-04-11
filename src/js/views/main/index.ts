import { $, $$, emit } from '../../utils/common';
import { mainTemplate } from '../../templates/main/mainTemplate';
import { CUSTOM_EVENT, FIRST_INDEX, URL } from '../../constants/appContants';
import { SELECTOR } from '../../constants/viewConstants';
import ManageItemView from './mangeItemView';
import ChargeMoneyView from './chargeMoneyView';
import PurchaseItemView from './purchaseItemView';
import VendingMachine from '../../vendingMachine/vendingMachine';
import UserMenuView from './userMenuView';
import Storage from '../../api/storage';

export default class MainView {
  private $app: HTMLElement;
  private vendingMachine: VendingMachine;
  private manageItemView: ManageItemView;
  private chargeMoneyView: ChargeMoneyView;
  private purchaseItemView: PurchaseItemView;
  private userMenuView: UserMenuView;

  constructor() {
    this.$app = $(SELECTOR.ID.APP);
    this.vendingMachine = new VendingMachine();
    this.manageItemView = new ManageItemView(this.vendingMachine);
    this.chargeMoneyView = new ChargeMoneyView(this.vendingMachine);
    this.purchaseItemView = new PurchaseItemView(this.vendingMachine);
    this.userMenuView = new UserMenuView();
  }

  async render() {
    this.$app.replaceChildren();
    this.$app.insertAdjacentHTML('beforeend', mainTemplate);
    this.checkSignIn();

    $(SELECTOR.CLASS.NAV_CONTAINER).addEventListener('click', this.handleClickNavButton.bind(this));
    $(SELECTOR.ID.SIGN_BUTTON).addEventListener('click', this.handleSignButtonClick.bind(this));

    await this.vendingMachine.updateResponseItems();
    await this.vendingMachine.updateResponsCoins();
  }

  renderPageSection(url: string) {
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

  private changeButtonColor(targetButtonId: string) {
    const $navButtons = $$(SELECTOR.CLASS.NAV_BUTTON);

    $navButtons.forEach($navButton =>
      $navButton.id === targetButtonId
        ? $navButton.classList.add(SELECTOR.CLASS_STRING.NAV_BUTTON_CLICKED)
        : $navButton.classList.remove(SELECTOR.CLASS_STRING.NAV_BUTTON_CLICKED)
    );
  }

  private handleClickNavButton(event: { target: HTMLButtonElement }) {
    const $navButton = event.target;
    const targetButtonId = $navButton.id;
    const { url } = $navButton.dataset;

    if (!$navButton.classList.contains(SELECTOR.CLASS_STRING.NAV_BUTTON_CLICKED)) {
      this.changeButtonColor(targetButtonId);
      this.renderPageSection(url);
      emit({ eventName: CUSTOM_EVENT.ROUTE_CHANGE, detail: { page: URL.MAIN, section: url } });
    }
  }

  private handleSignButtonClick(event: { target: HTMLButtonElement }) {
    const $signButton = event.target;

    if ($signButton.classList.contains(SELECTOR.CLASS_STRING.SIGN_IN)) {
      this.handleSigInClick($signButton);
      return;
    }
    if ($signButton.classList.contains(SELECTOR.CLASS_STRING.THUMBNAIL)) {
      this.handleThumbnailClick($signButton);
      return;
    }
    if ($signButton.classList.contains(SELECTOR.CLASS_STRING.THUMBNAIL_ACTIVE)) {
      this.handleActivedThumbnailClick($signButton);
    }
  }

  private handleSigInClick($signButton: HTMLButtonElement) {
    const { url } = $signButton.dataset;

    emit({ eventName: CUSTOM_EVENT.PAGE_CHANGE, detail: { page: URL.SIGN, section: url } });
  }

  private handleThumbnailClick($signButton: HTMLButtonElement) {
    $signButton.classList.replace(
      SELECTOR.CLASS_STRING.THUMBNAIL,
      SELECTOR.CLASS_STRING.THUMBNAIL_ACTIVE
    );
    this.userMenuView.showMenu();
  }

  private handleActivedThumbnailClick($signButton: HTMLButtonElement) {
    $signButton.classList.replace(
      SELECTOR.CLASS_STRING.THUMBNAIL_ACTIVE,
      SELECTOR.CLASS_STRING.THUMBNAIL
    );
    this.userMenuView.hideMenu();
  }

  private async checkSignIn() {
    if (!Storage.getAccessToken()) {
      this.hideTab();
      return;
    }
    const { name } = Storage.getUserData();
    this.showThumbnail(name.charAt(FIRST_INDEX));
  }

  private hideTab() {
    $(SELECTOR.ID.ITEM_MANAGE_TAB).classList.add(SELECTOR.CLASS_STRING.DISPLAY_NONE);
    $(SELECTOR.ID.MONEY_CHARGE_TAB).classList.add(SELECTOR.CLASS_STRING.DISPLAY_NONE);
    $(SELECTOR.ID.PURCHASE_ITEM_TAB).classList.add(SELECTOR.CLASS_STRING.DISPLAY_NONE);
  }

  private showThumbnail(firstName: string) {
    $(SELECTOR.ID.SIGN_BUTTON).classList.replace(
      SELECTOR.CLASS_STRING.SIGN_IN,
      SELECTOR.CLASS_STRING.THUMBNAIL
    );
    $(SELECTOR.ID.SIGN_BUTTON).textContent = firstName;
  }
}
